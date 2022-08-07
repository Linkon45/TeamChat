const express = require("express");
const router = express.Router();
const { getLogin, login } = require("../controllers/loginController");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middleware/login/loginValidators");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");

router.get("/", decorateHtmlResponse("Login"), getLogin);
router.post(
  "/",
  decorateHtmlResponse("Login"),
  doLoginValidators,
  doLoginValidationHandler,
  login
);
module.exports = router;
