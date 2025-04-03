const express = require("express");
const { db } = require("../../db/db");
const { authenticateToken } = require("../../middleware/auth");
const {
  getMe,
  deleteMe,
  comparePassword,
  changePassword,
} = require("../../controllers/user");

const router = express.Router();

router.get("/me", authenticateToken, getMe);
router.delete("/me", authenticateToken, deleteMe);
router.post("/compare-password", authenticateToken, comparePassword);
router.patch("/password/change", authenticateToken, changePassword);

module.exports = router;
