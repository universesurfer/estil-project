const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const appointmentSchema = new Schema({
  date            : Date,
  startTime       : String,
  stylist         : {type: Schema.Types.ObjectId, ref: 'Stylist'},
  stylistName     : String,
  user            : {type: Schema.Types.ObjectId, ref: 'User'},
  userName        : String,
  completed       : {type: Boolean, default: false},
  accept          : {type: Boolean, default: false}
  // request  : String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
