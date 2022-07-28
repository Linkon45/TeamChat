const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const path = require("path");
const { unlink } = require("fs");

// @desc    Get all users
// @route   POST /users
// @access  Public
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Register new user
// @route   POST /users
// @access  Public
const addUser = async (req, res, next) => {
  let newUser;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }
  try {
    const result = await newUser.save();
    res.status(200).json({
      data: result,
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

// @desc    remove user
// @route   DELETE /users/:id
// @access  Public
const removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "couldn't delete the user",
        },
      },
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  removeUser,
};
