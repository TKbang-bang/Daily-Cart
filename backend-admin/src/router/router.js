const authRoutes = require("./routes/auth.routes");

const router = require("express").Router();

router.use("/auth", authRoutes);

router.get("/hello", (req, res) => res.send("Hello World!"));

module.exports = router;
