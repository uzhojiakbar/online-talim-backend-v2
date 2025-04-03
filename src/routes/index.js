const express = require("express");
const authRoutes = require("./auth/index");

const router = express.Router();

// Example sub-routes

// Mount sub-routes
router.use("/auth", authRoutes);

// Health check route
router.get("/", (req, res) => {
  res.send("API is working!");
});

module.exports = router;
