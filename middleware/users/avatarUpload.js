const uploader = require("../../utilities/singleUploader");
const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/png", "image/jpg"],
    5000000,
    "Only .jpg, .jpeg or .png images are allowed"
  );
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};
module.exports = avatarUpload;
