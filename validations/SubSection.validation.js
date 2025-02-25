const Joi = require("joi");
const {
  idSchema,
  titleSchema,
  descriptionSchema,
  timeSchema,
} = require("./General.validation");

const createSubSectionSchema = Joi.object({
  sectionID: idSchema,
  title: titleSchema,
  description: descriptionSchema,
  // duration: timeSchema,
});

const deleteSubSectionSchema = Joi.object({
  subSectionID: idSchema,
  courseID: idSchema,
});

const updateSubSectionSchema = Joi.object({
  subSectionID: idSchema,
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  duration: timeSchema.optional(),
});

module.exports = {
  createSubSectionSchema,
  deleteSubSectionSchema,
  updateSubSectionSchema,
};
