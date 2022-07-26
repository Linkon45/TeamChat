const express = require("express");
const router = express.Router();
const { getLogin } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const avatarUpload = require("../middleware/users/avatarUpload");

router.get("/", decorateHtmlResponse("Login"), getLogin);
router.post("/", avatarUpload);
module.exports = router;
