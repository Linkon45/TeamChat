const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/userValidators");

router.get("/", decorateHtmlResponse("Users"), getUsers);
router.post("/", avatarUpload, addUserValidators, addUserValidationHandler);
module.exports = router;
