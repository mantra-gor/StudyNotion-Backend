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

// importing middlewares
const {
  auth,
  isStudent,
  isAdmin,
  isInstructor,
} = require("../middlewares/Auth.middleware.js");

// ********************************************************************************************************
//                                          AUTHENTICATION ROUTES
// ********************************************************************************************************

// Signup a new user
router.post("/signup", signup);

// Login user
router.post("/login", login);

// OTP will only sent to a user who is already exists in database
router.post("/sendOTP", auth);

module.exports = router;
