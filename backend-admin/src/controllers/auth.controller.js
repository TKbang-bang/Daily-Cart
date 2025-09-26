const ServerError = require("../Errors/errorClas");
const { signingUp } = require("../services/auth.service");
const { sendingCookieToken } = require("../services/cookies.service");
const { getUserByEmail } = require("../services/user.service");
const { createAccessToken, createRefreshToken } = require("../utils/token");

const signup = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const { firstName, lastName, email, password, code } = req.body;

    // check if the user email is already in user
    const userExists = await getUserByEmail(email);
    if (userExists)
      return next(new ServerError("Email is already in use", 409));

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
    console.log(error);
    return next(new ServerError(error.message, 500));
  }
};

module.exports = { signup };
