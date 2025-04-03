const { db } = require("../../db/db");

const getMe = (req, res) => {
  const query = `SELECT id, username, firstname, lastname, group_name, role FROM users WHERE id = ?`;
  db.get(query, [req.user.sub], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "SQLITE3 ga ulanishda xatolik" });
    }
    if (!row) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }
    res.status(200).json(row);
  });
};

const deleteMe = (req, res) => {
  const deleteUserQuery = `DELETE FROM users WHERE id = ?`;
  const deleteTokenQuery = `DELETE FROM refresh_tokens WHERE user_id = ?`;

  db.run(deleteUserQuery, [req.user.sub], function (err) {
    if (err)
      return res
        .status(500)
        .json({ error: "Foydalanuvchini o‘chirishda xatolik" });

    db.run(deleteTokenQuery, [req.user.sub], function (tokenErr) {
      if (tokenErr)
        return res.status(500).json({ error: "Tokenni o‘chirishda xatolik" });

      res.status(200).json({
        message: "Profil va barcha refresh tokenlar muvaffaqiyatli o‘chirildi",
      });
    });
  });
};

module.exports = {
  getMe,
  deleteMe,
};
