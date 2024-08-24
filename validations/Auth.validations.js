const Joi = require("joi");
const {
  emailSchema,
  nameSchema,
  phoneNumberSchema,
  accountTypeSchema,
  passwordsSchema,
  otpSchema,
} = require("./General.validation.js");

const sendOTPSchema = Joi.object({
  email: emailSchema,
});

const signupSchema = Joi.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phoneNo: phoneNumberSchema,
  accountType: accountTypeSchema,
  otp: otpSchema,
  password: passwordsSchema.extract("password").label("password"),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "Passwords do not match",
    })
    .required(),
});

const loginSchema = Joi.object({
  email: emailSchema,
  password: Joi.string().required(),
});

const changePasswordSchema = Joi.object({
  oldPassword: passwordsSchema.extract("password"),
  newPassword: passwordsSchema.extract("password").label("newPassword"),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .messages({
      "any.only": "Passwords do not match",
    })
    .required(),
});

module.exports = {
  sendOTPSchema,
  signupSchema,
  loginSchema,
  changePasswordSchema,
};
