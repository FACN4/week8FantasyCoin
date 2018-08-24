/* eslint-disable no-unused-vars */
exports.client = (req, res) => {
  res.status(404).render('error', {
    layout: 'error',
    statusCode: 404,
    errorMessage: 'Page not found',
    title: 'Error',
  });
};

exports.server = (err, req, res, next) => {
  console.log('error here', err);
  res.status(500).render('error', {
    layout: 'error',
    statusCode: 500,
    errorMessage: 'Internal server error',
    title: 'Error',
  });
};
