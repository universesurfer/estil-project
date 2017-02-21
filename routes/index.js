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

router.get("/api/locations", (req, res)=> {
	Stylist.find({},"geolocation", (err, allStylists) => {
		locations = {};
		allStylists.forEach(function(stylist, index){
			locations["prop" + index] = stylist.geolocation.coordinates;
		})
	})
	res.json(locations);
})

router.post('/search/results',(req, res, next) => {
  Stylist.find((error, places) => {
    if (error) { next(error); }
    else {
      res.json(places);
    }
  })
})

router.get('/profile/pictures', ensureLogin.ensureLoggedIn("/login"), function(req,res) {
	Picture.find({"user" : req.user.username},(err, pictures) => {
		console.log(pictures);
		res.render('private/profile-pictures', {pictures})
	})
})

router.post('/profile/pictures/upload', upload.single('file'), function(req, res){

  pic = new Picture({
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
		user: req.user.username
  });

	console.log(req.user.username);

  pic.save((err) => {
      res.redirect('/profile/pictures');
  });
});

router.get('/stylist/profile/portfolio', ensureLogin.ensureLoggedIn("/stylist/login"), function(req,res) {
	Picture.find({"user" : req.user.username},(err, pictures) => {
		console.log(pictures);
		res.render('private/stylist-portfolio', {pictures})
	})
})

router.post('/stylist/profile/portfolio/upload', upload.single('file'), function(req, res){

  pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
		user: req.user.username
  });

	console.log(req.user.username);

  pic.save((err) => {
      res.redirect('/stylist/profile/portfolio');
  });
});


module.exports = router;
