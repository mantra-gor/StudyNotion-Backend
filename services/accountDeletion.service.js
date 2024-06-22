const mailSender = require("../utils/mailSender.utils");
const Cronjob = require("../models/Cronjob.model.js");
const { CRONJOB_STATUSES } = require("../config/constants.js");

exports.deleteAccount = async (userID) => {
  try {
    // validate id
    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User ID is required field",
      });
    }

    // delete user
    const userDetails = await User.findByIdAndDelete(userID);
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

    // notify the user using mail that your account has been deleted successfully
    const title = "Account Deletion Notification";
    const body = `
      <p>Dear ${userDetails.lastName},</p>
      <p>This is to inform you that your account has been permanently deleted from our system. 
      If you have any questions or need further assistance, please don't hesitate to reach out to us.</p>
      <p>Thank you for using our service.</p>
      <p>Best regards,<br>The StudyNotion Team</p>
    `;

    await mailSender(userDetails.email, title, body);

    // making the cronjob status executed
    await Cronjob.findOneAndUpdate(
      { userId: userID },
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
    const body = `
      <p>Dear ${userDetails.lastName},</p>
      <p>This is to inform you that your account deletion request has been failed. Please try again later after sometime.</p>
      <p>Thank you for using our service.</p>
      <p>Best regards,<br>The StudyNotion Team</p>
    `;
    await mailSender(userDetails.email, title, body);

    // making the cronjob status failed
    await Cronjob.findOneAndUpdate(
      { userId: userID },
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
