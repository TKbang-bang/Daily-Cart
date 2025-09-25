const jwt = require("jsonwebtoken");
const { createAccessToken, createRefreshToken } = require("../utils/token");
const cookiesOption = require("../utils/cookiesOption");

const sessionMiddleware = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;

  // token verification
  if (!accessToken && !refreshToken)
    return res.status(401).json({ message: "Unauthorized" });

  // if both tokens are present, verify access token first
  if (accessToken) {
    try {
      // verify access token
      const { id } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      // if access token is valid, set userId and proceed
      req.userId = id;

      return next();
    } catch (error) {
      console.log("Invalid access token", error);
    }
  }

  // refresh token verification
  if (refreshToken) {
    try {
      // verify refresh token
      const { id } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // create new access and refresh tokens
      const newAccessToken = createAccessToken(id);
      const newRefreshToken = createRefreshToken(id);

      // set new tokens in response
      res.cookie("refreshToken", newRefreshToken, cookiesOption);
      res.setHeader("access-token", `Bearer ${newAccessToken}`);
      req.userId = id;

      return next();
    } catch (error) {
      console.log("Invalid refresh token", error);
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }
};

module.exports = sessionMiddleware;
