const { default: mongoose } = require("mongoose");
const Category = require("../models/Category.model.js");
const Course = require("../models/Courses.model.js");
const {
  createCategorySchema,
  categoryPageDetailsSchema,
} = require("../validations/Category.validation.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");

// Create
exports.createCategory = async (req, res) => {
  try {
    // validate the data using Joi
    const { error, value } = createCategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // fetch data from req body
    const { name, description } = value;

    // check weather this category is already exists of not
    const categoryObjectInDb = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (categoryObjectInDb) {
      return res.status(409).json({
        success: false,
        message: "This category is already exists",
      });
    }

    // create db entry
    await Category.create({
      name: name,
      description: description,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "New category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating category",
      error: error.message,
    });
  }
};

// Read
// --> Get All Categories
exports.getAllCategories = async (_, res) => {
  try {
    // get all entry from db
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      data: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching all categories",
      error: error.message,
    });
  }
};

// categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
  try {
    // validate the data using joi
    const { error, value } = categoryPageDetailsSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // get caterogy id
    const { categoryId } = value;

    // get courses according to course id
    const selectedCourses = await Course.find({
      category: { $eq: mongoose.Types.ObjectId(categoryId) },
    });

    // check weather courses availabe of the course id or not
    if (selectedCourses === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // also provide other courses than the id and top 5 trending courses too
    const otherCourses = await Course.find({
      _id: { $nin: selectedCourses.map((course) => course._id) },
    });

    const trendingCourse = await Course.aggregate([
      {
        $match: {
          _id: { $nin: selectedCourses.map((course) => course._id) },
        },
      },
      {
        $group: {
          _id: null,
          totalStudents: { $sum: "$studentsEnrolled" },
          courses: { $push: "$$ROOT" }, // Include all fields of the course document
        },
      },
      {
        $sort: { totalStudents: 1 },
      },
      {
        limit: 5,
      },
    ]);

    // return the response
    return res.status(200).json({
      success: true,
      message: "Courses fetched as per the category successfully",
      data: {
        selectedCourses,
        otherCourses,
        trendingCourse,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching courses according to category",
      error: error.message,
    });
  }
};
