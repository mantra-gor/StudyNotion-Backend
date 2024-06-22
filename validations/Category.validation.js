const Joi = require("joi");
const { nameSchema, descriptionSchema } = require("./General.validation");

const createCategorySchema = Joi.object({
  name: nameSchema,
  description: descriptionSchema,
});

const categoryPageDetailsSchema = Joi.object({
  categoryId: Joi.string().required(),
});

module.exports = {
  createCategorySchema,
  categoryPageDetailsSchema,
};
