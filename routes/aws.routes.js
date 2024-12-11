// import required packages
const express = require("express");
const router = express.Router();

// import required functions
const { createPutObjectUrl } = require("../controllers/Course.controller.js");

// import middlewares
const { auth } = require("../middlewares/Auth.middleware.js");

// ********************************************************************************************************
//?                                              AWS S3 ROUTES
// ********************************************************************************************************

// Generate presigned put object url of s3 to upload file by user
router.post("/generate-s3-upload-url", auth, createPutObjectUrl);

module.exports = router;
