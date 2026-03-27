import mongoose from "mongoose";
import 'dotenv/config';
import Course from './models/courseModel.js';

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");

        const course = await Course.findOne({});
        if (!course) {
            console.log("No course found.");
            process.exit(0);
        }

        console.log(`Testing save for course: ${course._id}`);
        course.enrolledStudents.push(new mongoose.Types.ObjectId());
        await course.save();

        console.log("Course saved successfully.");
    } catch (error) {
        console.error("Error saving course:", error.message || error);
    } finally {
        mongoose.disconnect();
    }
}

test();
