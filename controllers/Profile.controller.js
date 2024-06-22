const moment = require("moment");
const Course = require("../models/Courses.model.js");
const Profile = require("../models/Profile.model.js");
const User = require("../models/User.model.js");
const { accountDeletionCron } = require("../cron/accountDeletionCron.js");

exports.updateProfile = async (req, res) => {
  try {
    // get the data
    const { gender, dob, about, phoneNo } = req.body;
    const userID = req.user.id;

    // validate and user id and phoneNo
    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User ID is required field",
      });
    }
    if (!phoneNo) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required field",
      });
    }

    // get the data which user wants to update
    const updateDetails = {};
    if (gender) updateDetails.gender = gender;
    if (dob) updateDetails.dob = moment(dob).format("DD-MM-YYYY");
    if (about) updateDetails.about = about;
    if (phoneNo) updateDetails.phoneNo = phoneNo;

    // fetch the profile data from database
    const userDetails = await User.findById(userID);

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
    user.isDeleted = true;
    await user.save();

    // schedule the cron job for account deletion
    await accountDeletionCron(userId);

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

// exports.retriveAccountRequest
