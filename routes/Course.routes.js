// import required packages
const express = require("express");
const router = express.Router();

// import course controllers
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
} = require("../controllers/Course.controller.js");

// import category controllers
const {
  createCategory,
  getAllCategories,
  categoryPageDetails,
} = require("../controllers/Category.controller.js");

// import section controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section.controller.js");

// import section controllers
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection.controller.js");

// import rating and review controllers
const {
  createRatingAndReview,
  getAverageRating,
  getRatingsAndReviews,
  getAllRatingsAndReviews,
} = require("../controllers/RatingsAndReview.controller.js");

// import middlewares
const {
  auth,
  isStudent,
  isAdmin,
  isInstructor,
} = require("../middlewares/Auth.middleware.js");

// ********************************************************************************************************
//?                                              COURSE ROUTES
// ********************************************************************************************************

// Courses can only be created by the Instructors
router.post("/createCourse", auth, isInstructor, createCourse);

// Get all registered courses
router.get("/getAllCourses", showAllCourses);

// Get All details of a course
router.post("/getAllDetailsOfCourse", getCourseDetails);

// ********************************************************************************************************
//?                                              CATEGORY ROUTES
// ********************************************************************************************************

// Category can only be created by the admin
router.post("/createCategory", auth, isAdmin, createCategory);

// get all category
router.get("/getAllCategories", getAllCategories);

// categoryPageDetails
router.post("/categoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//?                                              SECTION ROUTES
// ********************************************************************************************************

// section can only be created by instructor
router.post("/createSection", auth, isInstructor, createSection);

// section can only be updated by instructor
router.post("/updateSection", auth, isInstructor, updateSection);

// section can only be deleted by instructor
router.post("/deleteSection", auth, isInstructor, deleteSection);

// ********************************************************************************************************
//?                                              SUBSECTION ROUTES
// ********************************************************************************************************

// subsection can only be created by instructor
router.post("/createSubsection", auth, isInstructor, createSubSection);

// subsection can only be updated by instructor
router.post("/updateSubsection", auth, isInstructor, updateSubSection);

// subsection can only be deleted by instructor
router.post("/deleteSubsection", auth, isInstructor, deleteSubSection);

// ********************************************************************************************************
//?                                            RATING AND REVIEW ROUTES
// ********************************************************************************************************

// rating and review can only be done by students
router.post("/createRatingAndReview", auth, isStudent, createRatingAndReview);

// average rating can be access by anyone
router.post("/averageRating", getAverageRating);

// get ratings and reviews of a course
router.post("/getRatingsAndReviews", getRatingsAndReviews);

//get all ratings and reviews of all courses
router.get("/getAllRatingsAndReviews", getAllRatingsAndReviews);

module.exports = router;
