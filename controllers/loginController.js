const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const getLogin = (req, res, next) => {
  res.render("index");
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.username,
      // $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const userObject = {
          name: user.name,
          mobile: user.mobile,
          email: user.email,
          role: user.role,
        };
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRATION,
        });
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRATION,
          httpOnly: true,
          signed: true,
        });
        res.locals.loggedInUser = userObject;
        res.render("inbox");
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

module.exports = {
  getLogin,
  login,
};
