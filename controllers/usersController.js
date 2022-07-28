const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const getUsers = (req, res) => {
  res.render("users");
};
// @desc    Register new user
// @route   POST /users
// @access  Public
const addUser = async (req, res) => {
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

module.exports = {
  getUsers,
  addUser,
};
