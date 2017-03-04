const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const stylistSchema = new Schema({
	firstName   : {type: String, required: true},
  lastName    : {type: String, required: true},
  username    : {type: String, required: true},
  password    : {type: String, required: true},
  role        : {type: String, required: true},
  avatar      : String,
	services 		: [String],
  expertise   : { type: String,
    enum: ['Men', 'Women', 'Any'],
    default: ['Any'] },
	languages		: [String],
	description : String,
  price       : String,
  availability: [String],
  mobile      : {type: String,
    enum : ['Home visit', 'Salon', 'Both'],
    default : ['Both']
	},
	distance: Number,
  geolocation  : {type: {type: String}, coordinates: [Number]},
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


stylistSchema.plugin(findOrCreate);
stylistSchema.index({geolocation: '2dsphere'});
stylistSchema.set('timestamps', true);

const Stylist = mongoose.model('Stylist', stylistSchema);

module.exports = Stylist;
