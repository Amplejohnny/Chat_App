const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, salt);

const comparePassword = async (raw, hash) => {
  return await bcrypt.compare(raw, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
