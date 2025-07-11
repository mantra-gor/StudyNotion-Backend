const Section = require("../models/Section.model.js");
const SubSection = require("../models/SubSection.model.js");
const { deleteMultipleObject } = require("../utils/s3.utils.js");

const deleteSectionWithSubsections = async (sectionID) => {
  const section = await Section.findById(sectionID).populate("subSection");

  if (!section) {
    return { success: false, message: "Section not found" };
  }

  // Delete all related videos from S3 bucket
  const keysToDelete = section.subSection
    .filter((sub) => sub.videoInfo?.key)
    .map((sub) => ({ Key: sub.videoInfo.key }));

  if (keysToDelete.length > 0) {
    await deleteMultipleObject(keysToDelete);
  }

  // Delete all SubSections
  for (const subSection of section.subSection) {
    await SubSection.findByIdAndDelete(subSection._id);
  }

  // Delete the section
  await Section.findByIdAndDelete(sectionID);
};

module.exports = deleteSectionWithSubsections;
