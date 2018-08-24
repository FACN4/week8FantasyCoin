/* eslint-disable no-console, prefer-const, prefer-destructuring, no-param-reassign, no-return-assign */

const request = require('request');
const { verifyJWTToken, createJWToken } = require('./tokens');
const { checkBalance } = require('../model/queries/getData');
const { balanceUpdate } = require('../model/queries/postData');

exports.post = (req, res) => {
  let { from, to, amount } = req.body;
  const reqPromise = () => new Promise((resolve, reject) => {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}&extraParams=test_app`;
    from = from.toLowerCase();
    to = to.toLowerCase();
    request(url, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });


  let id;
  let username;
  // Promise chain
  console.log('Here is the jwt', req.cookies.jwt);
  verifyJWTToken(req.cookies.jwt)
    .then((userInfo) => {
      console.log('Im starting to check balance');
      id = userInfo.id;
      username = userInfo.username;
      checkBalance(amount, from, id);
    })
    .then(reqPromise)
    .then((eX) => {
      console.log('level 3', eX);
      balanceUpdate(from, amount, to, amount * eX, id).then(console.log);
    })
    // .then((upUserInfo) => {
    //   console.log('level 4', upUserInfo);
    //   delete upUserInfo.password;
    //   res.cookie('jwt', createJWToken(upUserInfo), { maxAge: 1000 * 60 * 16, httpOnly: true });
    // })
    // .then(() => {
    //   console.log('level 5', 'finished');
    //   res.redirect(`/profile/${username}`);
    // })
    .catch((err) => {
      console.log('Catch has been started');
      res.end(err);
    });
};
