// import required packages
const express = require("express");
const router = express.Router();

// import auth controllers
const {
  sendOTP,
  signup,
  login,
  changePassword,
} = require("../controllers/Auth.controller.js");

// import reset password controllers
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/ResetPassword.controller.js");

// import middlewares
const {
  auth,
  isStudent,
  isAdmin,
  isInstructor,
} = require("../middlewares/Auth.middleware.js");

// ********************************************************************************************************
//?                                          AUTHENTICATION ROUTES
// ********************************************************************************************************

// Signup a new user
router.post("/signup", signup);

// Login user
router.post("/login", login);

// OTP will only sent to a user who is already exists in database
router.post("/sendotp", sendOTP);

// Password should only be changed by the user itself
router.post("/change-password", auth, changePassword);

// When access token is expired and regenerating token using refresh token
router.post("/refresh-token");

// ********************************************************************************************************
//?                                             RESET PASSWORD
// ********************************************************************************************************

// To reset password, token is sent to user's email
router.post("/forgot-password", forgotPassword);

// To reset user's password after verification
router.post("/reset-password", resetPassword);

module.exports = router;
