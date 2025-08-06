const Course = require("../models/Courses.model.js");
const Category = require("../models/Category.model.js");
const User = require("../models/User.model.js");
const deleteSectionWithSubsections = require("../helpers/deleteSectionWithSubsections");
const { USER_ROLES } = require("../config/constants.js");
const {
  createCourseSchema,
  updateCourseSchema,
} = require("../validations/Course.validations.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const { idSchema } = require("../validations/General.validation.js");
const { deleteSingleObject } = require("../utils/s3.utils.js");
const RatingsAndReviews = require("../models/RatingsAndReviews.model.js");
require("dotenv").config();

// create course handler function
exports.createCourse = async (req, res) => {
  try {
    // validate the data using Joi
    const { error, value } = createCourseSchema.validate(req.body);

    if (error) {
      return res.status(400).json(JoiErrorHandler(error || result.error));
    }

    // fetch the data
    const {
      title,
      description,
      price,
      language,
      keyFeatures,
      category,
      tags,
      status,
      fileKey,
    } = value;

    if (!fileKey) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail is required!",
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

    // create new course entry in db
    const newCourseDetails = await Course.create({
      title,
      description,
      price,
      language,
      keyFeatures,
      tags,
      category,
      status,
      thumbnailInfo: fileKey,
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

// edit course handler function
exports.editCourse = async (req, res) => {
  try {
    const { error, value } = updateCourseSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error || result.error));
    }

    const { courseID, status } = value;
    const course = await Course.findById(courseID);

    // If Thumbnail Image is found, update it
    if (value.files) {
      console.log("thumbnail update");
      // updated thumbnail // TODO: pending
    }

    // Update only the fields that are present in the request body
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(value[key]);
        } else {
          course[key] = value[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseID,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingsAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while editing course",
      error: error.message,
    });
  }
};

// delete course handler function
exports.deleteCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const { error, value } = idSchema.validate(req.params.courseID);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error || result.error));
    }

    const courseID = value;

    // validate the courseID
    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // find weather this course owned by this instructor or not
    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    } else if (course.instructor.toString() !== instructorId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this course",
      });
    }

    // delete the thumbnail from S3 bucket
    await deleteSingleObject(course.thumbnailInfo.key);

    // delete all sections and subsections with media files related to this course
    for (const sectionID of course.courseContent) {
      await deleteSectionWithSubsections(sectionID);
    }

    // delete all ratings and reviews related to this course
    await RatingsAndReviews.deleteMany({ course: courseID });

    // remove the course from students enrolled
    await User.updateMany(
      { courses: courseID },
      {
        $pull: {
          courses: courseID,
          courseProgress: { courseID: courseID },
        },
      }
    );

    // remove the course from instructor's courses
    await User.findByIdAndUpdate(
      { _id: instructorId },
      {
        $pull: {
          courses: courseID,
        },
      }
    );

    // remove the course from category
    await Category.findByIdAndUpdate(
      { _id: course.category },
      {
        $pull: {
          course: courseID,
        },
      }
    );

    // delete the course
    await Course.findByIdAndDelete(courseID);

    // return the response
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting course",
      error: error.message,
    });
  }
};

// get all courses by instructor handler function
exports.getCoursesByInstructor = async (req, res) => {
  try {
    // get instructorID from JWT Token
    const instructorID = req.user.id;

    // get the courses of this instructor
    const courses = await Course.find({ instructor: instructorID });

    if (!courses) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this instructor",
      });
    }

    // return the response
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching your courses.",
      error: error.message,
    });
  }
};

// get all courses enrolled by student handler function
exports.getEnrolledCoursesOfStudent = async (req, res) => {
  try {
    const studentID = req.user.id;
    if (!studentID) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    // get the courses of this student
    const coursesEnrolledByStudent = await User.findById({ _id: studentID })
      .select("courses courseProgress")
      .populate({
        path: "courses",
        select: "-status -studentsEnrolled",
        populate: { path: "courseContent" },
      });

    if (
      !coursesEnrolledByStudent ||
      coursesEnrolledByStudent.courses.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this student",
      });
    }

    // return the response
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: coursesEnrolledByStudent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching your courses.",
      error: error.message,
    });
  }
};

// show all courses handler function
exports.showAllCourses = async (_, res) => {
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
    // get user role
    const accountType = req?.user?.accountType;

    // get the data validated using Joi
    const { error, value } = idSchema.validate(req.params.courseID);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }
    const courseID = value;

    // getting and validating the data from db
    let courseDetails;

    if (accountType === USER_ROLES.INSTRUCTOR) {
      courseDetails = await Course.findById(courseID)
        .populate({ path: "courseContent", populate: { path: "subSection" } })
        .populate("ratingsAndReviews")
        .populate({ path: "category", select: "name description" })
        .populate({
          path: "instructor",
          select: "-password -courseProgress -email",
          populate: [{ path: "additionalDetails" }, { path: "courses" }],
        })
        .populate({
          path: "studentsEnrolled",
          select: "-password -email",
          populate: [{ path: "additionalDetails" }, { path: "courses" }],
        });
    } else {
      courseDetails = await Course.findById(courseID)
        .populate({
          path: "instructor",
          select: "-password -courseProgress -email",
          populate: [{ path: "additionalDetails" }, { path: "courses" }],
        })
        .populate({
          path: "courseContent",
          populate: { path: "subSection", select: "-videoInfo" },
        })
        .populate("ratingsAndReviews")
        .populate({ path: "category", select: "name description" });
    }

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // return response
    return res.status(200).json({
      success: true,
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

// Get course data with video content
exports.getAuthorizedCourseContent = async (req, res) => {
  try {
    // get the user
    const userId = req.user.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // get the data validated using Joi
    const { error, value } = idSchema.validate(req.params.courseID);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }
    const courseID = value;

    const courseData = await Course.findById(courseID).populate({
      path: "courseContent",
      populate: { path: "subSection" },
    });

    if (!courseData) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if student is enrolled
    const isEnrolled = courseData.studentsEnrolled.some(
      (studentID) => studentID.toString() === userId.toString()
    );

    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized! Please purchase the course.",
      });
    }

    // remove the students enrolled array
    const courseObject = courseData.toObject();
    delete courseObject.studentsEnrolled;

    // return the success response
    return res.status(200).json({
      success: true,
      message: "Course data fetched successfully!",
      data: courseObject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching your course data",
      error: error.message,
    });
  }
};
