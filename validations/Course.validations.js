const Joi = require("joi");
const {
  titleSchema,
  descriptionSchema,
  arrayDataSchema,
} = require("./General.validation");

const createCourseSchema = Joi.object({
  title: titleSchema,
  description: descriptionSchema,
  price: Joi.number().required(),
  language: Joi.string().required(),
  keyFeatures: arrayDataSchema,
  category: Joi.string().required(),
  tags: arrayDataSchema,
});

module.exports = {
  createCourseSchema,
};
