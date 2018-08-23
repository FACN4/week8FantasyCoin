/* eslint-disable no-param-reassign */
const { createJWToken } = require('./tokens');
const { getHash, compareHash } = require('../model/queries/getData');

exports.post = (req, res) => {
  getHash(req.body.username)
    .then(hashedRow => compareHash(req.body.password, hashedRow))
    .then((userInfo) => {
      delete userInfo.password;
      res.cookie('jwt', createJWToken(userInfo), { maxAge: 1000 * 60 * 16, httpOnly: true });
      res.redirect(`/profile/${userInfo.username}`);
    })
    .catch(console.log);
};
