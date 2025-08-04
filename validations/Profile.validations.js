const Joi = require("joi");
const {
  genderSchema,
  descriptionSchema,
  phoneNumberSchema,
  dobSchema,
  s3ObjectUrlSchema,
} = require("./General.validation");

const updateProfileSchema = Joi.object({
  gender: genderSchema.optional(),
  dob: dobSchema.optional(),
  about: descriptionSchema.optional(),
  phoneNo: phoneNumberSchema,
});

const profilePictureSchema = Joi.object({
  objectUrl: s3ObjectUrlSchema,
});

module.exports = {
  updateProfileSchema,
  profilePictureSchema,
};
