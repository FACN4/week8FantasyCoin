const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');

const routes = require('./routes');
const helpers = require('./views/helpers/index');

// creating an express app
const app = express();

// express config
app.use(compression());
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
// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);
// exporting the app
module.exports = app;
