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
  category: Joi.string().required(),
  keyFeatures: arrayDataSchema,
  tags: arrayDataSchema,
  status: statusSchema,
});

module.exports = {
  createCourseSchema,
};
