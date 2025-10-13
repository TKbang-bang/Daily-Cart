require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./Errors/errorHandler");
const path = require("path");
const router = require("./router/router");

// creating express app
const app = express();

// setters
app.set("port", process.env.PORT || 4000);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["access-token"],
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// routes
app.use(router);

// error handler
app.use(errorHandler);

// start server
app.listen(app.get("port"), () => {
  console.log(`Server started on port ${app.get("port")}`);
});
