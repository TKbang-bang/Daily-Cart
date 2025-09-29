const ServerError = require("../Errors/errorClas");
const { signingUp } = require("../services/auth.service");
const { sendingCookieToken } = require("../services/cookies.service");
const { getUserByEmail } = require("../services/user.service");
const { createAccessToken, createRefreshToken } = require("../utils/token");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  try {
    // file from the user
    const { filename } = req.file;
    // credentials from the user
    const { firstName, lastName, email, password, code } = req.body;

    // check if the user email is already in use
    const userExists = await getUserByEmail(email);
    if (userExists)
      return next(new ServerError("Email is already in use", 409));

    // signing up the user
    const user = await signingUp(
      firstName,
      lastName,
      email,
      password,
      code,
      filename
    );
    if (!user.ok) return next(new ServerError(user.message, user.status));

    // cerating tokens with the user id
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    // sending tokens to the user
    return sendingCookieToken(res, accessToken, refreshToken);
  } catch (error) {
    return next(new ServerError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    // credentials from the user
    const { email, password, code } = req.body;

    // check if the user email exists
    const user = await getUserByEmail(email);
    if (!user) return next(new ServerError("Email not found", 404));

    // check if the user password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return next(new ServerError("Password is incorrect", 401));

    // check if the code is correct
    if (user.role == "admin") {
      if (code != `${process.env.ADMIN_CODE}`)
        return next(new ServerError("Code is incorrect", 401));
    } else if (user.role == "moderator") {
      if (code != `${process.env.MANAGER_CODE}`)
        return next(new ServerError("Code is incorrect", 401));
    }

    // creating tokens with the user id
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    // sending tokens to the user
    return sendingCookieToken(res, accessToken, refreshToken);
  } catch (error) {
    return next(new ServerError(error.message, 500));
  }
};

module.exports = { signup, login };
