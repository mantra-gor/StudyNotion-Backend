// import required packages
const { Router } = require("express");
const router = Router();

// import profile controllers
const {
  deleteAccountRequest,
  updateProfile,
} = require("../controllers/Profile.controller.js");

// importing middlewares
const { auth } = require("../middlewares/Auth.middleware.js");

// ********************************************************************************************************
//?                                            PROFILE ROUTES
// ********************************************************************************************************

// profile update can only be done if you are logged in
router.put("/update-profile", auth, updateProfile);

// deleting the account needed the user to be logged in
router.delete("/delete-account", auth, deleteAccountRequest);

module.exports = router;
