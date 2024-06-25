const Joi = require("joi");
const { emailSchema, passwordsSchema } = require("./General.validation");

const forgotPasswordSchema = Joi.object({
  email: emailSchema,
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: passwordsSchema.extract("password"),
  confirmPassword: passwordsSchema.extract("confirmPassword"),
});

module.exports = {
  forgotPasswordSchema,
  resetPasswordSchema,
};
