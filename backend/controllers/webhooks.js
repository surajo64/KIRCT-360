import { Webhook } from 'svix'
import User from '../models/userModel.js';
import Stripe from 'stripe';
import crypto from "crypto";
import Course from '../models/courseModel.js';
import Purchase from '../models/purchaseModel.js';



// STRIE WEBHOOK
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
export const stripeWebhook = async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {

    event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  }
  catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      try {
        const session = event.data.object;
        const { purchaseId } = session.metadata;

        if (!purchaseId) {
          console.error('No purchaseId in session metadata');
          break;
        }

        const purchaseData = await Purchase.findById(purchaseId);
        if (!purchaseData) {
          console.error('Purchase not found:', purchaseId);
          break;
        }

        const userData = await User.findById(purchaseData.userId);
        if (!userData) {
          console.error('User not found:', purchaseData.userId);
          break;
        }

        const courseData = await Course.findById(purchaseData.courseId);
        if (!courseData) {
          console.error('Course not found:', purchaseData.courseId);
          break;
        }

        // Avoid duplicate enrollments
        if (!courseData.enrolledStudents.includes(userData._id)) {
          courseData.enrolledStudents.push(userData._id);
          await courseData.save();
        }

        if (!userData.enrolledCourses.includes(courseData._id)) {
          userData.enrolledCourses.push(courseData._id);
          await userData.save();
        }

        // Update purchase status
        purchaseData.status = 'Completed';
        await purchaseData.save();

        console.log(`✅ Purchase ${purchaseId} marked as Completed`);
      } catch (err) {
        console.error('Error handling checkout.session.completed:', err);
      }
      break;
    }

    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      const { purchaseId } = session.metadata;
      const purchaseData = await Purchase.findById(purchaseId);
      if (purchaseData) {
        purchaseData.status = 'Failed';
        await purchaseData.save();
      }
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });

}


export const paystackWebhook = async (req, res) => {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto
      .createHmac("sha512", secret)
      .update(req.body) // <-- use raw buffer directly
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(401).send("Invalid signature");
    }

    const event = JSON.parse(req.body.toString()); // parse buffer into JSON
    paystackWebhook(event, res);

    // ✅ Check event type
    if (event.event === "charge.success") {
      const paymentData = event.data;

      // extract metadata (we set this during transaction initialize)
      const { userId, courseId } = paymentData.metadata;

      // enroll user into course
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (user && course) {
        // push course into enrolled list if not already
        if (!user.enrolledCourses.includes(courseId)) {
          user.enrolledCourses.push(courseId);
          await user.save();
        }

        console.log(`✅ User ${user.email} enrolled into ${course.title}`);
      }
    }

    res.sendStatus(200); // acknowledge Paystack

  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.sendStatus(500);
  }
};