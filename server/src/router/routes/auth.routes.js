const {
  signup,
  login,
  commonSignup,
  commonLogin,
} = require("../../controllers/auth.controller");
const { profileUpload } = require("../../utils/multer");
const { signupValidation } = require("../../middlewares/validations/auth");

const authRoutes = require("express").Router();

// private
// signup
authRoutes.post(
  "/private/signup",
  profileUpload().single("image"),
  signupValidation,
  signup
);
// login
authRoutes.post("/private/login", login);

// common
// signup
authRoutes.post("/signup", signupValidation, commonSignup);
authRoutes.post("/login", commonLogin);

module.exports = authRoutes;
