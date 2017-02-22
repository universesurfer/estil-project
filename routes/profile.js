// const express      = require('express');
// const profile      = express.Router();
// const Appointment  = require('../models/appointment');
// const User         = require("../models/user");
// const Stylist      = require("../models/stylist");
// const Picture        = require('../models/picture');
// const bcrypt         = require("bcrypt");
// const bcryptSalt     = 10;
// const passport       = require("passport");
// const ensureLogin    = require("connect-ensure-login");
// const multer         = require('multer');
// var upload           = multer({ dest: './public/uploads/' });
//
// /* GET users listing. */
// // r.get('/', function(req, res, next) {
// //   res.send('respond with a resource');
// // });
//
//
//
//
//
//
// profile.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
//   Picture.findOne({"user": req.user.username, "profile": true}, (err, picture)=>{
//     if (err){
//       console.log("Error finding photo");
//     } return;
//   Appointment.findOne({"user": req.user._id}, (err, appointment)=>{
//     if (err){
//       console.log("Error finding appointment");
//     }
//   res.render("private/profile", { user: req.user, picture: picture, appointment: appointment});
//     });
//   });
// });
//
// profile.get("/stylist/profile", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {
//
//   res.render("private/stylist-profile", { user: req.user });
// });
//
// profile.get("/profile/edit", ensureLogin.ensureLoggedIn(), (req, res) => {
//   Picture.findOne({"user": req.user.username, "profile": true}, (err, picture)=>{
//     if (err){console.log("Error finding photo");}
//     res.render("private/profile-edit", { user: req.user, picture: picture});
//   });
// });
//
// profile.get("/stylist/profile/edit", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res) => {
//   Picture.findOne({"user": req.user.username, "profile": true}, (err, picture)=>{
//     if (err){console.log("Error finding photo");}
//     res.render("private/stylist-profile-edit", { user: req.user, picture: picture});
//   });
// });
//
// profile.post("/profile/edit", ensureLogin.ensureLoggedIn(), (req, res, err) => {
//
//   var userId = req.user._id;
//   var userUpdated = req.body;
//   console.log(userUpdated);
//   var review = req.body.review;
//   console.log(review);
//
//   User.update({"_id": userId}, {$set: userUpdated}, (err, user)=> {
//     if (err){console.log("error updating user");}
//   });
//   User.update({"_id": userId}, {$push: {reviews: [review]}}, (err, user)=> {
//     if (err){console.log("error updating user");}
//     res.redirect("/profile");
//   });
// });
//
// profile.post('/profile/photo-upload', upload.single('file'), function(req, res){
//
//   pic = new Picture({
//     // name: req.body.name,
//     pic_path: `/uploads/${req.file.filename}`,
//     pic_name: req.file.originalname,
// 		user: req.user.username,
//     profile: true
//   });
//
// 	console.log(req.user.username);
//
//   pic.save((err) => {
//       res.redirect('/profile/edit');
//   });
// });
//
//
// profile.post("/stylist/profile/edit", ensureLogin.ensureLoggedIn("/stylist/login"), (req, res, err) => {
//
//   var userId = req.user._id;
//   var stylist = req.body;
//
//   Stylist.findOneAndUpdate({"_id": userId}, {$set: stylist}, (err)=> {
//     if (err){console.log("error updating stylist");}
//   });
//
//   res.redirect("/stylist/profile");
// });
//
// profile.post('/stylist/profile/photo-upload', upload.single('file'), function(req, res){
//
//   pic = new Picture({
//     // name: req.body.name,
//     pic_path: `/uploads/${req.file.filename}`,
//     pic_name: req.file.originalname,
// 		user: req.user.username,
//     profile: true
//   });
//
//   pic.save((err) => {
//       res.redirect('/stylist/profile/edit');
//   });
// });
//
//
//
// module.exports = profile;
