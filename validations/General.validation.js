const Joi = require("joi");
const { USER_ROLES } = require("../config/constants");

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

module.exports = {
  emailSchema,
  nameSchema,
  passwordsSchema,
  phoneNumberSchema,
  accountTypeSchema,
  descriptionSchema,
  arrayDataSchema,
  thumbnailSchema,
  titleSchema,
  otpSchema,
};
