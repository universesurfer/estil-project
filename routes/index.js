var express = require('express');
var router = express.Router();
var Stylist = require('../models/stylist.js');
const Picture = require('../models/picture.js');
const ensureLogin = require("connect-ensure-login");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });



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
		})
		res.json(mapInfo);
	})

})

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

router.post('/view-stylist/:id/book', (req, res)=>{
	console.log("sent");
  res.redirect("/profile");
});

module.exports = router;
