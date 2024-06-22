const Joi = require("joi");
const {
  nameSchema,
  emailSchema,
  phoneNumberSchema,
  descriptionSchema,
} = require("./General.validation");

const contactUsSchema = Joi.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  message: descriptionSchema,
});

module.exports = {
  contactUsSchema,
};
