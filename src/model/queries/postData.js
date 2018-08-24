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

const balanceUpdate = (from, amountFrom, to, amountTo, userId) => new Promise((resolve, reject) => {
  dbConnection.query(
    '(SELECT $1 from accounts where id = $2)',
    [from, userId],
    (err1, res1) => {
      if (err1) {
        reject(err1);
        return;
      }
      dbConnection.query(
        '(SELECT $1 FROM accounts where id = $2)',
        [to, userId],
        (err2, res2) => {
          if (err2) {
            reject(err2);
            return;
          }
          dbConnection.query(
            'UPDATE accounts SET ($1) = $2 WHERE id=$3',
            [from, res1 - amountFrom, userId],
            (err3, res3) => {
              if (err3) {
                reject(err3);
                return;
              }
              dbConnection.query(
                'UPDATE accounts SET ($1) = $2 WHERE id=$3',
                [to, res2 + amountTo, userId],
                (err4, res4) => {
                  if (err4) {
                    reject(err4);
                    return;
                  }
                  resolve(res4.rows[0]);
                },
              );
            },
          );
        },
      );
    },
  );

  // const queryString = `UPDATE accounts SET usd = (SELECT usd FROM accounts WHERE id = 5)-1,btc = (SELECT btc FROM accounts WHERE id = 5)+1 WHERE id=5
  //                                          RETURNING id, username, password, usd, btc, eth; `;
  // dbConnection.query(queryString, (err, res) => {
  //   if (err) {
  //     reject(err);
  //   } else {
  //     resolve(res.rows[0]);
  //   }
  // });
});

module.exports = { hashPassword, storeUser, balanceUpdate };
