const mongoose = require("mongoose");
const { USER_GENDER } = require("../config/constants");

const profileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: Object.values(USER_GENDER),
    },
    dob: {
      type: Date,
    },
    about: {
      type: String,
      trim: true,
    },
    phoneNo: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
