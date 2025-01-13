// import required packages
const express = require("express");
const router = express.Router();
const path = require("path");

// Route for the root (/) and other aliases (/docs, /documentation)
const documentationPath = path.join(
  __dirname,
  "../documentation",
  "index.html"
);

// Serve the HTML file
router.get(["/", "/docs", "/documentation"], (_, res) => {
  res.sendFile(documentationPath);
});

module.exports = router;
