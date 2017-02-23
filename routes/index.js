var express = require('express');
var router = express.Router();
var Stylist = require('../models/stylist.js');
const Picture = require('../models/picture.js');
const ensureLogin = require("connect-ensure-login");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });
const Appointment    = require('../models/appointment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

router.get('/search', (req, res)=> {
	res.render('search');
});

router.post("/api/search", (req, res)=> {
	Stylist.find({}, (err, allStylists) => {
		mapInfo = {};
		allStylists.forEach(function(stylist, index){
			mapInfo["prop" + index] = stylist;
		});
		res.json(mapInfo);
	});

});

router.get("/api/appointments", (req,res) => {
  Appointment.find({},(err,allAppointments) => {
    res.json(allAppointments);
  });
});

router.post("/api/appointmentreturned", (req,res) => {
  console.log(req.body.accept);
  Appointment.findOneAndUpdate({"_id": req.body.accept}, {$set: {accept: true}}, (err,allAppointments) => {
    res.json(allAppointments);
  });
});

router.get('/view-stylist/:id', function(req,res) {

	var dotAt = req.params.id.indexOf(".");
	var firstName = req.params.id.substring(0,dotAt);
	var lastName = req.params.id.substring(dotAt+1);

	//searching by first and last name, will have a problem if two users have the exact same name,
	//would create unique usernames in the future to use in the public profile URL
	Stylist.findOne({"firstName":firstName, "lastName":lastName},(err,stylist) => {
		var URLId = req.params.id;
		res.render('stylist-public',{URLId, stylist});
	});

});

router.post('/view-stylist/:id', ensureLogin.ensureLoggedIn("/login"), function(req,res) {
	var dotAt = req.params.id.indexOf(".");
	var firstName = req.params.id.substring(0,dotAt);
	var lastName = req.params.id.substring(dotAt+1);
  var userId = req.user.id;
  console.log("userId: ", userId);
  console.log("req.body: ", req.body);
  let date = new Date(req.body.dateTime);
  console.log("ISO date: ", date);
	//searching by first and last name, will have a problem if two users have the exact same name,
	//would create unique usernames in the future to use in the public profile URL
	Stylist.findOne({"firstName":firstName, "lastName":lastName},(err,stylist) => {
		var URLId = req.params.id;
    console.log("stylistId: ",stylist._id);

    let newApp = new Appointment({
      date      : date,
      startTime : date,
      endTime   : date,
      stylist   : {"_id" : stylist._id},
      user      : {"_id" : userId},
      completed : false,
      accept    : false
    });

    newApp.save((err)=> {
      if (err){
        console.log("error saving appointment");
      }
    });
		res.render('stylist-public',{URLId, stylist});
	});

});

router.get('/view-stylist/:id/portfolio', function(req,res) {
	var dotAt = req.params.id.indexOf(".");
	var firstName = req.params.id.substring(0,dotAt);
	var lastName = req.params.id.substring(dotAt+1);

	var stylistUsername, URLId = req.params.id;

	Stylist.findOne({"firstName":firstName, "lastName":lastName},{"username": 1},(err,stylist) => {
		stylistUsername = stylist.username;
		Picture.find({"user" : stylistUsername}, (err, pictures) => {
			res.render('stylist-public-portfolio', {URLId, pictures});
		});
	});
});



module.exports = router;
