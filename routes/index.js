var express = require('express');
var router = express.Router();
const mongoose			 = require('mongoose');
const User           = require("../models/user");

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

// router.put('/profile/:id', (req, res) => {
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ message: 'Specified id is not valid' });
//   }
//
//   User.findByIdAndUpdate(req.params.id, {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     username: req.body.username
//   }, (err) => {
//     if (err) {
//       return res.send(err);
//     }
//
//     return res.json({
//       message: 'User updated successfully'
//     });
//   });
// })

module.exports = router;
