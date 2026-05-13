import Course from '../models/courseModel.js';
import mongoose from "mongoose";
import fs from "fs";
import CourseProgress from '../models/courseProgressModel.js';
import Purchase from '../models/purchaseModel.js';
import User from '../models/userModel.js'
import Admin from '../models/adminModel.js';
import Quiz, { questionSchema } from "../models/quizMode.js";
import Stripe from 'stripe'
import bcrypt, { hash } from "bcrypt";
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import axios from 'axios'
import crypto from "crypto";
import streamifier from "streamifier";
import { v4 as uuidv4 } from "uuid";
import PDFDocument from "pdfkit"
import { sendEnrollmentConfirmationEmail, sendEnrollmentNotificationEmail, sendEmail, sendVerificationEmail } from '../config/emailUtils.js';



export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, } = req.body;

    if (!name || !phone || !password || !email) {
      return res.json({ success: false, message: 'Name, Phone, Password, and NIN are required!' });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.json({ success: false, message: 'Password must be 6 or more characters!' });
    }


    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const userExists = await User.findOne({
      $or: [{ phone }, { email }]
    });

    if (userExists) {
      if (userExists.phone === phone) {
        return res.status(400).json({ message: "Phone number already in use" });
      }
      if (userExists.email === email) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      verificationToken,
      isVerified: true
    });

    await newUser.save();

    await sendVerificationEmail(email, name, verificationToken);

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      message: "Registration successful!",
      token: token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};



// API for User Login

export const userLogin = async (req, res) => {

  try {
    const { phone, email, password } = req.body;

    if (!phone && !email) {
      return res.status(400).json({ success: false, message: "Phone or Email is required!" });
    }

    // Find user by phone OR email
    const user = await User.findOne({
      $or: [{ phone }, { email }]
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or Password!" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // ✅ Return token as `atoken` + user object
    return res.json({
      success: true,
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,

      },
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

export const getUserData = async (req, res) => {
  try {

    const { userId } = req.body
    const userData = await User.findById(userId).select('-password')
    res.status(200).json({ success: true, userData })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


//  user update Profile

export const updateProfile = async (req, res) => {
  try {
    const {
      userId, name, phone, email, gender, address, dob, nin,
      city, country, organization, designation, background,
      benefitFromWorkshop, professionalGrowth
    } = req.body
    const imageFile = req.file

    await User.findByIdAndUpdate(userId, {
      name, phone, nin, email, address, gender, dob,
      city, country, organization, designation, background,
      benefitFromWorkshop, professionalGrowth
    })

    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
      const imageUrl = imageUpload.secure_url
      await User.findByIdAndUpdate(userId, { image: imageUrl })
    }

    res.json({ success: true, message: 'Profile Updated Successfully' })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


// API to change Password

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const { userId } = req.body // ✅ this comes from your auth middleware


    if (newPassword !== confirmPassword) {
      return res.json({ success: false, message: "New password and confirm password do not match" });
    }

    const user = await User.findById(userId); // ✅ correctly placed after declaration
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await User.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );


    return res.json({ success: true, message: "Password changed successfully" });

  } catch (error) {
    console.error("Password change error:", error); // 🔍 Shows the real error
    return res.status(500).json({ success: false, message: error.message });
  }
};



// API to request password reset
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal whether the email exists
      return res.json({ success: true, message: 'If this email is registered, a reset link will be sent.' });
    }

    // Generate a secure random token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: #004d99; padding: 24px 32px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Password Reset Request</h1>
        </div>
        <div style="padding: 24px 32px; color: #333;">
          <p>Dear <strong>${user.name}</strong>,</p>
          <p>We received a request to reset your password. Click the button below to set a new password. This link will expire in <strong>1 hour</strong>.</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="background: #004d99; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: bold;">Reset My Password</a>
          </div>
          <p>If you did not request this, you can safely ignore this email — your password will remain unchanged.</p>
          <p>Best regards,<br><strong>KIRCT Team</strong></p>
        </div>
        <div style="background: #f0f0f0; padding: 12px 32px; font-size: 12px; color: #888; text-align: center;">
          This is an automated notification. Please do not reply to this email.
        </div>
      </div>
    `;

    await sendEmail(user.email, 'Password Reset – KIRCT', html);

    return res.json({ success: true, message: 'If this email is registered, a reset link will be sent.' });

  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to reset password via token
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return res.json({ success: false, message: 'Token and new password are required' });
    }

    if (password.length < 6) {
      return res.json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({ success: false, message: 'Reset link is invalid or has expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.json({ success: true, message: 'Password reset successfully. You can now log in.' });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// user enrolled Courses with lecture link
export const userEnrolledCourses = async (req, res) => {

  try {

    const userId = req.body.userId;
    console.log("respone:", userId)

    const userData = await User.findById(userId)
      .populate({
        path: 'enrolledCourses',
        select: 'courseTitle courseThumbnail courseContent courseRatings educator enrolledStudents createdAt updatedAt courseAddress meetingUrl classSchedule courseMode', // include new fields
      });

    // Fetch purchases to get attendanceType
    const purchases = await Purchase.find({ userId, status: 'Completed' });

    // Merge attendanceType into enrolledCourses
    const enrolledCoursesWithDetails = userData.enrolledCourses.map(course => {
      const purchase = purchases.find(p => p.courseId.toString() === course._id.toString());
      return {
        ...course.toObject(),
        attendanceType: purchase ? purchase.attendanceType : (course.courseMode === 'Virtual' ? 'Virtual' : 'Physical') // Fallback
      };
    });

    res.json({ success: true, enrolledCourses: enrolledCoursesWithDetails })


  } catch (error) {

    res.json({ success: false, message: error.message })
  }
}

// API to Purchase Coures
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId, attendanceType } = req.body; // 'Physical' or 'Virtual'
    const userId = req.body.userId;

    // Find user and course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.json({ success: false, message: "User or Course not found" });
    }

    // Determine price based on attendance type
    let price = 0;
    if (attendanceType === 'Physical') {
      price = course.coursePricePhysical > 0 ? course.coursePricePhysical : course.coursePrice;
    } else if (attendanceType === 'Virtual') {
      price = course.coursePriceVirtual > 0 ? course.coursePriceVirtual : course.coursePrice;
    } else {
      // Fallback to default if no valid type provided (or legacy)
      price = course.coursePrice;
    }

    // Calculate Amount in Kobo
    // Applying discount as a percentage (0-100)
    const amount = Math.max(Math.round(price * (1 - course.discount / 100)), 0) * 100;

    // Unique reference
    const reference = `KIRCT_${crypto.randomBytes(8).toString("hex")}`;

    // Call Paystack initialize endpoint
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: user.email,
        amount,
        reference,
        callback_url: `${process.env.FRONTEND_URL}/payment-callback`,
        metadata: {
          courseId,
          userId,
          attendanceType
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status !== true) {
      return res.json({ success: false, message: "Paystack init failed" });
    }

    // Send to frontend
    return res.json({
      success: true,
      reference,
      email: user.email,
      amount, // already in kobo
      authorization_url: response.data.data.authorization_url,
    });

  } catch (error) {
    console.error("Purchase Error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Payment link not generated" });
  }
};


export const verifyPayment = async (req, res) => {
  const { reference, userId, courseId } = req.body;

  if (!reference || !userId || !courseId) {
    return res.status(400).json({ success: false, message: "Missing required fields: reference, userId, courseId" });
  }

  let paystackResponse;
  try {
    paystackResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
  } catch (paystackError) {
    // Paystack returned a 4xx error (e.g. invalid/duplicate reference)
    const paystackMsg = paystackError.response?.data?.message || "Paystack verification failed";
    console.error("Paystack verify error:", paystackMsg);
    return res.status(400).json({ success: false, message: paystackMsg });
  }

  try {
    const paymentData = paystackResponse.data;
    const txStatus = paymentData.data?.status;
    const status = txStatus === "success" ? "Completed" : "Failed";
    const amount = (paymentData.data?.amount || 0) / 100; // kobo → Naira
    const { attendanceType } = paymentData.data?.metadata || {};

    // Avoid duplicate purchase records
    const existing = await Purchase.findOne({ courseId, userId });
    if (!existing) {
      await Purchase.create({
        courseId,
        userId,
        amount,
        attendanceType: attendanceType || "Physical",
        status,
      });
    } else if (existing.status !== "Completed" && status === "Completed") {
      existing.status = "Completed";
      await existing.save();
    }

    if (status === "Completed") {
      // Use $addToSet to safely enroll without triggering pre-save middleware
      const [updatedUser, updatedCourse] = await Promise.all([
        User.findByIdAndUpdate(userId, { $addToSet: { enrolledCourses: courseId } }, { new: true }),
        Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: userId } }, { new: true }).populate('educator', 'name email'),
      ]);

      // Send enrollment emails (non-blocking — failures won't affect the response)
      const finalAttendanceType = attendanceType || "Physical";
      const emailPromises = [];

      if (updatedUser?.email) {
        emailPromises.push(
          sendEnrollmentConfirmationEmail({
            studentName: updatedUser.name,
            studentEmail: updatedUser.email,
            courseTitle: updatedCourse?.courseTitle || "Course",
            courseMode: updatedCourse?.courseMode || "",
            attendanceType: finalAttendanceType,
            courseAddress: updatedCourse?.courseAddress || "",
            meetingUrl: updatedCourse?.meetingUrl || "",
            classSchedule: updatedCourse?.classSchedule || "",
            amount,
          }).catch(err => console.error("Student email error:", err.message))
        );
      }

      if (updatedCourse?.educator?.email) {
        emailPromises.push(
          sendEnrollmentNotificationEmail({
            educatorName: updatedCourse.educator.name,
            educatorEmail: updatedCourse.educator.email,
            studentName: updatedUser?.name || "A student",
            studentEmail: updatedUser?.email || "N/A",
            courseTitle: updatedCourse.courseTitle,
            attendanceType: finalAttendanceType,
            amount,
          }).catch(err => console.error("Educator email error:", err.message))
        );
      }

      // Fire emails in parallel without awaiting (non-blocking)
      Promise.all(emailPromises);

      return res.json({ success: true, message: "Enrollment successful" });
    } else {
      return res.status(400).json({ success: false, message: `Payment status: ${txStatus}` });
    }
  } catch (error) {
    console.error("verifyPayment DB error:", error.message);
    return res.status(500).json({ success: false, message: "Error saving enrollment: " + error.message });
  }
};



// Update user Course Progress
export const updateCourseProgress = async (req, res) => {

  try {

    const { courseId, lectureId } = req.body;
    const userId = req.body.userId;

    if (!courseId || !lectureId) {
      return res.json({ success: false, message: "courseId and lectureId are required" });
    }

    // 1. Get total lectures in this course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    const totalLectures = course.courseContent.reduce(
      (sum, chapter) => sum + chapter.chapterContent.length,
      0
    );

    // 2. Find or create progress
    let progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      progress = new CourseProgress({ userId, courseId, lectureCompleted: [] });
    }

    // 3. Add lecture if not already marked
    if (!progress.lectureCompleted.includes(lectureId)) {
      progress.lectureCompleted.push(lectureId);
    }

    // 4. Check course completion
    if (progress.lectureCompleted.length >= totalLectures) {
      progress.completed = true;
    }

    await progress.save();

    res.json({
      success: true,
      message: progress.completed
        ? "Congratulations! You completed this course 🎉"
        : "Lecture marked as completed",
      progress,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// user Course progress
export const getUserCourseProgress = async (req, res) => {

  try {
    const { courseId } = req.body;
    const userId = req.body.userId;
    const progressData = await CourseProgress.findOne({ userId, courseId })
    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}

// add user Ratings Course

export const addUserRating = async (req, res) => {
  const { courseId, rating } = req.body;
  const userId = req.body.userId || req.user.id; // use from token if available

  if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
    return res.json({ success: false, message: "Invalid Details" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: "Course Not Found" });
    }

    const user = await User.findById(userId);
    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({ success: false, message: "User did not enroll in this course" });
    }

    const existingRatingIndex = course.courseRatings.findIndex(
      (r) => r.userId.toString() === userId.toString()
    );

    if (existingRatingIndex >= 0) {
      // update existing rating
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      // add new rating
      course.courseRatings.push({ userId, rating });
    }

    await course.save();
    return res.json({ success: true, message: "Rating added successfully!" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get quiz questions
export const fetchQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quiz = await Quiz.findOne({ courseId });

    if (!quiz) {
      return res.status(404).json({ message: "No quiz found for this course" });
    }

    res.json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Submit answers
export const sumbitQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId, answers } = req.body;
    // answers = [{ questionId, selectedOption }]

    const quiz = await Quiz.findOne({ courseId }).populate("courseId", "name");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let correctCount = 0;
    const evaluatedAnswers = answers.map((ans) => {
      const question = quiz.questions.id(ans.questionId); // ✅ use subdocument id
      if (!question) return null;

      const isCorrect = question.correctAnswer === ans.selectedOption;
      if (isCorrect) correctCount++;

      return {
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect,
      };
    }).filter(Boolean);

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passMark = 50;

    // optional: save progress
    const progress = await CourseProgress.findOneAndUpdate(
      { userId, courseId },
      {
        quizTaken: true,
        quizScore: score,
        quizPassed: score >= passMark,
        quizAnswers: evaluatedAnswers,
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "Quiz submitted",
      score,
      passed: score >= passMark,
      totalQuestions: quiz.questions.length,
      correctCount,
      progress,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const retakeCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    await CourseProgress.findOneAndUpdate(
      { userId, courseId },
      {
        completed: false,
        lectureCompleted: [],
        quizTaken: false,
        quizScore: 0,
        quizPassed: false,
        quizAnswers: []
      }
    );

    res.json({ success: true, message: "Progress reset successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



//API to generate Certificate
const SEAL_IMAGE_URL = "https://res.cloudinary.com/dyii5iyqq/image/upload/v1756986671/logo_arebic.png";
const TEMPLATE_URL = "https://res.cloudinary.com/dyii5iyqq/image/upload/v1756987767/background_qvwsuz.png";

export const getCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.body; // from auth middleware

    // ✅ Fetch user info
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Fetch course progress
    const progress = await CourseProgress.findOne({ userId, courseId })
      .populate({
        path: "courseId",
        populate: { path: "educator", select: "name email" },
      });

    if (!progress) {
      return res.status(404).json({ success: false, message: "Course progress not found" });
    }

    // ✅ If already generated
    if (progress.certificateUrl) {
      return res.json({ success: true, certificateUrl: progress.certificateUrl });
    }

    const course = progress.courseId;
    const certificateId = uuidv4().slice(0, 8).toUpperCase();
    const today = new Date().toLocaleDateString();

    // ✅ Fetch template & seal
    const [templateResponse, sealResponse] = await Promise.all([
      axios.get(TEMPLATE_URL, { responseType: "arraybuffer" }),
      axios.get(SEAL_IMAGE_URL, { responseType: "arraybuffer" }),
    ]);

    const templateBuffer = Buffer.from(templateResponse.data, "binary");
    const sealBuffer = Buffer.from(sealResponse.data, "binary");

    // ✅ Create PDF
    const doc = new PDFDocument({ size: "A4", layout: "landscape" });
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "certificates",
          access_mode: "public",
        },
        async (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Cloudinary upload failed",
              error: err,
            });
          }

          progress.certificateUrl = result.secure_url;
          await progress.save();

          return res.json({ success: true, certificateUrl: result.secure_url });
        }
      );

      streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
    });

    // 🎨 Background
    doc.image(templateBuffer, 0, 0, {
      width: doc.page.width,
      height: doc.page.height,
    });

    // 🏛️ Logo
    doc.image(sealBuffer, doc.page.width / 2 - 35, 40, { width: 70 });

    // 📌 Date & Certificate ID (top-right, inside page)
    doc.fontSize(12).fillColor("#000").font("Helvetica");


    // Certificate ID ~ slightly below Date
    doc.text(`Certificate ID ${certificateId}`, doc.page.width - 200, 80, {
      align: "left",
    });


    // 🏫 Institution Name
    doc.fontSize(24).fillColor("#0b0b0c").font("Helvetica-Bold");
    doc.text("KANO INDEPENDENT RESEARCH CENTRE TRUST", 0, 140, { align: "center" });

    // 📝 Title
    doc.fontSize(20).fillColor("#e69900").font("Helvetica-Bold");
    doc.text("Certificate of Completion", 0, 170, { align: "center" });

    // 📝 Student
    doc.fontSize(34).fillColor("#0c12be").font("Helvetica-Bold");
    doc.text(user.name, 0, 250, { align: "center" });

    // 📚 Course info
    doc.fontSize(18).fillColor("#000").font("Helvetica");
    doc.text(`has successfully completed the course "${course.courseTitle}"`, 60, 310, {
      align: "center",
      width: doc.page.width - 120,
    });
    doc.text(`with a score of ${progress.quizScore}% on ${today}`, 60, 345, {
      align: "center",
      width: doc.page.width - 120,
    });

    // ✍️ Signature (bottom-left, inside page)
    const signatory = "___________________";
    doc.fontSize(14).fillColor("#0A1D66").font("Helvetica-Bold");
    doc.text(signatory, 100, 470, { align: "left" });
    doc.fontSize(12).fillColor("#555").font("Helvetica");
    doc.text("KIRCT-DG/CEO", 100, 490, { align: "left" });


    // ✍️ Signatory (bottom-right, inside page)
    const signatory1 = "___________________";

    doc.fontSize(14).fillColor("#0A1D66").font("Helvetica-Bold");
    doc.text(signatory1, 0, 470, {
      align: "right",
      width: doc.page.width - 100, // keep margin from edge
    });

    doc.fontSize(12).fillColor("#555").font("Helvetica");
    doc.text("KIRCT-Admin", 0, 490, {
      align: "right",
      width: doc.page.width - 100,
    });


    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// API to Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification token." });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    // Generate JWT to login the user immediately
    const loginToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      success: true,
      message: "Email verified successfully!",
      token: loginToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }
    });

  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
