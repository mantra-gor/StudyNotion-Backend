const cloudinary = require("cloudinary").v2;

exports.fileUploader = async (file, folder, height, quality) => {
  const options = { folder, resource_type: "auto" };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

exports.deleteFile = async (fileUrl) => {
  try {
    const result = await cloudinary.uploader.delete_resources_by_prefix(
      fileUrl,
      {
        resource_type: "auto",
      }
    );
    return result;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
};
