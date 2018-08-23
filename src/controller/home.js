const { verifyJWTToken } = require('./tokens');

exports.get = (req, res) => {
  verifyJWTToken(req.cookies.jwt)
    .then((userInfo) => {
      res.redirect(`/profile/${userInfo.username}`);
    })
    .catch(() => res.render('login', { title: 'Login' }));
};
