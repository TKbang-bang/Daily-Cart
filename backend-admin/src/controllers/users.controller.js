const ServerError = require("../Errors/errorClas");
const { getUserById } = require("../services/user.service");

const getMe = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId);
    if (!user) return next(new ServerError("User not found", 404));

    return res.status(200).json({ user });
  } catch (error) {
    return next(new ServerError(error.message, 500));
  }
};

module.exports = { getMe };
