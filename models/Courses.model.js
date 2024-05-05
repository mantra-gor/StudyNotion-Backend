const mongoose = require("mongoose");

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
      required: true,
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
    tags: {
      type: [String],
      required: true,
    },
    categories: {
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
      enum: ["Draft", "Published"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Courses", coursesSchema);
