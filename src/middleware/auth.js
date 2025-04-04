// 📁 src/middleware/authenticateToken.js
const jwt = require("jsonwebtoken");
const { db } = require("../db/db");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token talab qilinadi" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ error: "Token noto‘g‘ri yoki muddati tugagan" });

    req.user = user;

    const selectUserQuery = `SELECT id, username, firstname, lastname, group_name, role FROM users WHERE id = ?`;
    db.get(selectUserQuery, [user.sub], (dbErr, userInfo) => {
      if (dbErr)
        return res
          .status(500)
          .json({ error: "Foydalanuvchini olishda xatolik" });
      if (!userInfo)
        return res.status(404).json({ error: "Foydalanuvchi topilmadi" });

      req.userInfo = userInfo;
      next();
    });
  });
}

function authorizeAdmin(req, res, next) {
  if (req.userInfo?.role !== "admin") {
    return res.status(403).json({ error: "Faqat adminlar ruxsat oladi" });
  }
  next();
}

module.exports = {
  authenticateToken,
  authorizeAdmin,
};
