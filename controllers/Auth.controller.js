const User = require("../models/User.model.js");
const OTP = require("../models/Otp.model.js");
const Profile = require("../models/Profile.model.js");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender.utils.js");
require("dotenv").config();

// send otp
exports.sendOTP = async (req, res) => {
  try {
    // fetch email address from request body
    const { email } = req.body;

    // validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required field",
      });
    }

    // check is user is already exist
    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      return res.status(409).json({
        success: false,
        message: "User already exists!",
      });
    }

    // generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check is otp is unique or not
    const result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    // create an entry in db
    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);

    // return response
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp: otp,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending OTP",
      error: error.message,
    });
  }
};

// signup
exports.signup = async (req, res) => {
  try {
    // fetch data
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      accountType,
      password,
      confirmPassword,
      otp,
    } = req.body;

    // validate data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNo ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //  match both passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please ensure both passwords are the same.",
      });
    }

    // check user already exists of not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists!",
      });
    }

    // find most recent otp for the user
    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    // validate OTP
    if (recentOTP.length == 0) {
      // OTP not found
      return res.status(400).json({
        succes: false,
        message: "OTP Not Found",
      });
    } else if (otp !== recentOTP) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // hash the password
    const hasedPassword = await bcrypt.hash(password, 8);

    // create profile of the user
    const profileDetails = Profile.create({
      gender: null,
      dob: null,
      about: null,
      phoneNo: phoneNo,
    });

    // create entry in DB
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hasedPassword,
      accoundType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/8.x/initials/svg?seed=${firstName}%20${lastName}`,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while user registration",
      error: error.message,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // get the data from body
    const { email, password } = req.body;

    // validate the data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check does user exist or not
    const user = User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // generate JWT, after password matches
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accoundType: user.accoundType,
      };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      delete user.password;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 100),
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while login",
      error: error.message,
    });
  }
};

// change password
exports.changePassword = async (req, res) => {
  try {
    // get data from req body
    // get old password, new password, confirm password
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // validate the data
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // get the user details from datbase
    const user = await User.findById(req.user._id);
    // TODO: try without this line, use only req.user

    // compare oldPassword with database
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(403).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // check weather both the passwords are same or not
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "The passwords provided do not match. Please ensure both passwords are the same.",
      });
    }
    // update the password in database
    user.password = await bcrypt.hash(newPassword, 8);

    // save in database
    await user.save();

    // send mail of password update
    const title = "Your password is changed successfully";
    const body = `
      <p>Hello ${user.firstName},</p>
      <p>This is to inform you that your password has been successfully updated. If you did not initiate this change, please contact our support team immediately.</p>
      <p>Thank you.</p>
      <p>StudyNotion</p>
    `;
    await mailSender(user.email, title, body);

    // return res
    res.status(200).json({
      success: true,
      message: "Your password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while changing your password",
      error: error.message,
    });
  }
};
