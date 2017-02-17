const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const stylistSchema = new Schema({
  name        : {type: String, required: true},
  email       : {type: String, required: true},
  password    : {type: String, required: true},
  role        : {type: String, required: true},
  appointments: {
    date   : Date,
    users  : Schema.Types.ObjectId, ref: 'User'
  },
  avatar      : String,
  experience  : String,
  expertise   : {type: String, enum : ['Male', 'Female', 'Any']},
  price       : { type: Number, default: null },
  availability: String,
  location    : String
});

stylistSchema.index({location: '2dsphere'});
stylistSchema.set('timestamps', true);

const Stylist = mongoose.models('Stylist', stylistSchema);

module.exports = Stylist;
