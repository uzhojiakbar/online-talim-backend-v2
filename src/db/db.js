require("dotenv").config();
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");
const { CustomError } = require("../components/customError");
const { userFindByUsername, insertUser } = require("./queries");
const { roles } = require("../utils/roles");

const DB_PATH = process.env.DATABASE_URL;

if (!DB_PATH) {
  console.error("❌ .env faylida DATABASE_URL aniqlanmagan!");
  process.exit(1);
}

const dir = path.dirname(DB_PATH);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("❌ DB ulanishda xatolik:", err.message);
  } else {
    console.log("✅ SQLite DB ulanmoqda...");
    createUsersTable();
    createTokenTable();
    createAccessTokenTable();
  }
});

function createUsersTable() {
  const roleCheckSQL = roles.map((role) => `'${role}'`).join(", ");

  //* userID: -- AB1234567
  //* phone  -- 998901234567
  //* password  -- 998901234567
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,                  
      phone TEXT UNIQUE NOT NULL,          
      email TEXT,
      password TEXT NOT NULL,               
      firstname TEXT,
      lastname TEXT,
      group_name TEXT,
      role TEXT CHECK(role IN (${roleCheckSQL})),
      avatar TEXT
    );
  `;

  db.run(createTableSQL, (err) => {
    if (err) {
      console.error("❌ Users Jadval yaratishda xatolik:", err.message);
    } else {
      console.log("✅ users jadvali tayyor");
    }
  });
}

function createTokenTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS refresh_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL,
    user_agent TEXT,
    ip TEXT,
    expires_at TEXT
  );
  `;

  db.run(createTableSQL, (err) => {
    if (err) {
      console.error(
        "❌ refresh_tokens Jadval yaratishda xatolik:",
        err.message
      );
    } else {
      console.log("✅ refresh_tokens jadvali tayyor");
    }
  });
}

function createAccessTokenTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS access_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at TEXT
  );
  `;

  db.run(createTableSQL, (err) => {
    if (err) {
      console.error("❌ access_tokens Jadval yaratishda xatolik:", err.message);
    } else {
      console.log("✅ access_tokens jadvali tayyor");
    }
  });
}

module.exports = {
  db,
};
