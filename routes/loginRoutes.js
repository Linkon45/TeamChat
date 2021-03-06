const express = require("express");
const router = express.Router();
const { getLogin } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middleware/decorateHtmlResponse");

router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
