const { signup } = require("../../controllers/auth.controller");
const { profileUpload } = require("../../utils/multer");
const { signupValidation } = require("../../middlewares/validations/auth");

const authRoutes = require("express").Router();

authRoutes.post(
  "/signup",
  profileUpload().single("image"),
  signupValidation,
  signup
);

module.exports = authRoutes;
