const Tag = require("../models/Tags.model.js");

// Create
exports.createTag = async (req, res) => {
  try {
    // fetch data from req body
    const { tag, description } = req.body;

    // validate data
    if (!tag || !description) {
      return res.status(400).json({
        success: false,
        message: "Tag and description is required fields",
      });
    }

    // check weather this tag is already exists of not
    const tagObjectInDb = await Tag.findOne({
      tag: { $regex: new RegExp(`^${tag}$`, "i") },
    });
    if (tagObjectInDb) {
      return res.status(409).json({
        success: false,
        message: "This tag is already exists",
      });
    }

    // create db entry
    const newTag = Tag.create({
      tag: tag,
      description: description,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "New tag created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating tag",
      error: error.message,
    });
  }
};

// Read
// --> Get All Tags
exports.getAllTags = async (req, res) => {
  try {
    // get all entry from db
    const allTags = Tag.find({}, { name: true, description: true });

    // return response
    return res.status(200).json({
      success: true,
      message: "All tags fetched successfully",
      tags: allTags,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching all tag",
      error: error.message,
    });
  }
};

// Update

// Delete
