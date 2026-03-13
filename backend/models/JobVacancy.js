import mongoose from "mongoose";

const jobVacancySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    sections: [{
        heading: { type: String, required: true },
        items: [{ type: String, required: true }]
    }],
    status: { type: String, enum: ["on going", "closed"], default: "on going" }
}, { timestamps: true });

const JobVacancy = mongoose.model("JobVacancy", jobVacancySchema);

export default JobVacancy;
