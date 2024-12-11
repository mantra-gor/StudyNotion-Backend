const Joi = require("joi");
const {
  descriptionSchema,
  arrayDataSchema,
  statusSchema,
  titleSchema,
  fileKey,
} = require("./General.validation");

const createCourseSchema = Joi.object({
  title: titleSchema,
  fileKey: fileKey,
  description: descriptionSchema,
  price: Joi.number().positive().required(),
  language: Joi.string().required(),
  category: Joi.string().required(),
  keyFeatures: arrayDataSchema,
  tags: arrayDataSchema,
  status: statusSchema,
});

module.exports = {
  createCourseSchema,
};
