const mongoose = require('mongoose');
const User = require('../models/user');
const Stylist = require('../models/stylist');
mongoose.connect('mongodb://localhost/estil');

// const users = [
//   {
//     firstName   : 'Cara',
// 		lastName    : 'Delevigne',
//     username    : "cara@i.com",
//     password    : '1234',
//     role        : 'User',
//     avatar      : ' ',
//     appointments: {
//       date : new Date()
//     }
//   },
//   {
//     firstName   : 'Tasha',
// 		lastName    : 'Romasha',
//     username    : 'tasha@cool.com',
//     password    : '2345',
//     role        : 'User',
//     avatar      : ' ',
//     appointments: {
//       date : new Date()
//     }
//   },
//   {
//     firstName   : 'Mika',
// 		lastName    : 'Thasika',
//     username    : 'mika@yell.com',
//     password    : '3456',
//     role        : 'User',
//     avatar      : ' ',
//     appointments: {
//       date : new Date()
//     }
// 	}
// ];
//
// const stylists = [
//   {
//     firstName   : 'Harry',
// 		lastName    : 'Potter',
//     username    : 'harry@potter.co',
//     password    : 'abcd',
//     role        : 'Stylist',
//     appointments: {
//       date : new Date()
//     },
//     avatar			: ' ',
// 		services		: ' ',
// 		expertise   : 'Any',
// 		language		: ' ',
//     description : ' ',
//     price       : ' ',
//     availability: ' ',
//     location    : 'Via Augusta, 92'
//   },
//   {
//     firstName   : 'Hermione',
// 		lastName    : 'Granger',
//     username    : 'hermione@granger.co.uk',
//     password    : 'abcd',
//     role        : 'Stylist',
//     appointments: {
//       date : new Date()
//     },
// 		avatar			: ' ',
// 		services		: ' ',
// 		expertise   : 'Any',
// 		language		: ' ',
//     description : ' ',
//     price       : ' ',
//     availability: ' ',
//     location    : 'Carrer de lAtlàntida, 53, 08003 Barcelona'
//   },
// ];

const appointment = [
  {
    date     : new Date(),
    stylist  : {type: Schema.Types.ObjectId, ref: 'Stylist'},
    user     : {type: Schema.Types.ObjectId, ref: 'User'},
    completed: true
  },
];

Appointment.create(appointments, (err, docs)=> {
  if (err){
		throw(err);}

  docs.forEach( (appointment)=>{
    console.log(appointments._id);
  });
  mongoose.connection.close();
});


// User.create(users, (err, docs)=> {
// 	console.log(users.username);
//   if (err){
// 		throw(err);}
//
//   docs.forEach( (user)=>{
//   })
//   mongoose.connection.close();
// });

// Stylist.create(stylists, (err, docs)=> {
// 	console.log(stylists.username);
//   if (err){
// 		throw(err);}
//
//   docs.forEach( (stylist)=>{
//   })
//   mongoose.connection.close();
// });
