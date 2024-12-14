const Joi = require("joi");
const { fileMetadataSchema } = require("./General.validation");

const generatePutObjectURLSchema = Joi.object({
  fileMeta: fileMetadataSchema,
  assetType: Joi.string().required(),
});

module.exports = {
  generatePutObjectURLSchema,
};
