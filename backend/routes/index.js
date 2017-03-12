var express          = require('express');
var router           = express.Router();
const mongoose			 = require('mongoose');
const User           = require("../models/user");
const Stylist        = require('../models/stylist');


router.get('/', function(req, res, next) {
  res.send('Backend of Estil');
});


router.post("/api/search", (req, res)=> {
	Stylist.geoNear( req.body,
		{ spherical : true,
		 	maxDistance: 0.0015678896,		//1km is 1/6378
			distanceMultiplier: 6378.1
		}, function(err, results, stats) {
	    if (err) {
	        console.log(err);
	    } else {
				res.json(results);
	    }
	})
});

router.get('/profile/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  User.findById(req.params.id, (err, user) => {
      if (err) {
        return res.send(err);
      }
      return res.json(user);
    });
});

router.put('/profile/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  };

  User.findByIdAndUpdate(req.params.id, {
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
