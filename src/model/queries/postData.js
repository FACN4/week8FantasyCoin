const bcrypt = require('bcryptjs');
const dbConnection = require('../database/dbconnection');

const hashPassword = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      reject(err);
    } else {
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          reject(error);
        } else {
          resolve(hash);
        }
      });
    }
  });
});

const storeUser = (hash, userDetails) => new Promise((resolve, reject) => {
  const queryString = `INSERT INTO accounts (username, password, USD, BTC, ETH)
                      VALUES ($1, $2, $3, $4, $5)
                      RETURNING id, username, password, USD, BTC, ETH;`;
  const values = [userDetails.username, hash, 1000000, 0, 0];

  dbConnection.query(queryString, values, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});


module.exports = { hashPassword, storeUser };
