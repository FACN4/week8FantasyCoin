const { verifyJWTToken } = require('./tokens');

exports.get = (req, res) => {
  const { user } = req.params;
  verifyJWTToken(req.cookies.jwt)
    .then((userInfo) => {
      res.render('profile', { title: user, userInfo });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).render('error', {
        layout: 'error',
        statusCode: 404,
        errorMessage: 'Access denied',
        title: 'Error',
      });
    });
};
