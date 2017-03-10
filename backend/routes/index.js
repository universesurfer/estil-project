var express = require('express');
var router = express.Router();
const mongoose			 = require('mongoose');
const User           = require("../models/user");
var Stylist = require('../models/stylist.js');

router.get("/api/search", (req, res)=> {
	Stylist.find({}, (err, allStylists) => {
		mapInfo = {};
		allStylists.forEach(function(stylist, index){
			mapInfo["prop" + index] = stylist;
		});
		res.json(mapInfo);
	});

});

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
