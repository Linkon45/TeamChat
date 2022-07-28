const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controllers/usersController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/userValidators");
router.get("/", decorateHtmlResponse("Users"), getUsers);
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
router.delete("/:id", removeUser);

module.exports = router;
