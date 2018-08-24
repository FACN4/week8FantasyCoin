const jwt = require('jsonwebtoken');


const verifyJWTToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err || !decodedToken) {
      reject(err);
    } else {
      resolve(decodedToken);
    }
  });
});

const createJWToken = details => jwt.sign(details, process.env.SECRET);

module.exports = { verifyJWTToken, createJWToken };
