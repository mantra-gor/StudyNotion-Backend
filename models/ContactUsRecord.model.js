const mongoose = require("mongoose");

const contactUsRecordSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Basic email validation
    },
    countryCode: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 400,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUsRecords", contactUsRecordSchema);
