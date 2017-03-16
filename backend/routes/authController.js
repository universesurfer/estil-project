const express        = require('express');
const authController = express.Router();

const jwt 					 = require('jsonwebtoken');
const jwtOptions 		 = require('../config/jwtOptions');

const passport   		 = require("passport");
const mongoose			 = require('mongoose');

// Our user and stylist models
const User           = require("../models/user");
const Stylist        = require("../models/stylist");

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

function validateEmail(email) {
			var re = /\S+@\S+\.\S+/;
			return re.test(email);
}

authController.post("/signup", (req, res, next) => {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
  var username = req.body.username;
  var password = req.body.password;
	var avatar = '';
	var board = '';

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

	// if (validateEmail(username) == false) {
	// 	res.status(400).json({ message: "Please input a valid email address" });
	// }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }
    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
			firstName,
			lastName,
      username,
      password: hashPass,
			avatar,
			board
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
				var payload = {id: user._id};
        console.log('user', user);
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({message: "ok", token: token});
      }
    });
  });
});

authController.post("/stylist/signup", (req, res, next) => {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
  var username = req.body.username;
  var password = req.body.password;
	var location = req.body.location;
	var avatar = '';
	var board = '';

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

	// if (validateEmail(username) == false) {
	// 	res.status(400).json({ message: "Please input a valid email address" });
	// 	return;
	// }

  Stylist.findOne({ username }, "username", (err, stylist) => {
    if (stylist !== null) {
			res.status(400).json({ message: "The email already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newStylist = Stylist({
			firstName,
			lastName,
      username,
      password: hashPass,
			location,
      resume_path: "",
      resume_name: "",
			avatar,
			board
    });

		newStylist.save((err, stylist) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
				var payload = {id: stylist._id};
        console.log('stylist', stylist);
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({message: "ok", token: token});
      }
    });
  });
});

authController.post("/login", function(req, res) {
	if(req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
  }

  if (username === "" || password === "") {
    res.status(401).json({message:"fill up the fields"});
    return;
  }

	if (req.body.role == "user") {
		var MongooseCollection = User;
	}
	else if (req.body.role == "stylist") {
		var MongooseCollection = Stylist;
	}

	MongooseCollection.findOne({ "username": username }, (err, user)=> {

  	if( ! user ){
	    res.json({message:"no such user found"});
	  } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (!isMatch) {
          res.json({message:"passwords did not match"});
        } else {
          var payload = {id: user._id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({message: "ok", token: token, user: user, role: req.body.role});
        }
      });
    }
  })
});

module.exports = authController;
