var express = require('express');
const authController = express.Router();
const User           = require("../models/user");
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

authController.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

authController.post("/signup", (req, res, next) => {
	console.log(req.body);
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
  var username = req.body.email;
  var password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate email and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);


    var newUser = User({
			firstName,
			lastName,
      username,
      password: hashPass
    });

		console.log(newUser);

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "The username already exists" });
      } else {
        res.redirect("/login");
      }
    });
  });
});

authController.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authController.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authController.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("profile", { user: req.user });
});

authController.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = authController;
