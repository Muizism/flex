const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.secretKey; 

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function comparePasswords(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  generateToken,
  hashPassword,
  comparePasswords,
};
