import Internship from "../models/Internship.js";
import JobApplication from "../models/JobApplication.js";
import JobVacancy from "../models/JobVacancy.js";
import News from "../models/News.js";
import { v2 as cloudinary } from "cloudinary";
import {
    sendSubmissionEmail,
    sendInterviewEmail,
    sendRejectionEmail,
    sendApprovalEmail
} from "../config/emailUtils.js";

// --- Internship Logic ---

// Public: Apply for Internship
export const applyInternship = async (req, res) => {
    try {
        const {
            name, email, phone, gender, institution, course, department, level,
            startDate, endDate, reason
        } = req.body;

        // Check for existing internship application with same email or phone
        const existingApp = await Internship.findOne({ $or: [{ email }, { phone }] });
        if (existingApp) {
            return res.status(400).json({ success: false, message: "You have already applied for an internship." });
        }

        let fileUrl = "";

        // Upload file if exists
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" });
            fileUrl = result.secure_url;
        }

        const application = new Internship({
            name, email, phone, gender, institution, course, department, level,
            startDate, endDate, reason, file: fileUrl
        });

        await application.save();

        // Send submission email
        await sendSubmissionEmail(name, email, department, "Internship");

        res.json({ success: true, message: "Internship application submitted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin: Get All Internships
export const getInternships = async (req, res) => {
    try {
        const internships = await Internship.find({}).sort({ createdAt: -1 });
        res.json(internships);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin: Update Internship Status 
export const updateInternshipStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, interviewDate, interviewTime, interviewVenue, startDate } = req.body;
        console.log("INTERNAL: updateInternshipStatus", { status, interviewDate, interviewTime, interviewVenue, startDate });

        const application = await Internship.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        // Send email based on status
        if (status === "Invite") {
            await sendInterviewEmail(application.name, application.email, "Internship", interviewDate, interviewTime, interviewVenue);
        } else if (status === "Approved") {
            await sendApprovalEmail(application.name, application.email, "Internship", startDate);
        } else if (status === "Rejected") {
            await sendRejectionEmail(application.name, application.email, "Internship");
        }

        res.json({ success: true, application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- Job Application Logic ---

// Public: Apply for Job
export const applyJob = async (req, res) => {
    try {
        const {
            name, email, phone, gender, address, qualification, experience,
            position, coverLetter
        } = req.body;

        // Check for existing job application with same email/phone AND same position
        const existingJobApp = await JobApplication.findOne({
            $and: [
                { $or: [{ email }, { phone }] },
                { position }
            ]
        });

        if (existingJobApp) {
            return res.status(400).json({ success: false, message: `You have already applied for the ${position} position.` });
        }

        let cvUrl = "";

        // Upload CV if exists
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" });
            cvUrl = result.secure_url;
        }

        const application = new JobApplication({
            name, email, phone, gender, address, qualification, experience,
            position, coverLetter, cv: cvUrl
        });

        await application.save();

        // Send submission email
        await sendSubmissionEmail(name, email, position, "Job");

        res.json({ success: true, application, message: "Job application submitted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin: Get All Job Applications
export const getJobApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find({}).sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin: Update Job Application Status
export const updateJobStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, interviewDate, interviewTime, interviewVenue, startDate } = req.body;
        console.log("INTERNAL: updateJobStatus", { status, interviewDate, interviewTime, interviewVenue, startDate });

        const application = await JobApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        // Send email based on status
        if (status === "Invite") {
            await sendInterviewEmail(application.name, application.email, "Job", interviewDate, interviewTime, interviewVenue);
        } else if (status === "Approved") {
            await sendApprovalEmail(application.name, application.email, "Job", startDate);
        } else if (status === "Rejected") {
            await sendRejectionEmail(application.name, application.email, "Job");
        }

        res.json({ success: true, application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- News Management Logic ---

// Admin: Add News
export const addNews = async (req, res) => {
    try {
        const { title, summary, content, date } = req.body;
        const imageUrls = [];

        if (!req.files || req.files.length === 0) {
            return res.json({ success: false, message: "At least one image is required" });
        }

        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
            imageUrls.push(result.secure_url);
        }

        const news = new News({
            title, summary, content, date, images: imageUrls
        });

        await news.save();
        res.json({ success: true, message: "News added successfully!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Public/Admin: Get All News
export const getNews = async (req, res) => {
    try {
        const news = await News.find({}).sort({ createdAt: -1 });
        res.json({ success: true, news });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Admin: Delete News
export const deleteNews = async (req, res) => {
    try {
        const { id } = req.body;
        await News.findByIdAndDelete(id);
        res.json({ success: true, message: "News deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Admin: Update News
export const updateNews = async (req, res) => {
    try {
        const { id, title, summary, content, date, status } = req.body;

        let updateData = { title, summary, content, date, status };

        // If new images uploaded, replace existing set
        if (req.files && req.files.length > 0) {
            const imageUrls = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
                imageUrls.push(result.secure_url);
            }
            updateData.images = imageUrls;
        }

        // Handle existing images kept from the edit form
        if (req.body.existingImages) {
            const kept = Array.isArray(req.body.existingImages)
                ? req.body.existingImages
                : [req.body.existingImages];

            if (updateData.images) {
                // Prepend kept images before newly uploaded ones
                updateData.images = [...kept, ...updateData.images];
            } else {
                updateData.images = kept;
            }
        }

        await News.findByIdAndUpdate(id, updateData);
        res.json({ success: true, message: "News updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// --- Job Vacancy Management Logic ---

// Admin: Add Job Vacancy
export const addJobVacancy = async (req, res) => {
    try {
        const { title, description, sections, status } = req.body;
        const vacancy = new JobVacancy({
            title, description, sections, status
        });
        await vacancy.save();
        res.json({ success: true, message: "Job vacancy added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Public/Admin: Get All Job Vacancies
export const getJobVacancies = async (req, res) => {
    try {
        const vacancies = await JobVacancy.find({}).sort({ createdAt: -1 });
        res.json({ success: true, vacancies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin: Delete Job Vacancy
export const deleteJobVacancy = async (req, res) => {
    try {
        const { id } = req.body;
        await JobVacancy.findByIdAndDelete(id);
        res.json({ success: true, message: "Job vacancy deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin: Update Job Vacancy
export const updateJobVacancy = async (req, res) => {
    try {
        const { id, title, description, sections, status } = req.body;
        await JobVacancy.findByIdAndUpdate(id, {
            title, description, sections, status
        });
        res.json({ success: true, message: "Job vacancy updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
