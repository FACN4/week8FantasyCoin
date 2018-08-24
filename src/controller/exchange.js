/* eslint-disable no-console, prefer-const, prefer-destructuring, no-param-reassign, no-return-assign */

const rp = require('request-promise');
const { verifyJWTToken, createJWToken } = require('./tokens');

exports.post = (req, res) => {
  let { from, to, amount } = req.body;
  from = from.toLowerCase();
  to = to.toLowerCase();

  const options = {
    uri: `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}&extraParams=test_app`,
    json: true,
  };

  // Promise chain
  let id;
  let username;
  verifyJWTToken(req.cookies.jwt)
    .then((userInfo) => {
      id = userInfo.id;
      username = userInfo.username;
      checkBalance(amount, from, id);
    })
    .then(() => rp(options))
    .then(eX => balaceUpdate(from, amount, to, amount * eX, id))
    .then((upUserInfo) => {
      delete upUserInfo.password;
      res.cookie('jwt', createJWToken(upUserInfo), { maxAge: 1000 * 60 * 16, httpOnly: true });
    })
    .then(res.redirect(`/profile/${username}`))
    .catch(err => res.end(err));
};
