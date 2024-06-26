const User = require("../models/User.model.js");
const mailSender = require("../utils/mailSender.utils.js");
const { frontendBaseUrl } = require("../config/config.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  forgotPasswordEmail,
} = require("../emails/templates/forgotPassword.email.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const {
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validations/ResetPassword.validations.js");
const {
  resetPasswordEmail,
} = require("../emails/templates/resetPassword.email.js");

// reset password token
exports.forgotPassword = async (req, res) => {
  try {
    // validate the email using Joi
    const { error, value } = forgotPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // get the data from value
    const { email } = value;

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
    const name = user.firstName + " " + user.lastName;
    const body = forgotPasswordEmail(name, url);
    await mailSender(email, title, body);

    return res.status(200).json({
      success: true,
      message:
        "An email send to your email address. Please proceed as the instructions provided in your mail.",
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
    // validate the data using Joi
    const { error, value } = resetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // fetching the data from req body
    const { token, password } = value;

    // verifying the token from db
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }

    // verify is token is expired or not
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

    // sending mail to the user
    const title = "Your password is updated successfully";
    const name = user.firstName + " " + user.lastName;
    const body = resetPasswordEmail(name);
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
