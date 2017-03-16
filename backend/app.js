var express          = require('express');
var path             = require('path');
var favicon          = require('serve-favicon');
var logger           = require('morgan');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
var mongoose         = require('mongoose');
const User           = require("./models/user");
const Stylist        = require("./models/stylist");
const session        = require("express-session");
const flash          = require("connect-flash");
const multer         = require('multer');
const env            = require("dotenv").config();
const cors           = require("cors");

var index = require('./routes/index');
var authController = require('./routes/authController');
// var userProfile = require('./routes/userProfile');
// var stylistProfile = require('./routes/stylistProfile');

mongoose.connect('mongodb://localhost/estil');

var app = express();

var corsOptions = {credentials: true, origin: 'http://localhost:4200'};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(session({
  secret: "passport-local-strategy",
  resave: true,
  saveUninitialized: true
}));

const passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(flash());

app.use('/', index);
app.use('/', authController);
// app.use('/', userProfile);
// app.use('/', stylistProfile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
