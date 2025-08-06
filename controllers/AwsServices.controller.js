const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const { putObject, getPresignedURL } = require("../utils/s3.utils.js");
const {
  generatePutObjectURLSchema,
} = require("../validations/AwsServices.validation.js");
require("dotenv").config();

// General function to create a S3 presigned PUT URL for any file
exports.createS3PutObjectUrl = async (req, res) => {
  try {
    // Validate the input data using Joi schema
    const { error, value } = generatePutObjectURLSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error || result.error));
    }
    const { fileMeta, assetType } = value;
    // TODO: add size validation here (fileMeta.size)

    // Sets 'isPublic' based on 'assetType' and throws an error if 'assetType' is invalid.
    let isPublic;
    let folder;
    switch (assetType) {
      case "course":
        folder = "course";
        isPublic = false;
        break;

      case "thumbnail":
        folder = "thumbnail";
        isPublic = true;
        break;

      case "profile-picture":
        folder = "users/profile-picture";
        isPublic = true;
        break;

      default:
        throw new Error("Asset Type is required.");
    }

    // Generate the S3 PUT URL for the given asset type (e.g., thumbnail, course, etc.)
    const { url, key, objectUrl } = await putObject({
      filename: fileMeta.fileName,
      contentType: fileMeta.contentType,
      folder,
      public: isPublic,
    });

    if (!url || !key) {
      return res.status(404).json({
        success: false,
        message: "Failed to generate S3 presigned URL",
      });
    }
    const fileInfo = {
      key,
      objectUrl,
      contentType: fileMeta.contentType,
    };

    res.status(200).json({
      success: true,
      message: `${
        assetType.charAt(0).toUpperCase() + assetType.slice(1)
      } URL generated successfully`,
      data: {
        url,
        fileInfo,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating S3 URL",
      error: error.message,
    });
  }
};
