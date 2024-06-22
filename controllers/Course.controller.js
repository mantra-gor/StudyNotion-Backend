const Course = require("../models/Courses.model.js");
const Category = require("../models/Category.model.js");
const User = require("../models/User.model.js");
const { fileUploader } = require("../utils/fileUploader.utils.js");
const { USER_ROLES } = require("../config/constants.js");
const { createCourseSchema } = require("../validations/Course.validations.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const { thumbnailSchema } = require("../validations/General.validation.js");

require("dotenv").config();

// createCourse hnadler function
exports.createCourse = async (req, res) => {
  try {
    // validate the data using Joi
    const { error, value } = createCourseSchema.validate(req.body);
    const result = thumbnailSchema.validate({
      thumbnail: req.files.courseThumbnail,
    });
    if (error || result.error) {
      return res.status(400).json(JoiErrorHandler(error || result.error));
    }

    // fetch the data
    const { title, description, price, language, keyFeatures, category, tags } =
      value;

    const thumbnail = req.files.courseThumbnail;

    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail is required",
      });
    }

    // get the instructor details and validate it by its role
    const instructorDetails = await User.findById({ _id: req.user.id });
    if (instructorDetails.accountType !== USER_ROLES.INSTRUCTOR) {
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
      tags,
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
      success: false,
      message: "Something went wrong while creating new course",
      error: error.message,
    });
  }
};

// show all courses handler function
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        title: true,
        description: true,
        thumbnail: true,
        instructor: true,
        price: true,
        category: true,
      }
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
    const courseDetails = await Course.findById(courseID)
      .populate({
        path: "instructor",
        select: "-password -courseProgress -email",
        populate: [{ path: "additionalDetails" }, { path: "courses" }],
      })
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .populate("ratingsAndReviews")
      .populate({ path: "category", select: "name description" })
      .populate({
        path: "studentsEnrolled",
        select: "-password -email",
        populate: [
          { path: "additionalDetails" },
          { path: "courses" },
          { path: "courseProgress" },
        ],
      });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // return response
    return res.status(200).json({
      success: false,
      message: "Course details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching course details",
      error: error.message,
    });
  }
};
