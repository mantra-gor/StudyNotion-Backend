const Section = require("../models/Section.model.js");
const Course = require("../models/Courses.model.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const {
  createSectionSchema,
  deleteSectionSchema,
  updateSectionSchema,
} = require("../validations/Section.validate.js");
const deleteSectionWithSubsections = require("../helpers/deleteSectionWithSubsections.js");

// create section
exports.createSection = async (req, res) => {
  try {
    // validate the data using joi
    const { error, value } = createSectionSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }
    // data fetch
    const { sectionName, courseID } = value;

    // create section
    const newSection = await Section.create({ sectionName });

    // update course schema with section
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseID,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating section",
      error: error.message,
    });
  }
};

// update section
exports.updateSection = async (req, res) => {
  try {
    const { error, value } = updateSectionSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // fetch data
    const { sectionName, sectionID, courseID } = value;

    // update data in db
    await Section.findByIdAndUpdate(sectionID, { sectionName }, { new: true });

    const course = await Course.findById(courseID).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating section",
      error: error.message,
    });
  }
};

// delete section
exports.deleteSection = async (req, res) => {
  try {
    // validate the data using Joi
    const { error, value } = deleteSectionSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // get the data
    const { sectionID, courseID } = value;
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

    // used helper function to delete section with subsections
    const result = await deleteSectionWithSubsections(sectionID);
    if (result?.success === false) {
      return res.status(404).json({
        success: false,
        message: result.message || "Something went wrong",
      });
    }

    // deleting section from course schema
    course.courseContent = course.courseContent.filter(
      (section) => String(section._id) !== sectionID
    );

    // save updated course to db
    await course.save();

    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting section",
      error: error.message,
    });
  }
};
