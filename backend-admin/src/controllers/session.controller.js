const ServerError = require("../Errors/errorClas");
const { getUserById } = require("../services/user.service");

const sessionCheck = async (req, res, next) => {
  try {
    // check if the user exists in the database
    const user = await getUserById(req.userId);
    if (!user) return next(new ServerError("User not found", 404));

    return res.status(200).json({ message: "Be a good user" });
  } catch (error) {
    return next(new ServerError(error.message, 500));
  }
};

const logout = async (req, res, next) => {
  try {
    req.userId = null;

    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "You have logged out" });
  } catch (error) {
    return next(new ServerError(error.message, 500));
  }
};

module.exports = { sessionCheck, logout };
