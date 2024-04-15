const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema.Types({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
  },
});

module.exports = mongoose.model("Tags", tagsSchema);
