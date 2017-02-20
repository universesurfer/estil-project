var express = require('express');
const authController = express.Router();
const User           = require("../models/user");
const Stylist           = require("../models/stylist");
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

authController.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

authController.get('/stylist/signup', function(req, res, next) {
  res.render('auth/stylist-signup');
});

authController.post("/signup", (req, res, next) => {
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
      password: hashPass,
			role: "User",
			avatar: " ",
			appointments: new Date()
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "The username already exists" });
      } else {
        res.redirect("/login");
      }
    });
  });
});

authController.post("/stylist/signup", (req, res, next) => {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
  var username = req.body.email;
  var password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate email and password" });
    return;
  }

  Stylist.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);


    var newStylist = Stylist({
			firstName,
			lastName,
      username,
      password: hashPass,
			role: "Stylist",
			date: new Date(),
			avatar: " ",
			services: " ",
			expertise: " ",
			language: " ",
			description: " ",
			price: " ",
			availability: " ",
			location: " "
    });

    newStylist.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "The username already exists" });
      } else {
        res.redirect("/stylist/login");
      }
    });
  });
});

authController.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authController.post("/login", passport.authenticate("user-login", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authController.get("/stylist/login", (req, res, next) => {
  res.render("auth/stylist-login", { "message": req.flash("error") });
});

authController.post("/stylist/login", passport.authenticate("stylist-login", {
  successRedirect: "/stylist/profile",
  failureRedirect: "/stylist/login",
  failureFlash: true,
  passReqToCallback: true
}));

authController.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private/profile", { user: req.user });
});

authController.get("/stylist/profile", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {
  res.render("private/stylist-profile", { user: req.user });
});

authController.post("/stylist/profile", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {
	Stylist.findOne({ "username": req.user.username }, "username", (err, stylist) => {


			req.user.avatar = req.body.avatar;
			req.user.services = req.body.services;
			req.user.expertise = req.body.expertise;
			req.user.languages = req.body.languages;
			req.user.description = req.body.description;
			req.user.price = req.body.price;
			req.user.availability = req.body.availability;
			req.user.location = req.body.location;

		stylist.update(stylistUpdates,(err) => {
			res.render("private/stylist-profile", { user: req.user });
		})
	});
});

authController.get("/stylist/profile/edit", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {
  res.render("private/stylist-profile-edit", { user: req.user });
});

authController.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authController;
