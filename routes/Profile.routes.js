// import required packages
const { Router } = require("express");
const router = Router();

// import profile controllers
const {
  deleteAccountRequest,
  updateProfile,
  retriveAccountRequest,
  updateProfilePicture,
  instructorDashboard,
} = require("../controllers/Profile.controller.js");

// importing middlewares
const {
  auth,
  isDeleted,
  isInstructor,
} = require("../middlewares/Auth.middleware.js");

// ********************************************************************************************************
//?                                            PROFILE ROUTES
// ********************************************************************************************************

// profile update can only be done if you are logged in
router.put("/update-profile", auth, updateProfile);

// update profile picture of the user
router.post("/update-profile-picture", auth, updateProfilePicture);

// deleting the account needed the user to be logged in
router.delete("/delete-account", auth, deleteAccountRequest);

// retriving the soft deleted account
router.put("/retrive-account", isDeleted, retriveAccountRequest);

// get instructor dashboard data
router.get("/instructor-dashboard", auth, isInstructor, instructorDashboard);

module.exports = router;
