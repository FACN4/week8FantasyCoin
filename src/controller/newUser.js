/* eslint-disable no-param-reassign */
const { createJWToken } = require('./tokens');
const { hashPassword, storeUser } = require('../model/queries/postData');


exports.post = (req, res) => {
  const userDetails = req.body;
  hashPassword(userDetails.password)
    .then(hash => storeUser(hash, userDetails))
    .then((row) => {
      const userInfo = row[0];
      delete userInfo.password;
      res.cookie('jwt', createJWToken(userInfo), { maxAge: 1000 * 60 * 16, httpOnly: true });
      res.redirect(`/profile/${userInfo.username}`);
    })
    .catch((err) => {
      console.log(err);
      if (err.code === '23505') {
        res.status(500).end('Sorry, that username already exists. Please choose another.');
      } else {
        res.status(500).end('Sorry, we are unable to create you an account at this moment.');
      }
    });
};
