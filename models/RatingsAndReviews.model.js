const mongoose = require("mongoose");

const ratingsAndReviewsSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RatingsAndReview", ratingsAndReviewsSchema);
