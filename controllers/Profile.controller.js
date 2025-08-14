const moment = require("moment");
const Course = require("../models/Courses.model.js");
const Profile = require("../models/Profile.model.js");
const User = require("../models/User.model.js");
const {
  accountDeletionCron,
  cancelAccountDeletinoCron,
  getAllTasks,
} = require("../cron/accountDeletionCron.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const {
  updateProfileSchema,
  profilePictureSchema,
} = require("../validations/Profile.validations.js");
const { extractS3Key, deleteSingleObject } = require("../utils/s3.utils.js");

exports.updateProfilePicture = async (req, res) => {
  try {
    const { error, value } = profilePictureSchema.validate(req.body);

    if (error) {
      return res.status(400).json(JoiErrorHandler(error || result.error));
    }

    const { objectUrl } = value;
    const userID = req.user.id;

    if (!objectUrl) {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required!",
      });
    }

    // get the user from db
    const user = await User.findById(userID).select("-password");

    // remove the older one from s3 bucket
    const fileKey = extractS3Key(user.avatar);
    if (fileKey) {
      await deleteSingleObject(fileKey);
    }

    // update new profile picture to the profile of user
    user.avatar = objectUrl;
    await user.save();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile picture has been updated successfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile picture.",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // validate data using Joi
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // get the data
    const { gender, dob, about, phoneNo } = value;
    const userId = req.user.id;

    // get the data which user wants to update
    const updateDetails = {};
    if (gender) updateDetails.gender = gender;
    if (dob) updateDetails.dob = moment(dob);
    if (about) updateDetails.about = about;
    if (phoneNo) updateDetails.phoneNo = phoneNo;

    // fetch the profile data from database
    const userDetails = await User.findById(userId);

    // update the data on database
    const updatedProfile = await Profile.findByIdAndUpdate(
      userDetails.additionalDetails,
      updateDetails,
      {
        new: true,
      }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile",
      error: error.message,
    });
  }
};

// delete account // Cron Job Added here
exports.deleteAccountRequest = async (req, res) => {
  try {
    // get the user id
    const userId = req.user.id;

    // fetch the use details from db and validate
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.isDeleted) {
      return res.status(409).json({
        success: false,
        message:
          "Your account is already in process of deletion. This action can only be performed one time.",
      });
    }

    // mark the flag true for soft deletion of the user and save the updated user
    // await User.findByIdAndUpdate(userId, { isDeleted: true });

    // schedule the cron job for account deletion
    await accountDeletionCron(userId);
    getAllTasks();

    // send the response to the user
    res.status(200).json({
      success: true,
      message:
        "Your account deletion is in process and will be permanently deleted in 4 days. If you wish to restore your account before then, you can do so. After 4 days, this action cannot be reversed.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the account.",
      error: error.message,
    });
  }
};

exports.retriveAccountRequest = async (req, res) => {
  try {
    // get the user id
    const userId = req.user.id;
    const userDetails = await User.findById(userId);

    // validate the user from db
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // now validate is user is doft deleted or not
    if (!userDetails.isDeleted) {
      return res.status(400).json({
        success: false,
        message:
          "Your account is already active. You are good to go with your courses.",
      });
    }

    // now cancel the account deletion request
    const deletionResponse = await cancelAccountDeletinoCron(userId);

    if (deletionResponse) {
      userDetails.isDeleted = false;
      await User.save();

      // return the response to user
      return res.status(200).json({
        success: false,
        message:
          "Your account is now retrived. You are good to go for your learning.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while retriving your account.",
      error: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId).populate("courses");

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User details not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Courses retrived successfully.",
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting courses list.",
      error: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const instructorID = req.user.id;
    const courseDetails = await Course.find({
      instructor: instructorID,
    }).populate({ path: "ratingsAndReviews" });
    const instructorData = await User.findById(instructorID).select(
      "-courseProgress -courses -password"
    );

    if (!instructorData || !courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalEarnings = totalStudentsEnrolled * course.price;

      // create a new object
      return {
        ...course.toObject(),
        totalStudentsEnrolled,
        totalEarnings,
      };
    });

    const data = {
      instructorData,
      courseData,
    };

    // return response
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting courses list.",
      error: error.message,
    });
  }
};
