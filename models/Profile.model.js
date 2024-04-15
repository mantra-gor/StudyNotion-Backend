const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", null],
    },
    dob: {
      type: Date,
    },
    about: {
      type: String,
      trim: true,
    },
    phoneNo: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
