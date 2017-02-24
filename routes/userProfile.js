const express      = require('express');
const userProfile      = express.Router();
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

userProfile.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  Picture.findOne({"user": req.user.username, "profile": true}, {}, { sort: { 'created_at' : -1 } }, (err, picture)=>{
    if (err){
      console.log("Error finding photo");
    }
    // console.log(picture);
    Appointment.find({"user": req.user._id })
      .populate('stylist', 'username reviews firstName lastName')
      .exec(function (err, appointments) {
        if (err) {
          console.log(err);
        } else {
          // console.log('appointments', appointments);
					// console.log(appointments[0].stylist.reviews);
          // console.log('revs', appointments[0].stylist.reviews);
          res.render("private/profile", { user: req.user, picture: picture, appointments: appointments});
        }
      });
  });
});

userProfile.get("/profile/edit", ensureLogin.ensureLoggedIn(), (req, res) => {
  Picture.findOne({"user": req.user.username, "profile": true}, {}, { sort: { 'created_at' : -1 } }, (err, picture)=>{
    if (err){
      console.log("Error finding photo");
    }
    Appointment.find({"user": req.user._id })
      .populate('stylist', 'username reviews firstName lastName')
      .exec(function (err, appointments) {
        if (err) {
          console.log(err);
        } else {
          res.render("private/profile-edit", { user: req.user, picture: picture, appointments: appointments});
        }
    });
  });
});

userProfile.post("/profile/edit", ensureLogin.ensureLoggedIn(), (req, res, err) => {

  var userId = req.user._id;
  var userUpdated = {
    firstName : req.body.firstName,
    lastName  : req.body.lastName,
    username  : req.body.username
  };
  var review = {
    userId  : {"_id" : req.user._id},
    name    : req.user.firstName,
    comment : req.body.review,
    stars   : req.body.stars,
    date    : new Date()
  };
  console.log("review: ",review);
  User.update({"_id": userId}, {$set: userUpdated}, (err, user)=> {
    if (err){console.log("error updating user");}
  });
  Stylist.findOneAndUpdate({"username": req.body.stylistName },
   {$push : {reviews: {
     userId  : {"_id" : req.user._id},
     name    : req.user.firstName,
     comment : req.body.review,
     stars   : req.body.stars,
     date    : new Date()
   }
  }}, (err, user)=> {
    if (err){console.log("error updating user");}

  });
  res.redirect("/profile");
});

userProfile.post('/profile/photo-upload', upload.single('file'), function(req, res){

  pic = new Picture({
    // name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
		user: req.user.username,
    profile: true
  });

	console.log(req.user.username);

  pic.save((err) => {
      res.redirect('/profile/edit');
  });
});

userProfile.get('/profile/pictures', ensureLogin.ensureLoggedIn("/login"), function(req,res) {
	Picture.find({"user" : req.user.username},(err, pictures) => {
		res.render('private/profile-pictures', {pictures})
	})
})

userProfile.post('/profile/pictures/upload', upload.single('file'), function(req, res){

  pic = new Picture({
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
		user: req.user.username
  });

  pic.save((err) => {
      res.redirect('/profile/pictures');
  });
});

module.exports = userProfile;
