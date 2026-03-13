import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    institution: { type: String, required: true },
    course: { type: String, required: true },
    department: { type: String, required: true },
    level: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    reason: { type: String, required: true },
    file: { type: String }, // URL to uploaded file
    status: { type: String, default: "Pending" }, // Pending, Invite, Approved, Rejected
}, { timestamps: true });

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;
