// import required packages
const { Router } = require("express");
const router = Router();

// import profile controllers
const {
  deleteAccountRequest,
  updateProfile,
  retriveAccountRequest,
  getEnrolledCourses,
} = require("../controllers/Profile.controller.js");

// importing middlewares
const { auth, isDeleted } = require("../middlewares/Auth.middleware.js");

// ********************************************************************************************************
//?                                            PROFILE ROUTES
// ********************************************************************************************************

// profile update can only be done if you are logged in
router.put("/update-profile", auth, updateProfile);

// deleting the account needed the user to be logged in
router.delete("/delete-account", auth, deleteAccountRequest);

// retriving the soft deleted account
router.put("/retrive-account", isDeleted, retriveAccountRequest);

// get all the courses user have enrolled
router.get("/get-enrolled-courses", auth, getEnrolledCourses);

module.exports = router;
