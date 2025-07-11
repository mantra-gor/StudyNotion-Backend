const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    timeDuration: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    videoInfo: {
      type: Object,
      required: true,
      properties: {
        key: { type: String },
        contentType: { type: String },
        objectUrl: { type: String },
      },
    },
    videoUrl: {
      type: String,
      // required: true, //this is old (cloudinary)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubSection", subSectionSchema);
