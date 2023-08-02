
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
  
  exports.hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
  };
  
  exports.comparePasswords = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  };
  
  exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  };
  
  exports.authenticate = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
  
      if (!token) {
        return res.status(401).send({ error: 'Authentication token missing.' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const student = await Student.findById(decoded.id);
  
      if (!student) {
        return res.status(401).send({ error: 'No student found.' });
      }
  
      req.student = student;
      req.token = token;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Error in authentication.' });
    }
  }
