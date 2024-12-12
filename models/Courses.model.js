const mongoose = require("mongoose");
const { COURSES_STATUSES } = require("../config/constants");

const coursesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    thumbnailInfo: {
      type: Object,
      required: true,
      properties: {
        ObjectURL: { type: String },
        key: { type: String },
        contentType: { type: String },
      },
    },
    language: {
      type: String,
    },
    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    ratingsAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingsAndReview",
      },
    ],
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    keyFeatures: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: Object.values(COURSES_STATUSES),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", coursesSchema);
