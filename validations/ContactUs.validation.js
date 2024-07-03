const Joi = require("joi");
const {
  nameSchema,
  emailSchema,
  phoneNumberSchema,
  descriptionSchema,
  countryCode,
} = require("./General.validation");

const contactUsSchema = Joi.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  countryCode: countryCode,
  phoneNo: phoneNumberSchema,
  message: descriptionSchema,
});

module.exports = {
  contactUsSchema,
};
