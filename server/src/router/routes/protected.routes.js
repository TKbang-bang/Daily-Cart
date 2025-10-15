const productsRoutes = require("./products.routes");
const sessionRoutes = require("./session.routes");
const usersRoutes = require("./users.routes");

const protectedRoutes = require("express").Router();

// checking session
protectedRoutes.use("/session", sessionRoutes);
// users routes
protectedRoutes.use("/users", usersRoutes);
// products routes
protectedRoutes.use("/products", productsRoutes);

module.exports = protectedRoutes;
