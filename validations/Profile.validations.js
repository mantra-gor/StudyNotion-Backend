const Joi = require("joi");
const {
  genderSchema,
  descriptionSchema,
  phoneNumberSchema,
  dobSchema,
} = require("./General.validation");

const updateProfileSchema = Joi.object({
  gender: genderSchema.optional(),
  dob: dobSchema.optional(),
  about: descriptionSchema.optional(),
  phoneNo: phoneNumberSchema,
});

module.exports = {
  updateProfileSchema,
};
