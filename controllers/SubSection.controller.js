const SubSection = require("../models/SubSection.model.js");
const Section = require("../models/Section.model.js");
const Course = require("../models/Courses.model.js");
const { fileUploader, deleteFile } = require("../utils/fileUploader.utils.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const {
  idSchema,
  videoFileSchema,
} = require("../validations/General.validation.js");
const {
  createSubSectionSchema,
  updateSubSectionSchema,
  deleteSubSectionSchema,
} = require("../validations/SubSection.validation.js");
require("dotenv").config();

// create subsection
exports.createSubSection = async (req, res) => {
  try {
    // validate the data using Joi
    const { error, value } = createSubSectionSchema.validate(req.body);
    const videoFile = videoFileSchema.validate(req.files.videoFile);
    if (error || videoFile.error) {
      return res.status(400).json(JoiErrorHandler(error || videoFile.error));
    }

    // getting the data
    const { sectionID, title, description } = value;

    // uploading the video to cloudinary
    const videoDetails = await fileUploader(
      videoFile.value,
      process.env.FOLDER_NAME
    );

    // create entry in db
    const newSubSection = await SubSection.create({
      title,
      description,
      // timeDuration: duration,
      videoUrl: videoDetails.secure_url,
    });

    // update the section schema
    const updatedSection = await Section.findByIdAndUpdate(
      sectionID,
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      { new: true }
    ).populate("subSection");

    // return response
    return res.status(200).json({
      success: true,
      message: "New sub section created successfully",
      data: updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating sub section",
      error: error.message,
    });
  }
};

// update subsection
exports.updateSubSection = async (req, res) => {
  try {
    const { error, value } = updateSubSectionSchema.validate(req.body);
    const videoFile = videoFileSchema(req.files.video);
    if (error || videoFile.error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // get data
    const { subSectionID, title, description, duration } = value;
    const video = videoFile.value;

    // getting all details what user want to update
    const updatedDetails = {};
    if (title) updatedDetails.title = title;
    if (description) updatedDetails.description = description;
    if (duration) updatedDetails.duration = description;
    if (video) {
      // get the details of subsectiona and validate it
      const subSectionDetails = await SubSection.findById(subSectionID);
      if (!subSectionDetails) {
        return res.status(404).json({
          success: false,
          message: "Subsection not found",
        });
      }

      // delete the old video from cloudinary
      const result = await deleteFile(subSectionDetails.videoUrl);
      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong",
        });
      }

      // upload new video to cloudinary
      const newVideoDetails = await fileUploader(
        video,
        process.env.FOLDER_NAME
      );

      // TODO: after updating the video ensure to delete the old video from cloud storage

      // add new video url to updateDetails object
      updatedDetails.videoUrl = newVideoDetails.secure_url;
    }

    // update data in db
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionID,
      updatedDetails,
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedSubSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating sub section",
      error: error.message,
    });
  }
};

// delete subsection
exports.deleteSubSection = async (req, res) => {
  try {
    const { error, value } = deleteSubSectionSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }
    // get data
    const { subSectionID, courseID } = value;
    const instructorId = req.user.id;

    const course = await Course.findById(courseID)
      .populate("courseContent")
      .populate({
        path: "courseContent.subSection",
        model: "SubSection",
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // verify is the course is owned by the instructor or not
    if (String(course.instructor) !== instructorId) {
      return res.status(403).json({
        success: false,
        message: "This course is not owned by you.",
      });
    }

    // delete document from database
    const subSectionDetails = await SubSection.findByIdAndDelete(subSectionID);
    if (!subSectionDetails) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    // delete video from cloudinary
    const result = await deleteFile(subSectionDetails.videoUrl);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting sub section",
      error: error.message,
    });
  }
};
