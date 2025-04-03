const { CustomError } = require("../../components/customError");

class RegisterValidation {
  constructor({
    username,
    password,
    firstname,
    lastname,
    group,
    role = "user",
  }) {
    this.validateFirstname(firstname);
    this.validatePassword(password);

    this.firstname = firstname.trim();
    this.password = password.trim();
  }

  validateFirstname(name) {
    if (!name || typeof name !== "string" || name.trim().length < 3) {
      throw new CustomError(
        400,
        "Ism to‘liq va kamida 3 ta belgi bo‘lishi kerak"
      );
    }
  }

  validatePassword(password) {
    if (!password || typeof password !== "string" || password.length < 6) {
      throw new CustomError(400, "Parol kamida 6 ta belgi bo‘lishi kerak");
    }
  }
}

module.exports = { RegisterValidation };
