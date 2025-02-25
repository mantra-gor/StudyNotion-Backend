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
    // Extract public ID from the public URL
    const urlParts = fileUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const publicId = fileName.split(".")[0];

    // Delete the video
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });

    if (result.result === "ok") {
      console.log("Video deleted successfully");
    } else {
      console.log("Failed to delete video");
    }
  } catch (error) {
    console.error("Error deleting video:", error);
  }
};
