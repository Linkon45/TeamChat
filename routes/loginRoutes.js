const express = require("express");
const router = express.Router();
const { getLogin, login } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");

router.get("/", decorateHtmlResponse("Login"), getLogin);
router.post("/", login);
module.exports = router;
