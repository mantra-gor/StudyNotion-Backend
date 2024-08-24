const Joi = require("joi");
const { emailSchema, passwordsSchema } = require("./General.validation");

const forgotPasswordSchema = Joi.object({
  email: emailSchema,
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: passwordsSchema.extract("password").label("password"),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "Passwords do not match",
    })
    .required(),
});

module.exports = {
  forgotPasswordSchema,
  resetPasswordSchema,
};
