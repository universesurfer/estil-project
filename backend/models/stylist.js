const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const stylistSchema = new Schema({
	firstName   : {type: String, required: true},
  lastName    : {type: String, required: true},
  username    : {type: String, required: true},
  password    : {type: String},
  role        : {type: String, enum: ['Stylist', 'Admin'], default: 'Stylist'},
	resume_path : String,
	resume_name	: String,
  avatar      : String,
	services 		: [String],
  expertise   : [String],
	languages		: [String],
	description : String,
  price       : String,
  availability: [String],
  mobile      : [String],
	distance		: Number,
	marker			: {String},
  geolocation  : {type: {type: String}, coordinates: { type: []}},
	location: String,
  reviews :
    [{
        userId  : {type: Schema.Types.ObjectId, ref: 'User'},
        name    : String,
        comment : String,
        stars   : Number,
        date    : Date
    }]
});

stylistSchema.index({geolocation: '2dsphere'});
stylistSchema.set('timestamps', true);

const Stylist = mongoose.model('Stylist', stylistSchema);

module.exports = Stylist;
