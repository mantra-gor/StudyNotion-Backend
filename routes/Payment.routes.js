// import required packages
const express = require("express");
const router = express.Router();

// import payment controllers
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessMail,
} = require("../controllers/Payment.controller");

// import middlewares
const { auth, isStudent } = require("../middlewares/Auth.middleware.js");

// ********************************************************************************************************
//?                                             PAYMENT ROUTES
// ********************************************************************************************************

// Capture payment and initiate Razorpay order
router.post("/capture-payment", auth, isStudent, capturePayment);

// Verify payment and enroll students
router.post("/verify-payment", auth, isStudent, verifyPayment);

// send payment success mail
router.post("/send-success-mail", auth, isStudent, sendPaymentSuccessMail);

module.exports = router;
