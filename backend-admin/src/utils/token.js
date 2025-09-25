const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { createAccessToken, createRefreshToken };
