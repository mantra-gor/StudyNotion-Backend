const Joi = require("joi");
const { passwordsSchema } = require("./General.validation");

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: passwordsSchema.extract("password"),
  confirmPassword: passwordsSchema.extract("confirmPassword"),
});

module.exports = {
  resetPasswordSchema,
};
