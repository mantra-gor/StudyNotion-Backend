const Joi = require("joi");
const { USER_ROLES, USER_GENDER } = require("../config/constants");

const emailSchema = Joi.string().email().lowercase().required();
const nameSchema = Joi.string().min(3).max(30).required();
const passwordsSchema = Joi.object({
  password: Joi.string()
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .message(
      "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character."
    )
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "Passwords do not match",
    })
    .required(),
});

const phoneNumberSchema = Joi.string()
  .required()
  .regex(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/);
const otpSchema = Joi.number().min(10000).max(999999).required();
const accountTypeSchema = Joi.string()
  .valid(...Object.values(USER_ROLES))
  .required();
const descriptionSchema = Joi.string().min(6).max(400).required();
const titleSchema = Joi.string().min(6).max(200).required();
const arrayDataSchema = Joi.array().items(Joi.string()).required();
const thumbnailSchema = Joi.object({
  thumbnail: Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .required(),
    size: Joi.number().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
  }).required(),
});
const videoFileSchema = Joi.object({
  name: Joi.string().required(),
  size: Joi.number()
    .max(1024 * 1024 * 100)
    .required(),
  mimetype: Joi.string()
    .valid("video/mp4", "video/avi", "video/mov", "video/mkv")
    .required(),
})
  .required()
  .messages({
    "any.required": "Video file is required",
    "string.base": "File name must be a string",
    "number.base": "File size must be a number",
    "number.max": "File size must not exceed 50 MB",
    "string.valid":
      "Invalid file type, must be one of video/mp4, video/avi, video/mov, video/mkv",
  });

const genderSchema = Joi.string().valid(...Object.values(USER_GENDER));
const dobSchema = Joi.date().required();
const courseIdSchema = Joi.string().required();
const timeSchema = Joi.string()
  .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
  .required()
  .messages({
    "string.pattern.base": "Duration must be in the format HH:mm or HH:mm:ss",
    "any.required": "Duration is required",
  });

module.exports = {
  accountTypeSchema,
  descriptionSchema,
  phoneNumberSchema,
  passwordsSchema,
  arrayDataSchema,
  thumbnailSchema,
  videoFileSchema,
  courseIdSchema,
  genderSchema,
  emailSchema,
  titleSchema,
  nameSchema,
  timeSchema,
  otpSchema,
  dobSchema,
};
