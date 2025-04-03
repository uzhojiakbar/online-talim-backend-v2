const express = require("express");
const { login, register } = require("../../controllers/auth/index");

const router = express.Router();

// Controllers

// Login route
router.post("/login", login);

// Register route
router.post("/register", register);

module.exports = router;
