const { default: mongoose } = require("mongoose");
const CourseProgress = require("../models/CourseProgress.model");
const SubSection = require("../models/SubSection.model");
const JoiErrorHandler = require("../utils/errorHandler.utils");
const { idSchema } = require("../validations/General.validation");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseID, subSectionID } = req.body;

    const userID = req.user.id;

    const subSection = await SubSection.findById(subSectionID);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Sub section not found.",
      });
    }

    // check for old entry
    const courseProgress = await CourseProgress.findOne({
      userID,
      courseID,
    });
    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found.",
      });
    }

    // check for re-completing of video
    if (courseProgress.completedVideos.includes(subSectionID)) {
      return res.status(400).json({
        success: false,
        message: "This video is already marked as completed.",
      });
    }

    // push the subsection id to the completed videos
    courseProgress.completedVideos.push(subSectionID);
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course progress updated.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update course progress.",
      error: error.message,
    });
  }
};

exports.getCourseProgressOfStudent = async (req, res) => {
  try {
    const { error, value } = idSchema.validate(req.params.courseID);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    const courseID = value;
    const userID = req.user.id;

    const courseProgress = await CourseProgress.findOne({
      courseID: courseID,
      userID: userID,
    });

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "No course progress is found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course progress fetched successfully.",
      data: courseProgress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetching course progress.",
      error: error.message,
    });
  }
};
