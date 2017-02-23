const express      = require('express');
const stylistProfile      = express.Router();
const Appointment  = require('../models/appointment');
const User         = require("../models/user");
const Stylist      = require("../models/stylist");
const Picture        = require('../models/picture');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const passport       = require("passport");
const ensureLogin    = require("connect-ensure-login");
const multer         = require('multer');
var upload           = multer({ dest: './public/uploads/' });
const mongoose = require('mongoose');

stylistProfile.get("/stylist/profile", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {
  Picture.findOne({"user": req.user.username, "profile": true}, {}, { sort: { 'created_at' : -1 } }, (err, picture)=>{
    if (err){
      console.log("Error finding photo");
    }

    Appointment.find({"stylist": req.user._id })
      .populate('user', 'firstName lastName username')
      .exec(function (err, appointments) {
        if (err) {
          console.log(err);
        } else {
          console.log('appointments', appointments);
          // console.log('user:', appointments[0].user);
          res.render("private/stylist-profile", { user: req.user, picture: picture, appointments: appointments});
        }
    });
  });
});


stylistProfile.get("/stylist/profile/edit", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {

  Picture.findOne({"user": req.user.username, "profile": true}, {}, { sort: { 'created_at' : -1 } }, (err, picture)=>{
    if (err){console.log("Error finding photo");}
    res.render("private/stylist-profile-edit", { user: req.user, picture: picture});
  });

});

stylistProfile.post("/stylist/profile/edit", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res, err) => {

  var userId = req.user._id;
	var stylist = {};

	//store main body of data from edit profile page
	for (var update in req.body) {
		if (req.body.hasOwnProperty(update) && req.body[update]) {
			stylist[update] = req.body[update];
		}
	}

	//store locations in correct format
	if (req.body.location) {
		stylist.geolocation = {type:'Point', coordinates: [req.body.lon, req.body.lat]};
		stylist.location = req.body.location;
	}

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


	//updating stylist info in DB
  Stylist.findOneAndUpdate({"_id": userId}, {$set: stylist}, (err,stylist)=> {
    if (err){
			console.log("error updating stylist");
			// console.log(err);
		}
  });

  res.redirect("/stylist/profile");
});

stylistProfile.post('/stylist/profile/photo-upload', upload.single('file'), function(req, res){

  pic = new Picture({
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
		user: req.user.username,
    profile: true
  });

  pic.save((err) => {
      res.redirect('/stylist/profile/edit');
  });
});

stylistProfile.get('/stylist/profile/portfolio', ensureLogin.ensureLoggedIn("/stylist/login"), function(req,res) {
	Picture.find({"user" : req.user.username},(err, pictures) => {
		res.render('private/stylist-portfolio', {pictures})
	})
})

stylistProfile.post('/stylist/profile/portfolio/upload', upload.single('file'), function(req, res){

  pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
		user: req.user.username
  });

  pic.save((err) => {
      res.redirect('/stylist/profile/portfolio');
  });
});



module.exports = stylistProfile;
