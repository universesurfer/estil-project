var express          = require('express');
var router           = express.Router();
const mongoose			 = require('mongoose');
const User           = require("../models/user");
const Stylist        = require('../models/stylist');
const Appointment    = require('../models/appointment');
const upload         = require('../config/multer');


router.get('/', function(req, res, next) {
  res.send('Backend of Estil');
});


router.post("/api/appointment", (req,res) => {

  User.findById(req.body.user, (err,user) => {
    let userName = user.firstName + " " + user.lastName;

    let newAppointment = new Appointment({
      stylist: req.body.stylist,
      stylistName: req.body.stylistName,
      user: req.body.user,
      userName: userName,
      date: req.body.date,
      startTime: req.body.startTime
    });

    console.log(newAppointment);

    newAppointment.save((err)=> {
      if (err){
        console.log("error saving appointment");
      }
      else {
        console.log("test");
        res.json({"message": "appointment saved"});
      }
    });
  })

})

router.post("/api/search", (req, res)=> {
	Stylist.geoNear(
    // {type: "Point", coordinates: req.body.location},
    req.body.location,
		{ spherical : true,
		 	maxDistance: 0.0015678896,		//1km is 1/6378
			distanceMultiplier: 6378.1
		}, function(err, results, stats) {
	    if (err) {
	        console.log(err);
	    } else {
        console.log("results",results);
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
    } else {
      if (req.params.role == "stylist") {
        Appointment.find({"stylist": user._id}, (err , app) => {
          if (err) {
            return res.send(err);
          }
          else {
          return res.json({user, app});
          }
        })
      } else if (req.params.role == "user"){
        Appointment.find({"user": user._id}, (err , app) => {
          if (err) {
            return res.send(err);
          }
          else {
          return res.json({user, app});
          }
        })
        }
      }
    })
});


router.put('/profile/:role/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  };

  if (req.params.role == "user") {
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
  }
  else if (req.params.role == "stylist") {

    if (req.body.lng != null && req.body.lat != null) {
      Stylist.findByIdAndUpdate(req.params.id, {
        location: req.body.location,
        geolocation  : {type: "Point", coordinates: [req.body.lng,req.body.lat]}
      }, (err,user) => {
        if (err) {
          return res.send(err);
        }
        return res.json({
          message: 'User updated successfully'
        });
      });
    }

    else {
      console.log(req.body.price);

      Stylist.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      availability: req.body.availability,
      price: req.body.price,
      languages: req.body.languages,
      services: req.body.services,
      board: req.body.board
      }, (err,user) => {
        if (err) {
          return res.send(err);
        }
        return res.json({
          message: 'User updated successfully'
        });
      });
    }

  }
})


router.post('/profile/:role/:id', upload.single('file'), (req, res, next) => {

  var id = req.params.id;

  if (req.params.role == "user") {
    var MongooseCollection = User;
  }
  else if (req.params.role == "stylist") {
    var MongooseCollection = Stylist;
  }

  console.log(req.file);

  let image = {
    avatar: `http://localhost:3000/uploads/${req.file.filename}`
  };

  MongooseCollection.findByIdAndUpdate(id, image, (err, user)=>{
    if (err) {
      next(err)
    } else {
      console.log("response", user);
      res.json(user);
    }
  });
});



module.exports = router;
