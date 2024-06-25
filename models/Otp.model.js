const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender.utils.js");
const {
  otpVerification,
} = require("../emails/templates/otpVerification.email.js");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      index: { expires: "5m" },
    },
  },
  { timestamps: true }
);

// send otp in email
async function sendVerificationEmail(email, otp) {
  try {
    const title = "Verification Email from StudyNotion";
    const body = otpVerification(email, otp);
    await mailSender(email, title, body);
  } catch (error) {
    console.error("Error while sending otp", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
