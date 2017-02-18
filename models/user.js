const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema({
	firstName   : {type: String, required: true},
  lastName    : {type: String, required: true},
  username    : {type: String, required: true},
  password    : {type: String, required: true},
  role        : {type: String, required: true},
  avatar      : String,
  appointments: {
    date   : Date,
<<<<<<< HEAD
    stylist: String
    // Schema.Types.ObjectId,
    // ref: 'Stylist'
=======
    stylist: {type: Schema.Types.ObjectId, ref: 'Stylist'}
>>>>>>> master
  }
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;
