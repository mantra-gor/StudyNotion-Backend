// import required packages
const express = require("express");
const router = express.Router();

// import auth controllers
const {
  login,
  signup,
  getUser,
  sendOTP,
  tokenRefresh,
  changePassword,
} = require("../controllers/Auth.controller.js");

// import reset password controllers
const {
  resetPassword,
  forgotPassword,
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

// Get user details
router.get("/user", auth, getUser);

// OTP will only sent to a user who is already exists in database
router.post("/sendotp", sendOTP);

// Password should only be changed by the user itself
router.put("/change-password", auth, changePassword);

// When access token is expired and regenerating token using refresh token
router.post("/refresh-token", tokenRefresh);

// ********************************************************************************************************
//?                                             RESET PASSWORD
// ********************************************************************************************************

// To reset password, token is sent to user's email
router.post("/forgot-password", forgotPassword);

// To reset user's password after verification
router.post("/reset-password", resetPassword);

module.exports = router;
