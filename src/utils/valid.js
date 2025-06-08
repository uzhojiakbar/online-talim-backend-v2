function isValidPhone(phone) {
  return /^998\d{9}$/.test(phone);
}

function isValidUserID(id) {
  return /^AB\d{7}$/.test(id);
}

module.exports = {
  isValidPhone,
  isValidUserID,
};
