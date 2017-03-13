var express          = require('express');
var router           = express.Router();
const mongoose			 = require('mongoose');
const User           = require("../models/user");
const Stylist        = require('../models/stylist');
const upload         = require('../config/multer');


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

router.get('/profile/:role/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  if (req.params.role == "user") {
    var MongooseCollection = User;
  }
  else if (req.params.role == "stylist") {
    var MongooseCollection = Stylist;
  }

  MongooseCollection.findById(req.params.id, (err, user) => {
      if (err) {
        return res.send(err);
      }
      return res.json(user);
    });
});

router.put('/profile/:role/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  };

  if (req.params.role == "user") {
    var MongooseCollection = User;
  }
  else if (req.params.role == "stylist") {
    var MongooseCollection = Stylist;
  }

  MongooseCollection.findByIdAndUpdate(req.params.id, {
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

router.post('/profile/:role/:id', upload.single('avatar'), (req, res, next) => {
  var id = req.params.id;
  console.log('inside the router.post')

  if (req.params.role == "user") {
    var MongooseCollection = User;
  }
  else if (req.params.role == "stylist") {
    var MongooseCollection = Stylist;
  }

  let userToUpdate = {
    image:  `http://localhost:3000/public/uploads/${req.file.filename}`
  };

  MongooseCollection.findByIdAndUpdate(id, userToUpdate, (err, user)=>{
    if (err) {
      console.log("error, could not update User-Avatar");
      next(err)
    } else {

      console.log("Worked out fine");
      res.json(user);
    }
  });
});



module.exports = router;
