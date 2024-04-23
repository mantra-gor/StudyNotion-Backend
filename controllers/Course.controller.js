const Course = require("../models/Courses.model.js");
const Tag = require("../models/Tags.model.js");
const User = require("../models/User.model.js");
const imageUploader = require("../utils/imageUploader.utils.js");
require("dotenv").config();

// createCourse hnadler function
exports.createCourse = async (req, res) => {
  try {
    // fetch the data
    const { title, description, price, language, keyFeatures, tag } = req.body;
    const thumbnail = req.files.courseThumbnail;

    // validate the data
    if (
      !(
        title ||
        description ||
        price ||
        language ||
        keyFeatures ||
        tag ||
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

    // validate the tag from db
    const tagDetails = await Tag.findById({ _id: tag });
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag details not found",
      });
    }

    // upload thumbnail to cloudinary
    const thumbnailDetails = await imageUploader(
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
      tag,
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

    // add new course in tag schema
    await Tag.findByIdAndUpdate(
      { _id: tag },
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

// createCourse hnadler function
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
      success: true,
      message: "Something went wrong while fetching all course",
      error: error.message,
    });
  }
};
