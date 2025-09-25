module.exports = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
};
