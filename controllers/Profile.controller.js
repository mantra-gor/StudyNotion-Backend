const moment = require("moment");
const Course = require("../models/Courses.model.js");
const Profile = require("../models/Profile.model.js");
const User = require("../models/User.model.js");

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

// delete account
// TODO: Cron Job should be applied here
exports.deleteAccount = async (req, res) => {
  try {
    // get id
    const userID = req.user.id;

    // validate id
    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User ID is required field",
      });
    }

    // delete user
    const userDetails = User.findByIdAndDelete(userID);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // delete profile
    await Profile.findByIdAndDelete(userDetails.additionalDetails);

    // removing the user from all courses he/she has enrolled
    await Course.updateMany(
      {
        studentsEnrolled: userID,
      },
      {
        $pull: {
          studentsEnrolled: userID,
        },
      }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "You have deleted your account successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting account",
      error: error.message,
    });
  }
};
