/* eslint-disable no-console */
const express = require('express');

const error = require('./error');
const login = require('./login');
const signup = require('./signup');
const profile = require('./profile');
const trading = require('./trading');
const checkLogin = require('./checkLogin');
const newUser = require('./newUser');
const exchange = require('./exchange');

const router = express.Router();

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

// Serve static pages
router.get('/', login.get);
router.get('/signup', signup.get);

// Serve dynamic pages
router.get('/profile/:user', profile.get);
router.get('/trading', trading.get);

// Serve post requests
router.post('/checkLogin', checkLogin.post);
router.post('/newUser', newUser.post);
router.post('/exchange', exchange.post);


// Error handling
router.use(error.client);
router.use(error.server);

module.exports = router;
