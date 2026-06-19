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
    const quiz = await Quiz.findOne({ courseId }).populate("courseId", "courseTitle");

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

    // ✅ Check if course has a quiz
    const quiz = await Quiz.findOne({ courseId });
    const hasQuiz = !!quiz;

    // ✅ Requirement Check
    if (hasQuiz) {
      if (!progress.quizPassed) {
        return res.status(403).json({ success: false, message: "You must pass the quiz to generate a certificate" });
      }
    } else {
      if (!progress.completed) {
        return res.status(403).json({ success: false, message: "You must complete the course to generate a certificate" });
      }
    }

    // ✅ If already generated
    if (progress.certificateUrl) {
      return res.json({ success: true, certificateUrl: progress.certificateUrl });
    }

    const course = progress.courseId;
    const certificateId = uuidv4().slice(0, 8).toUpperCase();
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // ✅ Create PDF
    let isResSent = false;
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margins: { top: 0, left: 0, right: 0, bottom: 0 }, // No margins for full design control
    });

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
            if (isResSent) return;
            isResSent = true;
            return res.status(500).json({
              success: false,
              message: "Cloudinary upload failed",
              error: err,
            });
          }

          progress.certificateUrl = result.secure_url;
          await progress.save();

          if (isResSent) return;
          isResSent = true;
          return res.json({ success: true, certificateUrl: result.secure_url });
        }
      );

      streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
    });

    // --- Background Design (Precision Geometric Shapes) ---
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Top-Left Corner (Overlapping Accents)
    doc.save()
      .moveTo(0, 0).lineTo(200, 0).lineTo(0, 200).fill("#001F3F") // Dark Navy
      .moveTo(0, 0).lineTo(150, 0).lineTo(0, 150).fill("#003366") // Slightly lighter navy
      .moveTo(0, 0).lineTo(80, 0).lineTo(0, 80).fill("#0074D9");   // Light blue tip
    doc.restore();

    // Bottom-Right Corner (Overlapping Accents)
    doc.save()
      .moveTo(pageWidth, pageHeight).lineTo(pageWidth - 200, pageHeight).lineTo(pageWidth, pageHeight - 200).fill("#001F3F")
      .moveTo(pageWidth, pageHeight).lineTo(pageWidth - 150, pageHeight).lineTo(pageWidth, pageHeight - 150).fill("#003366")
      .moveTo(pageWidth, pageHeight).lineTo(pageWidth - 80, pageHeight).lineTo(pageWidth, pageHeight - 80).fill("#0074D9");
    doc.restore();

    // --- Content Layer ---

    // 🏛️ Logo & Institution Name
    try {
      console.log(`Starting logo fetch for certificate: ${certificateId}`);
      const logoResponse = await axios.get(SEAL_IMAGE_URL, {
        responseType: "arraybuffer",
        timeout: 5000 // 5 second timeout to prevent hangs
      });
      const logoBuffer = Buffer.from(logoResponse.data, "binary");
      doc.image(logoBuffer, (pageWidth / 2) - 40, 40, { width: 80 });
      console.log("Logo fetched and drawn successfully");
    } catch (e) {
      console.error("Logo failed to load or timed out:", e.message);
    }

    doc.moveDown(5.5);
    doc.fontSize(22).fillColor("#001F3F").font("Helvetica-Bold");
    doc.text("KANO INDEPENDENT RESEARCH CENTRE TRUST", 0, 135, { align: "center", characterSpacing: 1 });

    doc.moveDown(1.5);
    doc.fontSize(28).fillColor("#0074D9").font("Helvetica-Bold"); // Vibrant Blue title
    doc.text("CERTIFICATE OF ATTENDANCE", { align: "center", characterSpacing: 2 });

    doc.moveDown(1.2);
    doc.fontSize(14).fillColor("#555").font("Helvetica");
    doc.text("Presented to :", { align: "center" });

    doc.moveDown(0.8);
    doc.fontSize(42).fillColor("#000000").font("Times-BoldItalic");
    doc.text(user.name, { align: "center" });

    // ✍️ Blue underline for Name
    const nameWidth = doc.widthOfString(user.name);
    const underlineY = doc.y - 2;
    doc.moveTo((pageWidth / 2) - (nameWidth / 2) - 30, underlineY)
      .lineTo((pageWidth / 2) + (nameWidth / 2) + 30, underlineY)
      .lineWidth(2)
      .stroke("#0074D9");

    doc.moveDown(0.8);
    doc.fontSize(16).fillColor("#333").font("Helvetica");

    let dateRangeText = `held on ${today}`;
    if (course.courseStartDate && course.courseEndDate) {
      const start = new Date(course.courseStartDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
      const end = new Date(course.courseEndDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
      dateRangeText = `from ${start} to ${end}`;
    }

    // 🎓 Course Title Styling (Bold, No Italics, Quotes for differentiation)
    const courseInfoText = `For completing a training on "${course.courseTitle.toUpperCase()}", ${dateRangeText}.`;
    doc.font("Helvetica-Bold").fontSize(16).fillColor("#333")
      .text(courseInfoText, 80, doc.y, {
        align: "center",
        width: pageWidth - 160,
        lineGap: 4
      });

    // 🛡️ Pro Red Seal Graphic (Moved DOWN)
    const sealX = (pageWidth / 2);
    const sealY = pageHeight - 85;
    doc.save();
    const innerRadius = 45;
    const outerRadius = 55;
    const points = 50;
    doc.moveTo(sealX + outerRadius, sealY);
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      doc.lineTo(sealX + radius * Math.cos(angle), sealY + radius * Math.sin(angle));
    }
    doc.fill("#C00000");
    doc.restore();

    // ✍️ Signatories (Symmetric Layout and Lowered)
    const sigY = pageHeight - 85;
    const sigWidth = 240;

    // Left Signature
    doc.fontSize(12).fillColor("#000").font("Helvetica-Bold");
    doc.moveTo(100, sigY).lineTo(100 + sigWidth, sigY).lineWidth(1).stroke("#000");
    doc.text("Basheer Isah Waziri (MBBS, PhD)", 100, sigY + 10, { width: sigWidth, align: "center" });
    doc.fontSize(11).font("Helvetica").text("Program Coordinator", 100, sigY + 25, { width: sigWidth, align: "center" });

    // Right Signature
    doc.moveTo(pageWidth - 340, sigY).lineTo(pageWidth - 340 + sigWidth, sigY).stroke("#000");
    doc.fontSize(12).font("Helvetica-Bold").text("Prof. Hamisu Salihu (M.D, PhD)", pageWidth - 340, sigY + 10, { width: sigWidth, align: "center" });
    doc.fontSize(11).font("Helvetica").text("CEO/Director General", pageWidth - 340, sigY + 25, { width: sigWidth, align: "center" });

    doc.fontSize(8).fillColor("#999").text(`Certificate ID: ${certificateId}`, 40, pageHeight - 30);
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
