const jwt = require('jsonwebtoken');


const verifyJWTToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err || !decodedToken) {
      return reject(err);
    }
    console.log('token file', decodedToken);
    return resolve(decodedToken);
  });
});

const createJWToken = details => jwt.sign(details, process.env.SECRET);

module.exports = { verifyJWTToken, createJWToken };
