require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");

const DB_PATH = process.env.DATABASE_URL;

if (!DB_PATH) {
  console.error("❌ .env faylida DATABASE_URL aniqlanmagan!");
  process.exit(1);
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("❌ DB ulanishda xatolik:", err.message);
  } else {
    console.log("✅ SQLite DB ulanmoqda...");
    createUsersTable();
  }
});

function createUsersTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstname TEXT,
      lastname TEXT,
      group_name TEXT,
      role TEXT CHECK(role IN ('admin', 'user', 'teacher')) NOT NULL DEFAULT 'user'
    );
  `;

  db.run(createTableSQL, (err) => {
    if (err) {
      console.error("❌ Jadval yaratishda xatolik:", err.message);
    } else {
      console.log("✅ users jadvali tayyor (uuid id bilan).");
    }
  });
}

function createUser(user, callback) {
  const id = uuidv4();
  const {
    username,
    password,
    firstname = "",
    lastname = "",
    group = "",
    role = "user",
  } = user;

  const insertSQL = `
    INSERT INTO users (id, username, password, firstname, lastname, group_name, role)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  db.run(
    insertSQL,
    [id, username, password, firstname, lastname, group, "user"],
    function (err) {
      if (err) return callback(err);
      callback(null, { id });
    }
  );
}

module.exports = {
  db,
  createUser,
};
