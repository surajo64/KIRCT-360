import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    images: { type: [String], required: true },
    status: { type: Boolean, default: true },
}, { timestamps: true });

const News = mongoose.model("News", newsSchema);

export default News;
