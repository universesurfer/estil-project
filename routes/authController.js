var express          = require('express');
const authController = express.Router();
const User           = require("../models/user");
const Stylist        = require("../models/stylist");
const Picture        = require('../models/picture');
const Appointment    = require('../models/appointment');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const passport       = require("passport");
const ensureLogin    = require("connect-ensure-login");
const multer         = require('multer');
var upload           = multer({ dest: './public/uploads/' });
const mongoose = require('mongoose');


authController.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

authController.get('/stylist/signup', function(req, res, next) {
  res.render('auth/stylist-signup');
});

function validateEmail(email) {
			var re = /\S+@\S+\.\S+/;
			return re.test(email);
}

authController.post("/signup", (req, res, next) => {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
  var username = req.body.email;
  var password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate email and password" });
    return;
  }

	if (validateEmail(username) == false) {
		res.render("auth/signup", { message: "Please input a valid email address" });
	}

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "Email already in use" });
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
			avatar: " "
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
    res.render("auth/stylist-signup", { message: "Indicate email and password" });
    return;
  }

	if (validateEmail(username) == false) {
		res.render("auth/stylist-signup", { message: "Please input a valid email address" });
	}

  Stylist.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/stylist-signup", { message: "The email already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);


    var newStylist = Stylist({
			firstName,
			lastName,
      username,
      password    : hashPass,
			role        : "Stylist",
			date        : new Date(),
			avatar      : " ",
			services    : " ",
			expertise   : ["Any"],
			languages   : [" "],
			description : " ",
			price       : " ",
			availability: " ",
      mobile      : ["Both"],
			distance		: 0,
			geolocation : {
			  type       : "Point",
			  coordinates: [0,10]
			},
			location    : "",
      reviews     : []
    });

    newStylist.save((err) => {
      if (err) {
				console.log(err);
        res.render("auth/stylist-signup", { message: "The username already exists" });
      } else {
        res.redirect("/stylist/profile");
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

authController.get('/auth/pinterest', passport.authenticate('pinterest'));

authController.get('/auth/pinterest/callback',
    passport.authenticate('pinterest', { failureRedirect: '/login' }),
    function(req, res) {
      console.log("success");
        // Successful authentication, redirect home.
        res.redirect('/profile');
    }
);

// authController.get('/stylist/auth/pinterest',
//     passport.authenticate('stylist-pinterest')
// );
//
// authController.get('/stylist/auth/pinterest/callback',
//     passport.authenticate('stylist-pinterest', { failureRedirect: '/login' }),
//     function(req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/profile');
//     }
// );


authController.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authController;
