import express from 'express';
import authUser from '../middlewares/authUser.js';
import { addUserRating, changePassword, fetchQuiz, forgotPassword, getCertificate, getUserCourseProgress, getUserData, purchaseCourse, registerUser, resetPassword, retakeCourse, sumbitQuiz, updateCourseProgress, updateProfile, userEnrolledCourses, userLogin, verifyEmail, verifyPayment } from '../controllers/userController.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router();

// Route to add a user 

userRouter.post('/register' ,registerUser)
userRouter.get('/verify-email/:token', verifyEmail)
userRouter.post('/update',upload.single('image'), authUser, updateProfile )  
userRouter.post('/login' ,userLogin)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password/:token', resetPassword)
userRouter.post('/change', authUser ,changePassword)
userRouter.get('/data' ,authUser, getUserData)
userRouter.get('/enrolled-course' , authUser, userEnrolledCourses ) 
userRouter.post('/purchase' , authUser, purchaseCourse)
userRouter.post('/verify-payment' , authUser, verifyPayment)
userRouter.post('/update-course-progress', authUser , updateCourseProgress )
userRouter.post('/get-course-progress' ,authUser, getUserCourseProgress )
userRouter.post('/add-rating',authUser , addUserRating)
userRouter.get("/quiz/:courseId" , authUser, fetchQuiz ) 
userRouter.post('/quiz/:courseId/submit', authUser, sumbitQuiz);
userRouter.post("/reset-progress", authUser, retakeCourse);
userRouter.post("/certificate/:courseId" , authUser, getCertificate ) 

export default userRouter; 