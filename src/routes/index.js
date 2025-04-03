const express = require("express");
const authRoutes = require("./auth/index");
const userRoutes = require("./user/index");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

router.get("/", (req, res) => {
  res.send("API WORKING!");
});

module.exports = router;
