// src/controllers/auth/index.js
const { RegisterValidation } = require("./validation");

const register = (req, res) => {
  try {
    const userData = new RegisterValidation(req.body);

    console.log("userData", userData);

    res.status(201).json({ message: "Success!" });
  } catch (error) {
    const status = error.code || 400;
    res.status(status).json({ error: error.message });
  }
};

const login = (req, res) => {
  // Login logic here
  res.send("User logged in successfully");
};

module.exports = {
  register,
  login,
};
