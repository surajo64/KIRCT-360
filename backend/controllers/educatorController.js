
import { json } from 'express'
import Course from '../models/courseModel.js'
import { v2 as cloudinary } from 'cloudinary'
import Purchase from '../models/purchaseModel.js'
import User from '../models/userModel.js'
import Admin from '../models/adminModel.js'
import bcrypt, { hash } from "bcrypt";
import jwt from 'jsonwebtoken'
import CourseProgress from '../models/courseProgressModel.js'
import quizMode from '../models/quizMode.js'
import Quiz from '../models/quizMode.js'
import axios from 'axios'
import crypto from "crypto";
import streamifier from "streamifier";
import { v4 as uuidv4 } from "uuid";
import PDFDocument from "pdfkit"



// Admin Register
export const adminRegister = async (req, res) => {
  try {
    const { name, email, phone, password, role, about } = req.body;

    // check if email or phone already exists
    const existing = await Admin.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email or Phone already in use" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Build user object
    const adminData = {
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "admin",
    };

    // Only attach courses if role = educator
    if (role === "educator") {
      adminData.about = about;
    }

    const admin = await Admin.create(adminData);

    res.status(201).json({
      success: true,
      message: `${admin.role === "educator" ? "Educator" : "Admin"} registered successfully`,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        ...(admin.role === "educator" && { courses: admin.courses }), // include only if educator
      },

    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to Login as admin or educator
export const adminLogin = async (req, res) => {
  try {
    const { phone, email, password } = req.body;

    if (!phone && !email) {
      return res.status(400).json({ success: false, message: "Phone or Email is required!" });
    }

    const admin = await Admin.findOne({
      $or: [{ phone }, { email }]
    });

    if (!admin) {
      return res.status(400).json({ success: false, message: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password!" });
    }

    // Generate JWT
    const atoken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // ✅ Return token as `atoken` + user object
    return res.json({
      success: true,
      atoken: atoken,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role || "", // default empty string
      },

    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAdminData = async (req, res) => {
  try {

    const { adminId } = req.body
    const adminData = await Admin.findById(adminId).select('-password')
    res.status(200).json({ success: true, adminData })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


//  user update Profile

export const updateAdminProfile = async (req, res) => {
  try {
    const { adminId, name, phone, email, gender, about, role, address, dob, nin } = req.body
    const imageFile = req.file

    await Admin.findByIdAndUpdate(adminId, { name, phone, role, about, nin, email, address, gender, dob })

    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
      const imageUrl = imageUpload.secure_url
      await Admin.findByIdAndUpdate(adminId, { image: imageUrl })
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

    const { adminId } = req.body // ✅ this comes from your auth middleware


    if (newPassword !== confirmPassword) {
      return res.json({ success: false, message: "New password and confirm password do not match" });
    }

    const admin = await Admin.findById(adminId); // ✅ correctly placed after declaration
    if (!admin || !admin.password) {
      return res.json({ success: false, message: "User not found or password missing" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;

    await Admin.updateOne(
      { _id: adminId },
      { $set: { password: hashedPassword } }
    );


    return res.json({ success: true, message: "Password changed successfully" });

  } catch (error) {
    console.error("Password change error:", error); // 🔍 Shows the real error
    return res.status(500).json({ success: false, message: error.message });
  }
};



// user enrolled Courses with lecture limk
export const userEnrolledCourses = async (req, res) => {

  try {

    const { userId } = req.body;

    console.log("respone:", userId)
    const userData = await User.findById(userId).populate('enrolledCourses');

    res.json({ success: true, enrolledCourses: userData.enrolledCourses })


  } catch (error) {

    res.json({ success: false, message: error.message })
  }
}



// API to Add course
export const addCourse = async (req, res) => {
  try {
    const { courseData, adminId } = req.body;
    const imageFile = req.file;


    if (!imageFile) {
      return res.json({ sucess: false, message: " Course Thumbnail is Missing!" })
    }

    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = adminId;

    // 🔹 Don't allow client to send purchasePrice directly, logic is in model middleware
    // We expect coursePricePhysical and coursePriceVirtual in parsedCourseData
    delete parsedCourseData.purchasePrice;
    delete parsedCourseData.purchasePricePhysical;
    delete parsedCourseData.purchasePriceVirtual;

    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path)
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();
    res.json({ success: true, message: "Course Added Successifully!" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to Update Course
export const updateCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;

    if (!courseData) {
      return res.json({ success: false, message: "Course data is required" });
    }

    const parsedCourseData = JSON.parse(courseData);

    // Ensure courseId exists
    if (!parsedCourseData._id) {
      return res.json({ success: false, message: "Course ID is missing" });
    }

    // Find course
    const existingCourse = await Course.findById(parsedCourseData._id);
    if (!existingCourse) {
      return res.json({ success: false, message: "Course not found" });
    }

    // Update fields
    existingCourse.courseTitle = parsedCourseData.courseTitle || existingCourse.courseTitle;
    existingCourse.courseDescription = parsedCourseData.courseDescription || existingCourse.courseDescription;

    // Update Course Mode
    existingCourse.courseMode = parsedCourseData.courseMode ?? existingCourse.courseMode;

    // Update Pricing
    existingCourse.coursePrice = parsedCourseData.coursePrice ?? existingCourse.coursePrice;
    existingCourse.coursePricePhysical = parsedCourseData.coursePricePhysical ?? existingCourse.coursePricePhysical;
    existingCourse.coursePriceVirtual = parsedCourseData.coursePriceVirtual ?? existingCourse.coursePriceVirtual;

    // Update Mode Details
    existingCourse.courseAddress = parsedCourseData.courseAddress ?? existingCourse.courseAddress;
    existingCourse.meetingUrl = parsedCourseData.meetingUrl ?? existingCourse.meetingUrl;
    existingCourse.classSchedule = parsedCourseData.classSchedule ?? existingCourse.classSchedule;

    existingCourse.discount = parsedCourseData.discount ?? existingCourse.discount;

    existingCourse.courseContent = parsedCourseData.courseContent || existingCourse.courseContent;

    // If new thumbnail is uploaded, replace it
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path);
      existingCourse.courseThumbnail = imageUpload.secure_url;
    }

    await existingCourse.save();

    res.json({ success: true, message: "Course updated successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



// API to get Educator courses
export const educatorCourses = async (req, res) => {
  try {
    const adminId = req.body.adminId;
    // 1️⃣ Find all courses by educator
    const courses = await Course.find({ educator: adminId });

    // 2️⃣ Extract all courseIds
    const courseIds = courses.map(c => c._id);

    // 3️⃣ Find all purchases for these courses
    const purchases = await Purchase.find({ courseId: { $in: courseIds } });

    // 4️⃣ Build a map of courseId -> { earnings, count }
    const courseStats = {};
    purchases.forEach(purchase => {
      const price = purchase.amount || 0;
      const courseId = purchase.courseId.toString();

      if (!courseStats[courseId]) {
        courseStats[courseId] = { earnings: 0, price: price };
      }

      courseStats[courseId].earnings += price;
      courseStats[courseId].price;
    });

    // 5️⃣ Return courses and stats
    res.json({ success: true, educatorCourses: courses, stats: courseStats });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Api To publishe or Unpublish Course
export const togglePublish = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { isPublished } = req.body;

    const course = await Course.findByIdAndUpdate(
      courseId,
      { isPublished },
      { new: false } // return updated doc
    );

    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get Educator Dashboard

export const educatorDashboardData = async (req, res) => {
  try {
    const adminId = req.body.adminId;
    const courses = await Course.find({ educator: adminId });
    const totalCourses = courses.length;

    const courseIds = courses.map(course => course._id);

    // calculate Total Earnings
    const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'Completed' });
    const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

    // Collect enrolled students
    const enrolledStudentsData = [];
    let totalStudents = 0;
    for (const course of courses) {
      const students = await User.find(
        { _id: { $in: course.enrolledStudents } },
        'name image'
      );
      totalStudents += students.length;
      students.forEach(student => {
        enrolledStudentsData.push({ courseTitle: course.courseTitle, student });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalCourses,
        totalEarnings,
        totalStudents,
        enrolledStudentsData,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get Enrolled Students data
export const enrolledStudentsData = async (req, res) => {

  try {
    const adminId = req.body.adminId;
    const courses = await Course.find({ educator: adminId })
    const courseIds = courses.map(course => course._id)

    const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'Completed' }).populate('userId', 'name image').populate('courseId', 'courseTitle');
    // now add progress status from CourseProgress
    const enrolledStudents = await Promise.all(
      purchases.map(async (purchase) => {
        const progressDoc = await CourseProgress.findOne({
          userId: purchase.userId._id,
          courseId: purchase.courseId._id,
        });

        let progress = "On Going";
        if (progressDoc && progressDoc.completed) {
          progress = "Completed";
        }

        return {
          student: purchase.userId,
          progress,
          courseTitle: purchase.courseId.courseTitle,
          courseId: purchase.courseId._id,
          purchaseDate: purchase.createdAt,
          completedLectures: progressDoc?.lectureCompleted || [],
          quizPassed: progressDoc?.quizPassed || false,
          quizScore: progressDoc?.quizScore || 0,
          quizTaken: progressDoc?.quizTaken || false,
          certificateUrl: progressDoc?.certificateUrl || null
        };
      })
    );

    res.json({ success: true, enrolledStudents });

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}



// API Admin controllers



// Save or Update Quiz for a course
export const saveQuiz = async (req, res) => {
  try {
    const { courseId, questions } = req.body;

    let quiz = await Quiz.findOne({ courseId });

    if (quiz) {
      quiz.questions = questions; // replace old with new
      await quiz.save();
    } else {
      quiz = new Quiz({ courseId, questions });
      await quiz.save();
    }

    res.json({ success: true, message: "Quiz saved successfully", quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// API to get Admin courses
export const allCourses = async (req, res) => {
  try {

    const course = await Course.find()
    res.json({ success: true, course })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to get a single course by ID with full details
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, course });
  } catch (error) {
    console.error('Get course by ID error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Admin Dashboard
export const adminDashboardData = async (req, res) => {
  try {
    const courses = await Course.find()
    const totalCourses = courses.length;

    const totalStudents = await User.countDocuments({});

    const courseIds = courses.map(course => course._id)
    // calculate Total Earnings
    const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'Completed' });
    const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

    // Collect Unique enrolled students IDs 
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find({ _id: { $in: course.enrolledStudents } }, 'name image');
      students.forEach(student => {
        enrolledStudentsData.push({ courseTitle: course.courseTitle, student });
      });
    }
    res.json({ success: true, dashboardData: { totalCourses, totalEarnings, enrolledStudentsData, totalStudents } })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to get All Users (Students + Educators + Admins)
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all students
    const students = await User.find().select('-password').lean();

    // Fetch all admins/educators
    const admins = await Admin.find().select('-password').lean();

    // Combine and add userType field
    const allUsers = [
      ...students.map(user => ({ ...user, userType: 'student' })),
      ...admins.map(user => ({ ...user, userType: user.role }))
    ];

    // Sort by creation date (newest first)
    allUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      users: allUsers,
      totalCount: allUsers.length,
      studentCount: students.length,
      educatorCount: admins.filter(a => a.role === 'educator').length,
      adminCount: admins.filter(a => a.role === 'admin').length
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get All Educators only
export const getAllEducators = async (req, res) => {
  try {
    const educators = await Admin.find({ role: 'educator' }).select('-password');

    // Get course count and student count for each educator
    const educatorsWithStats = await Promise.all(
      educators.map(async (educator) => {
        const courses = await Course.find({ educator: educator._id });
        const courseIds = courses.map(c => c._id);

        // Get unique enrolled students
        const enrolledStudents = new Set();
        courses.forEach(course => {
          course.enrolledStudents.forEach(studentId => {
            enrolledStudents.add(studentId.toString());
          });
        });

        return {
          ...educator.toObject(),
          courseCount: courses.length,
          studentCount: enrolledStudents.size
        };
      })
    );

    res.json({
      success: true,
      educators: educatorsWithStats,
      totalCount: educatorsWithStats.length
    });
  } catch (error) {
    console.error('Get all educators error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to Update User (Student or Educator/Admin)
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userType, ...updateData } = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.password;
    delete updateData._id;
    delete updateData.userType; // Don't allow changing between student and admin/educator

    let updatedUser;

    if (userType === 'student') {
      // Students can't have role changed
      delete updateData.role;
      updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');
    } else {
      // Admin or Educator - allow role to be updated
      updatedUser = await Admin.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');
    }

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to Delete User (Soft delete - mark as inactive)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userType } = req.body;

    let deletedUser;

    if (userType === 'student') {
      // Check if student is enrolled in any courses
      const student = await User.findById(userId);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }

      if (student.enrolledCourses && student.enrolledCourses.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete student with active course enrollments. Please unenroll first.'
        });
      }

      // Hard delete for students with no enrollments
      deletedUser = await User.findByIdAndDelete(userId);
    } else {
      // For educators/admins, check if they have courses
      const educator = await Admin.findById(userId);
      if (!educator) {
        return res.status(404).json({ success: false, message: 'Educator/Admin not found' });
      }

      const courses = await Course.find({ educator: userId });
      if (courses.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete educator with ${courses.length} active course(s). Please reassign or delete courses first.`
        });
      }

      deletedUser = await Admin.findByIdAndDelete(userId);
    }

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to Toggle User Status (Activate/Deactivate)
export const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userType, isActive } = req.body;

    let updatedUser;

    if (userType === 'student') {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { isActive: isActive },
        { new: true }
      ).select('-password');
    } else {
      updatedUser = await Admin.findByIdAndUpdate(
        userId,
        { isActive: isActive },
        { new: true }
      ).select('-password');
    }

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: updatedUser
    });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check if course has enrolled students
    if (course.enrolledStudents && course.enrolledStudents.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete course with ${course.enrolledStudents.length} enrolled student(s). Please unenroll students first.`
      });
    }

    // Delete associated quiz if exists
    await Quiz.findOneAndDelete({ courseId });

    // Delete associated course progress records
    await CourseProgress.deleteMany({ courseId });

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get Filtered Enrolled Students
export const getFilteredEnrolledStudents = async (req, res) => {
  try {
    const { adminId } = req.body;
    const { courseId, startDate, endDate, searchTerm } = req.query;

    // Build query for courses
    let courseQuery = {};

    // If not admin, filter by educator
    const admin = await Admin.findById(adminId);
    if (admin && admin.role === 'educator') {
      courseQuery.educator = adminId;
    }

    // If specific course is selected
    if (courseId) {
      courseQuery._id = courseId;
    }

    const courses = await Course.find(courseQuery);
    const courseIds = courses.map(course => course._id);

    // Build query for purchases
    let purchaseQuery = {
      courseId: { $in: courseIds },
      status: 'Completed'
    };

    // Filter by date range
    if (startDate || endDate) {
      purchaseQuery.createdAt = {};
      if (startDate) purchaseQuery.createdAt.$gte = new Date(startDate);
      if (endDate) purchaseQuery.createdAt.$lte = new Date(endDate);
    }

    const purchases = await Purchase.find(purchaseQuery)
      .populate('userId', 'name image email')
      .populate('courseId', 'courseTitle');


    // Get progress for each enrollment
    let enrolledStudents = await Promise.all(
      purchases.map(async (purchase) => {
        const progressDoc = await CourseProgress.findOne({
          userId: purchase.userId._id,
          courseId: purchase.courseId._id,
        });

        let progress = "On Going";
        let progressPercentage = 0;

        if (progressDoc) {
          if (progressDoc.completed) {
            progress = "Completed";
            progressPercentage = 100;
          } else {
            // Calculate progress percentage
            const totalLectures = progressDoc.totalLectures || 1;
            const completedLectures = progressDoc.completedLectures?.length || 0;
            progressPercentage = Math.round((completedLectures / totalLectures) * 100);
          }
        }

        return {
          student: purchase.userId,
          progress,
          progressPercentage,
          courseTitle: purchase.courseId.courseTitle,
          courseId: purchase.courseId._id,
          purchaseDate: purchase.createdAt,
          amount: purchase.amount,
          completedLectures: progressDoc?.lectureCompleted || []
        };
      })
    );

    // Filter by search term if provided
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      enrolledStudents = enrolledStudents.filter(enrollment =>
        enrollment.student.name.toLowerCase().includes(searchLower) ||
        enrollment.courseTitle.toLowerCase().includes(searchLower) ||
        enrollment.student.email.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      success: true,
      enrolledStudents,
      totalCount: enrolledStudents.length
    });
  } catch (error) {
    console.error('Get filtered enrolled students error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API for Educator to update student progress manually
export const updateStudentProgress = async (req, res) => {
  try {
    const { userId, courseId, lectureId, markAsCompleted, isCourseCompleted } = req.body;

    // Find progress record
    let progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      // If not exists, create one (educator initializing progress)
      progress = new CourseProgress({
        userId,
        courseId,
        lectureCompleted: []
      });
    }

    // Handle Lecture Progress
    if (lectureId) {
      if (markAsCompleted) {
        if (!progress.lectureCompleted.includes(lectureId)) {
          progress.lectureCompleted.push(lectureId);
        }
      } else {
        // Unmark
        progress.lectureCompleted = progress.lectureCompleted.filter(id => id !== lectureId);
      }
    }

    // Handle Course Completion based on lectures
    const course = await Course.findById(courseId);
    if (course) {
      const totalLectures = course.courseContent.reduce(
        (sum, chapter) => sum + chapter.chapterContent.length, 0
      );

      // Auto-update completion status
      if (progress.lectureCompleted.length >= totalLectures) {
        progress.completed = true;
      } else {
        // If manual override isn't forcing it to true, ensure it is false if not all lectures done
        if (isCourseCompleted === undefined) {
          progress.completed = false;
        }
      }
    }

    // Manual Override (if provided)
    if (isCourseCompleted !== undefined) {
      progress.completed = isCourseCompleted;
    }

    await progress.save();

    res.json({ success: true, message: "Progress updated successfully", progress });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// Reset Student Progress (Retake Quiz)
export const resetStudentQuiz = async (req, res) => {
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
    res.json({ success: true, message: "Student progress reset successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const SEAL_IMAGE_URL = "https://res.cloudinary.com/dyii5iyqq/image/upload/v1756986671/logo_arebic.png";
const TEMPLATE_URL = "https://res.cloudinary.com/dyii5iyqq/image/upload/v1756987767/background_qvwsuz.png";

// Generate Student Certificate
export const generateStudentCertificate = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const progress = await CourseProgress.findOne({ userId, courseId }).populate("courseId");
    if (!progress) return res.status(404).json({ success: false, message: "Course progress not found" });

    if (progress.certificateUrl) {
      return res.json({ success: true, certificateUrl: progress.certificateUrl });
    }

    const course = progress.courseId;
    const certificateId = uuidv4().slice(0, 8).toUpperCase();
    const today = new Date().toLocaleDateString();

    const [templateResponse, sealResponse] = await Promise.all([
      axios.get(TEMPLATE_URL, { responseType: "arraybuffer" }),
      axios.get(SEAL_IMAGE_URL, { responseType: "arraybuffer" }),
    ]);

    const templateBuffer = Buffer.from(templateResponse.data, "binary");
    const sealBuffer = Buffer.from(sealResponse.data, "binary");

    const doc = new PDFDocument({ size: "A4", layout: "landscape" });
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "certificates", access_mode: "public" },
        async (err, result) => {
          if (err) return res.status(500).json({ success: false, message: "Upload failed", error: err });

          progress.certificateUrl = result.secure_url;
          await progress.save();
          return res.json({ success: true, certificateUrl: result.secure_url });
        }
      );
      streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
    });

    doc.image(templateBuffer, 0, 0, { width: doc.page.width, height: doc.page.height });
    doc.image(sealBuffer, doc.page.width / 2 - 35, 40, { width: 70 });
    doc.fontSize(12).fillColor("#000").font("Helvetica");
    doc.text(`Certificate ID ${certificateId}`, doc.page.width - 200, 80, { align: "left" });
    doc.fontSize(24).fillColor("#0b0b0c").font("Helvetica-Bold");
    doc.text("KANO INDEPENDENT RESEARCH CENTRE TRUST", 0, 140, { align: "center" });
    doc.fontSize(20).fillColor("#e69900").font("Helvetica-Bold");
    doc.text("Certificate of Completion", 0, 170, { align: "center" });
    doc.fontSize(34).fillColor("#0c12be").font("Helvetica-Bold");
    doc.text(user.name, 0, 250, { align: "center" });
    doc.fontSize(18).fillColor("#000").font("Helvetica");
    doc.text(`has successfully completed the course "${course.courseTitle}"`, 60, 310, { align: "center", width: doc.page.width - 120 });
    doc.text(`with a score of ${progress.quizScore}% on ${today}`, 60, 345, { align: "center", width: doc.page.width - 120 });

    // Signatures
    const signatory = "___________________";
    doc.fontSize(14).fillColor("#0A1D66").font("Helvetica-Bold");
    doc.text(signatory, 100, 470, { align: "left" });
    doc.fontSize(12).fillColor("#555").font("Helvetica");
    doc.text("KIRCT-DG/CEO", 100, 490, { align: "left" });
    doc.fontSize(14).fillColor("#0A1D66").font("Helvetica-Bold");
    doc.text(signatory, 0, 470, { align: "right", width: doc.page.width - 100 });
    doc.fontSize(12).fillColor("#555").font("Helvetica");
    doc.text("KIRCT-Admin", 0, 490, { align: "right", width: doc.page.width - 100 });

    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};