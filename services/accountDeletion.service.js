const mailSender = require("../utils/mailSender.utils");
const Cronjob = require("../models/Cronjob.model.js");
const { CRONJOB_STATUSES } = require("../config/constants.js");
const {
  successfullAccountDeletion,
  unsuccessfullAccountDeletion,
} = require("../emails/templates/accountDeletion.email.js");

exports.deleteAccount = async (userId) => {
  let userDetails;
  try {
    // validate id
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required field",
      });
    }

    // delete user
    userDetails = await User.findByIdAndDelete(userId);
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
        studentsEnrolled: userId,
      },
      {
        $pull: {
          studentsEnrolled: userId,
        },
      }
    );

    // notify the user using mail that your account has been deleted successfully
    const title = "Account Deletion Notification";
    const name = userDetails.firstName + " " + userDetails.lastname;
    const body = successfullAccountDeletion(name);
    await mailSender(userDetails.email, title, body);

    // making the cronjob status executed
    await Cronjob.findOneAndUpdate(
      { userId: userId },
      { status: CRONJOB_STATUSES.EXECUTED }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "You have deleted your account successfully",
    });
  } catch (error) {
    // notify the use using mail that your account cannot be deteled please try again.
    const title = "Account Deletion Failed";
    const name = userDetails.firstName + " " + userDetails.lastname;
    const body = unsuccessfullAccountDeletion(name);
    await mailSender(userDetails.email, title, body);

    // making the cronjob status failed
    await Cronjob.findOneAndUpdate(
      { userId: userId },
      { status: CRONJOB_STATUSES.FAILED }
    );

    // returning the failure response to user
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting account",
      error: error.message,
    });
  }
};
