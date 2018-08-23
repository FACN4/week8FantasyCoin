const bcrypt = require('bcryptjs');
const dbConnection = require('../database/dbconnection');

const getHash = username => new Promise((resolve, reject) => {
  const queryString = 'SELECT * FROM accounts WHERE username = $1';
  dbConnection.query(queryString, [username], (err, res) => {
    if (err) {
      reject(err);
    } else if (res.rows.length === 0) {
      reject(new Error('Username incorrect'));
    } else {
      resolve(res.rows[0]);
    }
  });
});

const compareHash = (password, hashedRow) => new Promise((resolve, reject) => {
  bcrypt.compare(password, hashedRow.password, (error, same) => {
    if (error) {
      reject(error);
    } else if (!same) {
      // passwords don't match
      reject(new Error('passwords do not match'));
    } else if (same) {
      resolve(hashedRow);
    }
  });
});

module.exports = { getHash, compareHash };
