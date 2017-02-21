const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const appointmentSchema = new Schema({
  date     : Date,
  stylist  : {type: Schema.Types.ObjectId, ref: 'Stylist'},
  user     : {type: Schema.Types.ObjectId, ref: 'User'},
  completed: {type: Boolean, default: false}
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
