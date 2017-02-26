var express          = require('express');
var path             = require('path');
var favicon          = require('serve-favicon');
var logger           = require('morgan');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
var mongoose         = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const User           = require("./models/user");
const Stylist        = require("./models/stylist");
const session        = require("express-session");
const bcrypt         = require("bcrypt");
const passport       = require("passport");
const LocalStrategy  = require("passport-local").Strategy;
const flash          = require("connect-flash");
const multer         = require('multer');
const env            = require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "bower_components")));


app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


var index = require('./routes/index');
var authController = require('./routes/authController');
var userProfile = require('./routes/userProfile');
var stylistProfile = require('./routes/stylistProfile');

app.use(session({
  secret: "passport-local-strategy",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

passport.serializeUser((user, cb) => {
  cb(null, {id: user.id, role: user.role});
});

passport.deserializeUser((user, cb) => {
	if (user.role == "User") {
	  User.findOne({ "_id": user.id }, (err, user) => {
	    if (err) { return cb(err); }
	    cb(null, user);
	  });
	}
	else if (user.role == "Stylist") {
		Stylist.findOne({ "_id": user.id }, (err, user) => {
	    if (err) { return cb(err); }
	    cb(null, user);
	  });
	}
});

app.use(flash());
passport.use('user-login', new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }
    return next(null, user);
  });
}));

passport.use('stylist-login', new LocalStrategy((username, password, next) => {
  Stylist.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }
    return next(null, user);
  });
}));

app.use('/', index);
app.use('/', authController);
app.use('/', userProfile);
app.use('/', stylistProfile);

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
