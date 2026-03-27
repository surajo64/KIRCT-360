import { request } from "express";
import mongoose from "mongoose";


const lectureSchema = new mongoose.Schema({
  lectureId: { type: String, require: true },
  lectureTitle: { type: String, require: true },
  lectureDuration: { type: Number, require: true },
  lectureOrder: { type: Number, require: true },
  lectureUrl: { type: String, require: true },
  isPreviewFree: { type: Boolean, require: true },
}, { _id: false })

const chapterSchema = new mongoose.Schema({
  chapterId: { type: String, require: true },
  chapterOrder: { type: Number, require: true },
  chapterTitle: { type: String, require: true },
  chapterContent: [lectureSchema]
}, { _id: false })

const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseDescription: { type: String, required: true },
  courseThumbnail: { type: String },
  // We keep coursePrice as a fallback or base price, but prefer specific ones
  coursePrice: { type: Number, required: true },
  courseMode: { type: String, enum: ['Physical', 'Virtual', 'Both'], default: 'Both', required: true },
  coursePricePhysical: { type: Number, default: 0 },
  coursePriceVirtual: { type: Number, default: 0 },
  courseAddress: { type: String, default: '' },
  meetingUrl: { type: String, default: '' },
  classSchedule: { type: String, default: '' }, // e.g., "Mondays & Wednesdays 10:00 AM"
  discount: { type: Number, required: true },
  purchasePrice: { type: Number, default: 0 },
  purchasePricePhysical: { type: Number, default: 0 },
  purchasePriceVirtual: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  courseContent: [chapterSchema],
  courseRatings: [{ userId: { type: String }, rating: { type: Number, min: 1, max: 5 } }],
  educator: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

}, { timestamps: true, minimize: false })

//🔹 Pre-save middleware to auto-calc purchasePrice

courseSchema.pre("save", function (next) {
  // Calculate default purchasePrice (legacy support)
  // Discount is now a percentage (0-100)
  const discountFactor = (100 - this.discount) / 100;
  
  this.purchasePrice = Math.max(Math.round(this.coursePrice * discountFactor), 0);

  // Calculate Physical and Virtual Purchase Prices
  if (this.coursePricePhysical > 0) {
    this.purchasePricePhysical = Math.max(Math.round(this.coursePricePhysical * discountFactor), 0);
  }

  if (this.coursePriceVirtual > 0) {
    this.purchasePriceVirtual = Math.max(Math.round(this.coursePriceVirtual * discountFactor), 0);
  }

  next();
});


// 🔹 Pre-update middleware (so updates also recalc)

courseSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  // Check if any price or discount is being updated
  if (update.coursePrice !== undefined || update.discount !== undefined || update.coursePricePhysical !== undefined || update.coursePriceVirtual !== undefined) {

    // We need to access the values being updated. 
    // Note: This relies on the update object having the necessary fields.
    // In many cases, only some fields are updated. 
    
    // If discount is provided in update, use it, otherwise we'd need the doc's current discount.
    // For simplicity and safety during educator updates (where usually most fields are sent), 
    // we recalc if the fields are present.
    
    const discount = update.discount; 

    if (discount !== undefined) {
      const discountFactor = (100 - discount) / 100;
      if (update.coursePrice !== undefined) update.purchasePrice = Math.max(Math.round(update.coursePrice * discountFactor), 0);
      if (update.coursePricePhysical !== undefined) update.purchasePricePhysical = Math.max(Math.round(update.coursePricePhysical * discountFactor), 0);
      if (update.coursePriceVirtual !== undefined) update.purchasePriceVirtual = Math.max(Math.round(update.coursePriceVirtual * discountFactor), 0);
    }
  }
  next();
});


const Course = mongoose.model('Course', courseSchema)

export default Course;