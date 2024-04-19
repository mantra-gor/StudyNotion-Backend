const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    if (!token) {
      return res(403).json({
        success: false,
        message: "Token not found",
      });
    }
    try {
      const payloadData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payloadData;
    } catch (error) {
      return res(400).json({
        success: false,
        message: "Token can not be verified",
        error: error.message,
      });
    }

    next();
  } catch (error) {
    return res(500).json({
      success: false,
      message: "Something went wrong while authentication",
      error: error.message,
    });
  }
};

// isStudent
exports.isStudent = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.accoundType === "Student") {
      return res(403).json({
        success: false,
        message:
          "You are not authorized! This is a protected route for students only.",
        error: error.message,
      });
    }
    next();
  } catch (error) {
    return res(500).json({
      success: false,
      message: "Something went wrong while authenticating student",
      error: error.message,
    });
  }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.accoundType === "Admin") {
      return res(403).json({
        success: false,
        message:
          "You are not authorized! This is a protected route for admin only.",
        error: error.message,
      });
    }
    next();
  } catch (error) {
    return res(500).json({
      success: false,
      message: "Something went wrong while authenticating admin",
      error: error.message,
    });
  }
};

// isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.accoundType === "Instructor") {
      return res(403).json({
        success: false,
        message:
          "You are not authorized! This is a protected route for instructor only.",
        error: error.message,
      });
    }
    next();
  } catch (error) {
    return res(500).json({
      success: false,
      message: "Something went wrong while authenticating admin",
      error: error.message,
    });
  }
};
