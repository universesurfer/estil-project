const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const stylistSchema = new Schema({
	firstName   : {type: String, required: true},
  lastName    : {type: String, required: true},
  username    : {type: String, required: true},
  password    : {type: String, required: true},
  role        : {type: String, required: true},
  appointments: {
    date  : Date,
    user  : {type: Schema.Types.ObjectId, ref: 'User'}
  },
  avatar      : String,
	services 		: String,
  expertise   : String,
	language		: String,
	description : String,
  price       : String,
  availability: String,
  location    : String
});

stylistSchema.index({location: '2dsphere'});
stylistSchema.set('timestamps', true);

const Stylist = mongoose.model('Stylist', stylistSchema);

module.exports = Stylist;
