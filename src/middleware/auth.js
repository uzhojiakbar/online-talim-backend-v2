// 📁 src/middleware/authenticateToken.js
const jwt = require("jsonwebtoken");

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
    next();
  });
}

function authorizeAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Faqat adminlar ruxsat oladi" });
  }
  next();
}

module.exports = {
  authenticateToken,
  authorizeAdmin,
};
