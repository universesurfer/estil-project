var express = require('express');
var router = express.Router();
const mongoose			 = require('mongoose');
const User           = require("../models/user");
var Stylist = require('../models/stylist.js');

router.post("/api/search", (req, res)=> {
	console.log(req.body);
	var distances = [];
	var mapInfo = {};

	Stylist.geoNear( req.body,
		{ spherical : true,
		 	maxDistance: 50,
			distanceMultiplier: 6378.1
		}, function(err, results, stats) {
	    if (err) {
	        console.log(err);
	    } else {
	        console.log(results);
	    }
	}).then(function(err, results) {
			console.log("results", results);

			// process.exit();
		});

	Stylist.find({}, (err, allStylists) => {
		mapInfo = {};
		allStylists.forEach(function(stylist, index){
			mapInfo["prop" + index] = stylist;
		});
		res.json(mapInfo);
	});
});


// results.forEach(function(stylist,index){
// 	// distances.push(stylist.dis);
// 	console.log("stylist",stylist);
// 	mapInfo["prop" + index] = stylist.obj;
// 	mapInfo["prop" + index].distanceFromLocation = stylist.dis;
//
// });
//
// // mapInfo.prop4.test = "test";
//
// console.log("mapInfo",mapInfo);
// res.json(mapInfo);


		// for (var stylist in mapInfo) {
		// 	var i = Object.keys(mapInfo).indexOf(stylist)
		// 	mapInfo[stylist].distanceFromLocation = distances[i];
		// 	console.log(distances[i]);
		// }
		// console.log(distances);
		//
		// Stylist.find({}, (err, allStylists) => {
		// 	var mapInfo = {};
		// 	allStylists.forEach(function(stylist, index){
		// 		mapInfo["prop" + index] = stylist;
		// 		mapInfo["prop" + index].distanceFromLocation = distances[index];
		// 		console.log(mapInfo);
		// 	});
		// 	res.json(mapInfo);
		// });





router.post("/api/list-by-location", (req, res)=> {
	Stylist.where('geolocation')
		.near({ center: { coordinates: req.body, type: 'Point' }, maxDistance: 1000 })
		.find({},(error, stylists) => {
		if (error) {
			res.status(500).json({message: error});
		} else {
			res.json(stylists);
		}
	});
});

router.get('/profile/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  User.findById(req.params.id, (err, User) => {
      if (err) {
        return res.send(err);
      }
      return res.json(User);
    });
});

router.put('/profile/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  User.findById({"_id" : req.params.id}, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username
  }, (err,user) => {
    if (err) {
      return res.send(err);
    }
    return res.json({
      message: 'User updated successfully'
    });
  });
})


module.exports = router;
