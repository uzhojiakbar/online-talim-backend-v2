const express = require("express");
const { db } = require("../../db/db");
const { authenticateToken } = require("../../middleware/auth");
const { getMe, deleteMe } = require("../../controllers/user");

const router = express.Router();

router.get("/me", authenticateToken, getMe);
router.delete("/me", authenticateToken, deleteMe);

module.exports = router;
