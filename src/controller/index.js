/* eslint-disable no-console, no-return-assign */
const express = require('express');

const error = require('./error');
const home = require('./home');
const signup = require('./signup');
const profile = require('./profile');
const trading = require('./trading');
const login = require('./login');
const newUser = require('./newUser');
const exchange = require('./exchange');
const logout = require('./logout');

const router = express.Router();

router.use((req, res, next) => {
  console.log(req.url);
  next();
});
// Serve static pages
router.get('/', home.get);
router.get('/signup', signup.get);

// Serve dynamic pages
router.get('/profile/:user', profile.get);
router.get('/trading', trading.get);

// Serve get requests
router.get('/logout', logout.get);

// Serve post requests
router.post('/login', login.post);
router.post('/newUser', newUser.post);
router.post('/exchange', exchange.post);


// Error handling
router.use(error.client);
router.use(error.server);

module.exports = router;
