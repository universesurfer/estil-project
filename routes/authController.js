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
			avatar: " ",
			appointments: new Date(),
      reviews: [" "]
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
      password: hashPass,
			role: "Stylist",
			date: new Date(),
			avatar: " ",
			services: " ",
			expertise: ["Both"],
			languages: " ",
			description: " ",
			price: " ",
			availability: " ",
      mobile: ["Both"],
			geolocation: {
			  type: "Point",
			  coordinates: [90,0]
			},
			location: ""
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

authController.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  Picture.findOne({"user": req.user.username, "profile": true}, (err, picture)=>{
    if (err){console.log("Error finding photo");}
    res.render("private/profile", { user: req.user, picture: picture});
  });
});

authController.get("/stylist/profile", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {

  res.render("private/stylist-profile", { user: req.user });
});

authController.get("/profile/edit", ensureLogin.ensureLoggedIn(), (req, res) => {
  Picture.findOne({"user": req.user.username, "profile": true}, (err, picture)=>{
    if (err){console.log("Error finding photo");}
    res.render("private/profile-edit", { user: req.user, picture: picture});
  });
});

authController.get("/stylist/profile/edit", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {

  Picture.findOne({"user": req.user.username, "profile": true}, (err, picture)=>{
    if (err){console.log("Error finding photo");}
    res.render("private/stylist-profile-edit", { user: req.user, picture: picture});
  });

});

authController.post("/profile/edit", ensureLogin.ensureLoggedIn(), (req, res, err) => {

  var userId = req.user._id;
  var userUpdated = req.body;
  console.log(userUpdated);
  var review = req.body.review;
  console.log(review);

  User.update({"_id": userId}, {$set: userUpdated}, (err, user)=> {
    if (err){console.log("error updating user");}
  });
  User.update({"_id": userId}, {$push: {reviews: [review]}}, (err, user)=> {
    if (err){console.log("error updating user");}
    res.redirect("/profile");
  });
});

authController.post('/profile/photo-upload', upload.single('file'), function(req, res){

  pic = new Picture({
    // name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
		user: req.user.username,
    profile: true
  });

	console.log(req.user.username);

  pic.save((err) => {
      res.redirect('/profile/edit');
  });
});


authController.post("/stylist/profile/edit", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res, err) => {

  var userId = req.user._id;
  var stylist = req.body;

	stylist.geolocation = {type:'Point', coordinates: [req.body.lon, req.body.lat]};

  Stylist.findOneAndUpdate({"_id": userId}, {$set: stylist}, (err)=> {
    if (err){console.log("error updating stylist");}
  });

  res.redirect("/stylist/profile");
});

authController.post('/stylist/profile/photo-upload', upload.single('file'), function(req, res){

  pic = new Picture({
    // name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
		user: req.user.username,
    profile: true
  });

  pic.save((err) => {
      res.redirect('/stylist/profile/edit');
  });
});



authController.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authController;
