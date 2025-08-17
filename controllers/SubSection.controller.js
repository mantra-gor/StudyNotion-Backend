const SubSection = require("../models/SubSection.model.js");
const Section = require("../models/Section.model.js");
const Course = require("../models/Courses.model.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const {
  createSubSectionSchema,
  updateSubSectionSchema,
  deleteSubSectionSchema,
  generateLecturePresignedUrlSchema,
} = require("../validations/SubSection.validation.js");
const { deleteSingleObject, getPresignedURL } = require("../utils/s3.utils.js");
require("dotenv").config();

// create subsection
exports.createSubSection = async (req, res) => {
  try {
    // validate the data using Joi
    const { error, value } = createSubSectionSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error || videoFile.error));
    }

    // getting the data
    const { sectionID, title, description, fileKey } = value;

    // get object url of
    if (!fileKey) {
      return res.status(400).json({
        success: false,
        message: "Course video is required!",
      });
    }

    // create entry in db
    const newSubSection = await SubSection.create({
      title,
      description,
      videoInfo: fileKey,
      // timeDuration: duration,
      // videoUrl: videoDetails.secure_url,
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

    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // get data
    const { sectionID, subSectionID, title, description, duration, fileKey } =
      value;

    const subsectiondata = await SubSection.findById(subSectionID);

    // getting all details what user want to update
    const updatedDetails = {};
    if (title) updatedDetails.title = title;
    if (description) updatedDetails.description = description;
    if (duration) updatedDetails.duration = description;
    if (fileKey) {
      await deleteSingleObject(subsectiondata.videoInfo.key);
      updatedDetails.videoInfo = fileKey;
    }

    // update data in db
    await SubSection.findByIdAndUpdate(subSectionID, updatedDetails, {
      new: true,
    });

    const updatedSection = await Section.findById(sectionID).populate(
      "subSection"
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedSection,
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

    const course = await Course.findById(courseID).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
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

    // delete video from s3 bucket
    await deleteSingleObject(subSectionDetails.videoInfo.key);

    const updatedCourse = await Course.findById(courseID).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting sub section",
      error: error.message,
    });
  }
};

// get presigned url for a video --> here time for the url is 30 minutes
exports.generateLecturePresignedUrl = async (req, res) => {
  try {
    const userId = req.user.id;
    const urlValidTime = 1800; // 30 minutes

    const { error, value } = generateLecturePresignedUrlSchema.validate(
      req.body
    );
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    const { videoKey, courseID } = value;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please login to access course content.",
      });
    }

    if (!videoKey) {
      return res.status(400).json({
        success: false,
        message: "Video key is invalid.",
      });
    }

    const course = await Course.findById(courseID);

    const isEnrolled = course.studentsEnrolled.some(
      (studentID) => studentID.toString() === userId.toString()
    );

    if (!isEnrolled && !course.instructor == userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized. Please enroll to the course.",
      });
    }

    const presignedUrl = await getPresignedURL(videoKey, urlValidTime);

    if (!presignedUrl) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while fetching video file.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Video fetched successfully.",
      data: presignedUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching video file.",
      error: error.message,
    });
  }
};
