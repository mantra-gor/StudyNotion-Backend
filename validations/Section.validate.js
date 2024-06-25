const Joi = require("joi");
const { titleSchema, courseIdSchema } = require("./General.validation");

const crudSectionSchema = Joi.object({
  sectionName: titleSchema,
  courseID: courseIdSchema,
});

module.exports = {
  crudSectionSchema,
};
