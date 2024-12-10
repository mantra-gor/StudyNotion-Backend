const Joi = require("joi");
const {
  titleSchema,
  descriptionSchema,
  arrayDataSchema,
  statusSchema,
  fileMetadataSchema,
} = require("./General.validation");

const createCourseSchema = Joi.object({
  title: titleSchema,
  thumbnailMeta: fileMetadataSchema,
  description: descriptionSchema,
  price: Joi.number().positive().required(),
  language: Joi.string().required(),
  keyFeatures: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.string().required(),
  status: statusSchema,
});

module.exports = {
  createCourseSchema,
};
