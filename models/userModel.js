const moongose = require("moongose");

const userSchema = moongose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email address"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: [true, "Please add a mobile number"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = moongose.model("User", userSchema);
