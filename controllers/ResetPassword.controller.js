const User = require("../models/User.model.js");
const mailSender = require("../utils/mailSender.utils.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { frontendBaseUrl } = require("../config/config.js");

// reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    // get the data from req body
    const { email } = req.body;

    // validate email
    if (!email) {
      return res(400).json({
        success: false,
        message: "Email is required to reset your password",
      });
    }

    // find the user from db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // generate token for the user
    const token = crypto.randomUUID();

    // update user by adding token and expiration time
    const updatedUserDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExipres: Date.now() + 5 * 60 * 1000,
      },
      {
        new: true,
      }
    );

    // create url
    const url = `${frontendBaseUrl}/forgot-password/${token}`;

    // send mail containing the url and return response
    const title = "Reset Your StudyNotion Password";
    const body = `
    <p>Dear ${user.firstName},</p>
      <p>We've received a request to reset the password for your StudyNotion account. To complete the password reset process, please follow these steps:</p>
      <ol>
          <li>Click on the following link to reset your password: <a href=${url}>Reset Password</a></li>
          <li>This link is valid for one use only and will expire in 5 minutes. If you don't use the link within this time frame, you'll need to regenerate the password reset link again.</li>
      </ol>
      <p>If you did not request a password reset or no longer wish to reset your password, you can safely ignore this email.</p>
      <p>Thank you for choosing StudyNotion.</p>
      <p>Best regards,<br>The StudyNotion Team</p>
    `;
    await mailSender(email, title, body);

    return res.status(200).json({
      success: true,
      message:
        "An email send to your email. Please proceed as the instructions provided in your mail.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while generating the url for reset password",
      error: error.message,
    });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  try {
    // fetching the data from req body
    const { token, password, confirmPassword } = req.body;

    // validating the data
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is not available",
      });
    }
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password are required fields",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password are not matching",
      });
    }

    // verifying the token from db
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }

    // verify is token is expired of not
    if (user.resetPasswordExipres < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token is expired",
      });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // updating the password to db
    const updatedUserDetails = await User.findOneAndUpdate(
      { email: user.email },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    // sending mail and response to the user
    const title = "Your password is updated successfully";
    const body = `
        <p>Dear ${user.firstName},</p>
        <p>Your password for the StudyNotion account associated with this email address has been successfully reset.</p>
        <p>If you did not initiate this password reset or believe your account has been compromised, please contact us immediately.</p>
        <p>Thank you for using StudyNotion.</p>
        <p>Best regards,<br>The StudyNotion Team</p>
    `;

    await mailSender(user.email, title, body);

    return res.status(200).json({
      success: true,
      message: "Your password has been successfully reset.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while reset your password",
      error: error.message,
    });
  }
};
