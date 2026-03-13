import Course from '../models/courseModel.js';
import mongoose from "mongoose";
import fs from "fs";
import CourseProgress from '../models/courseProgressModel.js';
import Purchase from '../models/purchaseModel.js';
import User from '../models/userModel.js'
import Quiz, { questionSchema } from "../models/quizMode.js";
import Stripe from 'stripe'
import bcrypt, { hash } from "bcrypt";
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import { use } from 'react';
import axios from 'axios'
import crypto from "crypto";
import streamifier from "streamifier";
import { v4 as uuidv4 } from "uuid";
import PDFDocument from "pdfkit"



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

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });

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
      return res.status(400).json({ success: false, message: "Invalid password or Password!" });
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
    const { userId, name, phone, email, gender, address, dob, nin } = req.body
    const imageFile = req.file

    await User.findByIdAndUpdate(userId, { name, phone, nin, email, address, gender, dob })

    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
      const imageUrl = imageUpload.secure_url
      await User.findByIdAndUpdate(userId, { image: imageUrl })
    }

    res.json({ success: true, message: 'Profile Updated Successifull' })

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
    // Applying discount (assuming discount applies to all)
    const amount = Math.max(price - course.discount, 0) * 100;

    // Unique reference
    const reference = `KIRCT_${crypto.randomBytes(8).toString("hex")}`;

    // Call Paystack initialize endpoint
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: user.email,
        amount,
        reference,
        callback_url: "https://kirctrust.org/payment-callback", // optional
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

  try {
    // Verify payment with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data;
    const status = paymentData.data.status === "success" ? "Completed" : "Failed";
    const amount = paymentData.data.amount / 100; // convert kobo to Naira

    // Extract metadata
    const { attendanceType } = paymentData.data.metadata || {};

    // Record purchase
    const purchase = new Purchase({
      courseId,
      userId,
      amount,
      attendanceType: attendanceType || 'Physical', // default backup
      status,
    });
    await purchase.save();

    if (status === "Completed") {
      // Update User enrolledCourses
      const user = await User.findById(userId);
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      // Update Course userEnrolled
      const course = await Course.findById(courseId);
      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }

      return res.json({ success: true, message: "Enrollment successful" });
    } else {
      return res.status(400).json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Error verifying payment" });
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
