import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String },
    qualification: { type: String, required: true },
    experience: { type: String },
    position: { type: String, required: true },
    coverLetter: { type: String, required: true },
    cv: { type: String }, // URL to uploaded CV
    status: { type: String, default: "Pending" }, // Pending, Invite, Approved, Rejected
}, { timestamps: true });

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
