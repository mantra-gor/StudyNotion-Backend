const Joi = require("joi");
const {
  descriptionSchema,
  arrayDataSchema,
  statusSchema,
  titleSchema,
  fileKeySchema,
  idSchema,
} = require("./General.validation");

const createCourseSchema = Joi.object({
  title: titleSchema,
  fileKey: fileKeySchema,
  description: descriptionSchema,
  price: Joi.number().positive().required(),
  language: Joi.string().required(),
  category: Joi.string().required(),
  keyFeatures: arrayDataSchema,
  tags: arrayDataSchema,
  status: statusSchema,
});

const updateCourseSchema = Joi.object({
  courseID: idSchema.required(), // required
  status: statusSchema.required(), // required
  title: titleSchema.optional(),
  fileKey: fileKeySchema.optional(),
  description: descriptionSchema.optional(),
  price: Joi.number().positive().optional(),
  language: Joi.string().optional(),
  category: Joi.string().optional(),
  keyFeatures: arrayDataSchema.optional(),
  tags: arrayDataSchema.optional(),
});

module.exports = {
  createCourseSchema,
  updateCourseSchema,
};
