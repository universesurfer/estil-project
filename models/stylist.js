const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const stylistSchema = new Schema({
	firstName   : {type: String, required: true},
  lastName    : {type: String, required: true},
  username    : {type: String, required: true},
  password    : {type: String, required: true},
  role        : {type: String, required: true},
  appointments: {
    date   : Date,
<<<<<<< HEAD
    users  : String
    // Schema.Types.ObjectId,
    // ref: 'User'
=======
    user  : {type: Schema.Types.ObjectId, ref: 'User'}
>>>>>>> master
  },
  avatar      : String,
  experience  : String,
  expertise   : {type: String, enum : ['Male', 'Female', 'Any']},
  price       : {type: Number, default: null },
  availability: String,
  location    : String
});

stylistSchema.index({location: '2dsphere'});
stylistSchema.set('timestamps', true);

const Stylist = mongoose.model('Stylist', stylistSchema);

module.exports = Stylist;
