const Joi = require("joi");
const {
  idSchema,
  titleSchema,
  descriptionSchema,
  timeSchema,
  fileKeySchema,
} = require("./General.validation");

const createSubSectionSchema = Joi.object({
  sectionID: idSchema,
  title: titleSchema,
  description: descriptionSchema,
  fileKey: fileKeySchema,
  videoFile: fileKeySchema,
  // duration: timeSchema,
});

const deleteSubSectionSchema = Joi.object({
  subSectionID: idSchema,
  courseID: idSchema,
});

const updateSubSectionSchema = Joi.object({
  sectionID: idSchema,
  subSectionID: idSchema,
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  duration: timeSchema.optional(),
});

const generateLecturePresignedUrlSchema = Joi.object({
  videoKey: Joi.string().required(),
  courseID: idSchema,
});

module.exports = {
  createSubSectionSchema,
  deleteSubSectionSchema,
  updateSubSectionSchema,
  generateLecturePresignedUrlSchema,
};
