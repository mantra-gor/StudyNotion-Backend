const Course = require("../models/Courses.model.js");
const Category = require("../models/Category.model.js");
const User = require("../models/User.model.js");
const fileUploader = require("../utils/fileUploader.utils.js");
require("dotenv").config();

// createCourse hnadler function
exports.createCourse = async (req, res) => {
  try {
    // fetch the data
    const { title, description, price, language, keyFeatures, category } =
      req.body;
    const thumbnail = req.files.courseThumbnail;

    // validate the data
    if (
      !(
        title ||
        description ||
        price ||
        language ||
        keyFeatures ||
        category ||
        thumbnail
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // get the instructor details and validate it by its role
    const instructorDetails = await User.findById({ _id: req.user.id });
    if (instructorDetails.accoundType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create new course",
      });
    }

    // validate the category from db
    const categoryDetails = await Category.findById({ _id: category });
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details not found",
      });
    }

    // upload thumbnail to cloudinary
    const thumbnailDetails = await fileUploader(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create new course entry in db
    const newCourseDetails = await Course.create({
      title,
      description,
      price,
      language,
      keyFeatures,
      category,
      thumbnail: thumbnailDetails.secure_url,
      instructor: instructorDetails._id,
    });

    // add new course in user(instructor) schema
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourseDetails._id,
        },
      }
    );

    // add new course in category schema
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourseDetails._id,
        },
      }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "New course created successfully",
      data: newCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Something went wrong while creating new course",
      error: error.message,
    });
  }
};

// createCourse handler function
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = Course.find(
      {},
      { title: true, description: true, thumbnail: true, instructor: true }
    );
    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching all course",
      error: error.message,
    });
  }
};

// get all details of course
exports.getCourseDetails = async (req, res) => {
  try {
    // fetch data
    const { courseID } = req.body;

    // validate the data
    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // getting and validating the data from db
    const course = await Course.findById(courseID)
      .populate({
        path: "instructor",
        populate: [{ path: "additionalDetails" }, { path: "courses" }],
      })
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .populate("ratingsAndReviews")
      .populate({ path: "categories", select: "name description" })
      .populate({
        path: "studentsEnrolled",
        populate: [
          { path: "additionalDetails" },
          { path: "courses" },
          { path: "courseProgress" },
        ],
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // return response
    return res.status(200).json({
      success: false,
      message: "Course details fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching course details",
      error: error.message,
    });
  }
};
