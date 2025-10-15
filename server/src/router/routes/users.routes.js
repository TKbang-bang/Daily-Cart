const { getMe } = require("../../controllers/users.controller");

const usersRoutes = require("express").Router();

usersRoutes.get("/me", getMe);

module.exports = usersRoutes;
