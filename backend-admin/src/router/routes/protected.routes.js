const sessionRoutes = require("./session.routes");

const protectedRoutes = require("express").Router();

// checking session
protectedRoutes.use("/session", sessionRoutes);

module.exports = protectedRoutes;
