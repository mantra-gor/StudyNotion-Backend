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
  },
  { timestamps: true }
);
