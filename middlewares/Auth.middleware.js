const jwt = require("jsonwebtoken");
const { USER_ROLES } = require("../config/constants");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token not found",
      });
    }
    try {
      const payloadData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payloadData;
      console.log(req.user);
    } catch (error) {
      console.error(error, "JWT_ERROR");
      return res.status(400).json({
        success: false,
        message: "Token can not be verified",
        error: error.message,
      });
    }
    if (req.user.isDeleted) {
      return res.status(403).json({
        success: false,
        message:
          "You are forbidden for this action .Your account is in deletion process. If you want to retrive your account, please go to login page.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while authentication",
      error: error.message,
    });
  }
};

// isDeleted
exports.isDeleted = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token not found",
      });
    }
    try {
      const payloadData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payloadData;
    } catch (error) {
      console.error(error, "JWT_ERROR");
      return res.status(400).json({
        success: false,
        message: "Token can not be verified",
        error: error.message,
      });
    }
    if (!req.user.isDeleted) {
      return res.status(403).json({
        success: false,
        message:
          "User is already active. You are good to go with your learnings.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while authentication of validation of user",
      error: error.message,
    });
  }
};

// isStudent
exports.isStudent = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.accountType === USER_ROLES.STUDENT) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized! This is a protected route for students only.",
        error: error.message,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
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
    if (!user.accountType === USER_ROLES.ADMIN) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized! This is a protected route for admin only.",
        error: error.message,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
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
    if (!user.accountType === USER_ROLES.INSTRUCTOR) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized! This is a protected route for instructor only.",
        error: error.message,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while authenticating admin",
      error: error.message,
    });
  }
};
