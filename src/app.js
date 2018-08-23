const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const routes = require('./controller');
const helpers = require('./views/helpers/index');

// creating an express app
const app = express();

// compression
app.use(compression());
// Parsing data
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }), cookieParser());
// Set up jwt-express


app.disable('x-powered-by');
app.use(favicon(path.join(__dirname, '..', 'output', 'assets', 'favicon.ico')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers,
  }),
);


app.use(routes);
// exporting the app
module.exports = app;
