const User = require("../models/User.model.js");
const OTP = require("../models/Otp.model.js");
const Profile = require("../models/Profile.model.js");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

// send otp
exports.sendOTP = async (req, res) => {
  try {
    // fetch email address from request body
    const { email } = req.body;
    // TODO: validate email

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
      message:
        "The passwords provided do not match. Please ensure both passwords are the same.",
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
  const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

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
    image: `https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`,
  });
};

// login

// change password
