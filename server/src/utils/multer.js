const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/");
  if (isImage) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const createUploader = (folder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../../public/${folder}`));
    },
    filename: (req, file, cb) => {
      const now = Date.now();
      const originalName = file.originalname.replace(/\s+/g, "_");
      cb(null, `${now}-${originalName}`);
    },
  });

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 },
  });
};

const profileUpload = () => createUploader("profiles");
const productsUpload = () => createUploader("products");

module.exports = { profileUpload, productsUpload };
