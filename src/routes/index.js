const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.url);
  res.render('login', { title: 'Login' });
});

module.exports = router;
