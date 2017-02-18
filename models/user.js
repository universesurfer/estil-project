const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema({
  name        : {type: String, required: true},
  email       : {type: String, required: true},
  password    : {type: String, required: true},
  role        : {type: String, required: true},
  avatar      : String,
  appointments: {
    date   : Date,
    stylist: String
    // Schema.Types.ObjectId,
    // ref: 'Stylist'
  }
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;
