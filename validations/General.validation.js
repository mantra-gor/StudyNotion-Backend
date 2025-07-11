const Joi = require("joi");
const {
  USER_ROLES,
  USER_GENDER,
  COURSES_STATUSES,
} = require("../config/constants");

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
});

const countryCode = Joi.string().required().regex(/^\+/);
const phoneNumberSchema = Joi.string()
  .required()
  .regex(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/);
const otpSchema = Joi.number().min(10000).max(999999).required();
const accountTypeSchema = Joi.string()
  .valid(...Object.values(USER_ROLES))
  .required();
const statusSchema = Joi.string()
  .valid(...Object.values(COURSES_STATUSES))
  .required();
const descriptionSchema = Joi.string().min(6).max(400).required();
const titleSchema = Joi.string().min(6).max(200).required();
const arrayDataSchema = Joi.array().items(Joi.string().min(1)).required();
const thumbnailSchema = Joi.object({
  thumbnail: Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z0-9][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9]+)?$/)
      .required(),
    size: Joi.number().required(),
    data: Joi.binary(),
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
  })
    .unknown()
    .required(),
});

const fileMetadataSchema = Joi.object({
  fileName: Joi.string().required(),
  contentType: Joi.string().required(),
  size: Joi.number().required(),
});

const fileKeySchema = Joi.object({
  key: Joi.string().required(),
  contentType: Joi.string().required(),
}).unknown();

const videoFileSchema = Joi.object({
  name: Joi.string().required(),
  data: Joi.binary().required(), // Ensures `data` is a binary buffer
  size: Joi.number()
    .max(400 * 1024 * 1024)
    .required(), // File size should not exceed 400 MB
  encoding: Joi.string().required(), // Encoding type
  tempFilePath: Joi.string().allow(null, ""), // Temp file path (optional, may be empty or null)
  truncated: Joi.boolean().required(), // Truncated status
  mimetype: Joi.string()
    .valid("video/mp4", "video/avi", "video/mov", "video/mkv")
    .required(), // Supported video file types
  md5: Joi.string().required(), // MD5 hash for the file
})
  .unknown()
  .messages({
    "string.base": "Field must be a string",
    "number.base": "Field must be a number",
    "number.max": "File size must not exceed 400 MB",
    "binary.base": "File data must be binary",
    "string.valid":
      "Invalid file type, must be one of video/mp4, video/avi, video/mov, video/mkv",
    "any.required": "Field is required",
  });

const genderSchema = Joi.string().valid(...Object.values(USER_GENDER));
const dobSchema = Joi.date().required();
const idSchema = Joi.string().required();
const timeSchema = Joi.string()
  .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
  .required()
  .messages({
    "string.pattern.base": "Duration must be in the format HH:mm or HH:mm:ss",
    "any.required": "Duration is required",
  });

module.exports = {
  fileMetadataSchema,
  accountTypeSchema,
  descriptionSchema,
  phoneNumberSchema,
  passwordsSchema,
  arrayDataSchema,
  thumbnailSchema,
  videoFileSchema,
  fileKeySchema,
  statusSchema,
  genderSchema,
  countryCode,
  emailSchema,
  titleSchema,
  nameSchema,
  timeSchema,
  otpSchema,
  dobSchema,
  idSchema,
};
