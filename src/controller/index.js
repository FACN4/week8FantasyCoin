const express = require('express');

const error = require('./error');
const login = require('./login');
const signup = require('./signup');
const profile = require('./profile');
const trading = require('./trading');

const router = express.Router();

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get('/', login.get);
router.get('/signup', signup.get);
router.get('/profile/:user', profile.get);
router.get('/trading', trading.get);

router.use(error.client);
router.use(error.server);


module.exports = router;
