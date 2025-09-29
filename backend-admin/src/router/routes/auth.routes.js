const { signup, login } = require("../../controllers/auth.controller");
const { profileUpload } = require("../../utils/multer");
const { signupValidation } = require("../../middlewares/validations/auth");

const authRoutes = require("express").Router();

// signup
authRoutes.post(
  "/signup",
  profileUpload().single("image"),
  signupValidation,
  signup
);
// login
authRoutes.post("/login", login);

module.exports = authRoutes;
