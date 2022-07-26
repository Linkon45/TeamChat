const multer = require("multer");
const createError = require("http-errors");

const uploader = (
  subFolderPath,
  allowedFileTypes,
  maxFileSize,
  errorMessage
) => {
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subFolderPath}/`;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExtension, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExtension);
    },
  });
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: (req, file, cb) => {
      if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(errorMessage));
      }
    },
  });
  return upload;
};
module.exports = uploader;
