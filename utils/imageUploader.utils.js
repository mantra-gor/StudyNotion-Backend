const cloudinary = require("cloudinary").v2;

exports.imageUploader = async (file, folder, height, quality) => {
  const options = { folder, resourse_type: "auto" };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
