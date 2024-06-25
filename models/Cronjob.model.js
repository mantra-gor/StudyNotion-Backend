const mongoose = require("mongoose");
const { CRONJOB_TYPES, CRONJOB_STATUSES } = require("../config/constants.js");

const CronjobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: Object.values(CRONJOB_TYPES),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(CRONJOB_STATUSES),
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cronjob", CronjobSchema);
