const Joi = require("joi");
const { titleSchema, idSchema } = require("./General.validation");

const createSectionSchema = Joi.object({
  sectionName: titleSchema,
  courseID: idSchema,
});

const updateSectionSchema = Joi.object({
  sectionName: titleSchema,
  courseID: idSchema,
  sectionID: idSchema,
});

const deleteSectionSchema = Joi.object({
  sectionID: idSchema,
  courseID: idSchema,
});

module.exports = {
  createSectionSchema,
  deleteSectionSchema,
  updateSectionSchema,
};
