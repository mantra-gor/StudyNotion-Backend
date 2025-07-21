// import required packages
const express = require("express");
const router = express.Router();

// import course controllers
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  editCourse,
  getCoursesByInstructor,
  deleteCourse,
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
router.post("/create-course", auth, isInstructor, createCourse);

// Edit course can only be done by the instructor
router.put("/edit-course", auth, isInstructor, editCourse);

// Get courses by instructor
router.get(
  "/get-courses-by-instructor",
  auth,
  isInstructor,
  getCoursesByInstructor
);

// Delete course can only be done by the instructor
router.delete("/delete-course/:courseID", auth, isInstructor, deleteCourse);

// Get all registered courses
router.get("/get-all-courses", showAllCourses);

// Get All details of a course
router.get("/get-course-details/:courseID", auth, getCourseDetails);

// ********************************************************************************************************
//?                                              CATEGORY ROUTES
// ********************************************************************************************************

// Category can only be created by the admin
router.post("/create-category", auth, isAdmin, createCategory);

// get all category
router.get("/get-all-category", getAllCategories);

// categoryPageDetails
router.post("/categoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//?                                              SECTION ROUTES
// ********************************************************************************************************

// section can only be created by instructor
router.post("/create-section", auth, isInstructor, createSection);

// section can only be updated by instructor
router.put("/update-section", auth, isInstructor, updateSection);

// section can only be deleted by instructor
router.delete("/delete-section", auth, isInstructor, deleteSection);

// ********************************************************************************************************
//?                                              SUBSECTION ROUTES
// ********************************************************************************************************

// subsection can only be created by instructor
router.post("/create-subsection", auth, isInstructor, createSubSection);

// subsection can only be updated by instructor
router.put("/update-subsection", auth, isInstructor, updateSubSection);

// subsection can only be deleted by instructor
router.delete("/delete-subsection", auth, isInstructor, deleteSubSection);

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
