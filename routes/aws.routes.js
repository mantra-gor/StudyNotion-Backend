// import required packages
const express = require("express");
const router = express.Router();

// ********************************************************************************************************
//?                                              AWS S3 ROUTES
// ********************************************************************************************************

// Generate presigned put object url of s3 to upload file by user
router.post("/generate-s3-upload-url", auth, createPutObjectUrl);
