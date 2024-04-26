const Section = require("../models/Section.model.js");
const Course = require("../models/Courses.model.js");
exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseID } = req.body;

    // data validation
    if (!sectionName || !courseID) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }

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
    )
      .populate("courseContent")
      .populate({
        path: "courseContent.subSection",
        model: "SubSection",
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

exports.updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, sectionID } = req.body;

    // validate data
    if (!sectionName || !sectionID) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }

    // update data in db
    const updatedSection = await Section.findByIdAndUpdate(
      sectionID,
      {
        sectionName,
      },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
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
    // get the data
    const { sectionID } = req.body;

    // validate the data
    if (!sectionID) {
      return res.status(400).json({
        success: false,
        message: "Section ID is required",
      });
    }

    // delete the section from db
    const sectionDetails = await Section.findOneAndDelete({ _id: sectionID });
    if (!sectionDetails) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }
    // TODO[testing]: Do we need to delete Object Id from course schema?

    // return response
    return res(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting section",
      error: error.message,
    });
  }
};
