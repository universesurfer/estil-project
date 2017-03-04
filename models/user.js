const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');


const userSchema = new Schema({
	firstName   : {type: String, required: true},
  lastName    : {type: String, required: true},
  username    : {type: String, required: true},
  password    : {type: String, required: true},
  role        : {type: String, required: true},

  avatar      : String,
});

userSchema.plugin(findOrCreate);
userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;
