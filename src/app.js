// requiring express, etc
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
// creating an express app
const app = express();

// express config
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'public', 'assets', 'favicon.ico')));
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: false }));
// exporting the app
module.exports = app;
