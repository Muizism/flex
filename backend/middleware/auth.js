const jwt = require('jsonwebtoken');

let VerifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ "Success": false, "Message": "No token provided" });
    }
    else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ "Success": false, "Message": "Invalid token" });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
}


let verifyTokenExiry = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ "Success": false, "Message": "No token provided" });
    }
    else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ "Success": false, "Message": "Invalid token" });

            }
            else {
                res.status(200).json({ "Success": true, "Message": "Token is valid" });
            }
        });
    }
}

let VerifyUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    console.log(req.headers);
    
    if (!authHeader) {
      res.status(401).json({ "Success": false, "Message": "No token provided" });
    } else {
      let token = authHeader.split(' ')[1]; // Extract token part after 'Bearer'
      
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({ "Success": false, "Message": "Invalid token" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  }
  
module.exports = {
    VerifyToken,
   
    verifyTokenExiry,
    VerifyUser

  
}