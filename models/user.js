const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema({
	firstName   : {type: String, required: true},
  lastName    : {type: String, required: true},
  username    : {type: String, required: true},
  password    : {type: String, required: true},
  role        : {type: String, required: true,
    enum: ['User', 'Stylist'],
    default: 'User'},
  avatar      : String,
  appointments: {
    date   : Date,
    stylist: {type: Schema.Types.ObjectId, ref: 'Stylist'}
  }
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;
