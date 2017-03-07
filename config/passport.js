const passport           = require('passport');
const LocalStrategy      = require('passport-local').Strategy;
const User               = require('../models/user');
const bcrypt             = require('bcrypt');

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

module.exports = passport;
