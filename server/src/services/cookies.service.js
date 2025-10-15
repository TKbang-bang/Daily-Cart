const cookiesOption = require("../utils/cookiesOption");

const sendingCookieToken = (res, accessToken, refreshToken) => {
  return res
    .cookie("refreshToken", refreshToken, cookiesOption)
    .status(200)
    .json({
      accessToken,
    });
};

module.exports = {
  sendingCookieToken,
};
