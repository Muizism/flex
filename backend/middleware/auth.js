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

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ error: 'Authentication required' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

module.exports = {
  generateToken,
  hashPassword,
  comparePasswords,
  authenticateToken,
};
