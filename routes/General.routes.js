const express = require("express");
const router = express.Router();

// import contact us controllers
const { contactUs } = require("../controllers/ContactUs.controller.js");

// ********************************************************************************************************
//?                                              CONTACT US ROUTES
// ********************************************************************************************************
router.post("/contact-us", contactUs);

module.exports = router;
