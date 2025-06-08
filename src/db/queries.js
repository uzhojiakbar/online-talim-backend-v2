const userFindByUsername = `SELECT id FROM users WHERE username = ?`;
const userFindByUsernameForLogin = `SELECT id, password FROM users WHERE username = ?`;

const insertUser = `
    INSERT INTO users (
      id, phone, email, password, firstname, lastname, group_name, role, avatar
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
const userFindByPhoneOrID = `SELECT * FROM users WHERE id = ? OR phone = ?`;

module.exports = {
  userFindByPhoneOrID,
  userFindByUsername,
  insertUser,
  userFindByUsernameForLogin,
};
