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
			languages   : " ",
			description : " ",
			price       : " ",
			availability: " ",
      mobile      : ["Both"],
			distance		: 0,
			geolocation : {
			  type       : "Point",
			  coordinates: [0,90]
			},
			location    : "",
      reviews     : [
        {
            name    : "",
            comment : "",
            stars   : 0,
            date    : new Date()
        }]
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
    if (err){
      console.log("Error finding photo");
    }
  Appointment.findOne({"user": req.user._id}, (err, appointment)=>{
    if (err){
      console.log("Error finding appointment");
    }
    console.log("found app:" + appointment);
    res.render("private/profile", { user: req.user, picture: picture, appointment: appointment });
    });
  });
});

authController.get("/stylist/profile", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {
	Picture.findOne({"user": req.user.username, "profile": true}, (err, picture)=>{
    if (err){console.log("Error finding photo");}
    res.render("private/stylist-profile", { user: req.user, picture: picture});
  });
});

authController.get("/profile/edit", ensureLogin.ensureLoggedIn(), (req, res) => {
  Picture.findOne({"user": req.user.username, "profile": true}, (err, picture)=>{
    if (err){console.log("Error finding photo");}
    res.render("private/profile-edit", { user: req.user, picture: picture});
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

authController.get("/stylist/profile/edit", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {

  Picture.findOne({"user": req.user.username, "profile": true}, (err, picture)=>{
    if (err){console.log("Error finding photo");}
    res.render("private/stylist-profile-edit", { user: req.user, picture: picture});
  });

});

authController.post("/stylist/profile/edit", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res, err) => {

  var userId = req.user._id;

	//store main body of data from edit profile page
  var stylist = req.body;

	//store locations in correct format
	stylist.geolocation = {type:'Point', coordinates: [req.body.lon, req.body.lat]};
	stylist.location = req.body.location;

	//reformatting checklists
	stylist.services = [];
	stylist.availability = [];

	function updateParam(bodyParam,property) {
		if (req.body[bodyParam]) {
			stylist[property].push(req.body[bodyParam])
		}
		delete stylist[bodyParam];
	}

	updateParam("cut","services");
	updateParam("blowdry","services");
	updateParam("color","services");
	updateParam("monday","availability");
	updateParam("tuesday","availability");
	updateParam("wednesday","availability");
	updateParam("thursday","availability");
	updateParam("friday","availability");
	updateParam("saturday","availability");
	updateParam("sunday","availability");

	//building price algorithms
	stylist.priceList = [];

	function buildPrice(bodyParam,property,multiplier) {
		if (req.body[bodyParam]) {
			var stylePriceIndex = Number(req.body[bodyParam]) * multiplier;
			stylist[property].push(stylePriceIndex);
		}
		delete stylist[bodyParam];
	}

	buildPrice("cutPrice","priceList",4);
	buildPrice("blowdryPrice","priceList",2.75);
	buildPrice("colorPrice","priceList",1);

	var numberOfPrices = stylist.priceList.length;

	//if price information has been inputted by the stylist, then we can build a price using an algorithm, as below
	if (numberOfPrices > 0) {
		var total = 0;
		for (var i = 0; i < numberOfPrices; i++){
			total += stylist.priceList[i];
		}
		var stylistPriceIndex = total / numberOfPrices;

		if (stylistPriceIndex < 50) {
			stylist.price = "€";
		}
		else if (stylistPriceIndex >= 50 && stylistPriceIndex < 75) {
			stylist.price = "€€";
		}
		else if (stylistPriceIndex >=75 ){
			stylist.price = "€€€";
		}
	}





	console.log(stylist["priceList"]);

	//updating stylist info in DB
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
