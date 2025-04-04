// 📁 src/controllers/admin/index.js
const { db } = require("../../db/db");

const getAllUsers = (req, res) => {
  const query = `SELECT id, username, firstname, lastname, group_name, role FROM users`;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Server xatoligi" });
    res.status(200).json({ users: rows });
  });
};

module.exports = { getAllUsers };
