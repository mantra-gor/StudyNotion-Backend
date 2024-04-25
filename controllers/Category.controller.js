const Category = require("../models/");

// Create
exports.createCategory = async (req, res) => {
  try {
    // fetch data from req body
    const { category, description } = req.body;

    // validate data
    if (!category || !description) {
      return res.status(400).json({
        success: false,
        message: "Category and description is required fields",
      });
    }

    // check weather this category is already exists of not
    const categoryObjectInDb = await Category.findOne({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    });
    if (categoryObjectInDb) {
      return res.status(409).json({
        success: false,
        message: "This category is already exists",
      });
    }

    // create db entry
    const newCategory = Category.create({
      category: category,
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
exports.getAllCategories = async (req, res) => {
  try {
    // get all entry from db
    const allCategories = Category.find({}, { name: true, description: true });

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

// Update

// Delete
