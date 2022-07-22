const express = require("express");
const router = express.Router();
const { getLogin } = require("../controllers/loginController");

router.get("/", getLogin);

module.exports = router;
