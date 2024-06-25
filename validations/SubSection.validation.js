const Joi = require("joi");
const {
  courseIdSchema,
  titleSchema,
  descriptionSchema,
  timeSchema,
} = require("./General.validation");

const createSubSectionSchema = Joi.object({
  sectionID: courseIdSchema,
  title: titleSchema,
  description: descriptionSchema,
  duration: timeSchema,
});

const updateSubSectionSchema = Joi.object({
  subSectionID: courseIdSchema,
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  duration: timeSchema.optional(),
});

module.exports = {
  createSubSectionSchema,
  updateSubSectionSchema,
};
