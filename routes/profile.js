const express      = require('express');
const profile      = express.Router();
const Appointment  = require('../models/appointment');
const User         = require("../models/user");
const Stylist      = require("../models/stylist");

/* GET users listing. */
// r.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


Appointment.findOne({})
.populate('_user')
.exec(function (err, appointment) {
  if (err) return handleError(err);
  console.log('This appointment is for %s', appointment._user.username);
  // prints "The creator is Aaron"
});

module.exports = profile;
