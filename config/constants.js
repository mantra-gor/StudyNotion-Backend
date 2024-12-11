// Users ENUMS
exports.USER_GENDER = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
  NULL: null,
};
exports.USER_ROLES = {
  ADMIN: "Admin",
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
};

// Courses ENUMS
exports.COURSES_STATUSES = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
};

// CronJob ENUMS
exports.CRONJOB_STATUSES = {
  PENDING: "Pending",
  EXECUTED: "Executed",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
};
exports.CRONJOB_TYPES = {
  DELETION: "Deletion",
};

// S3 FOLDERS
exports.S3_FOLDERS = {
  THUMBNAILS: "thumbnails",
  COURSES: "courses",
};
