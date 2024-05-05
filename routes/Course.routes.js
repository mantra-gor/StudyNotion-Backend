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

// import course controllers
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
} = require("../controllers/Course.controller.js");

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

// ********************************************************************************************************
//                                              COURSE ROUTES
// ********************************************************************************************************

// Courses can only be created by the Instructors
router.post("/createCourse", auth, isInstructor, createCourse);

// Get all registered courses
router.get("/getAllCourses", showAllCourses);

// Get All details of a course
router.post("/getAllDetailsOfCourse", getCourseDetails);

//
