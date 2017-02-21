const mongoose = require('mongoose');
const User = require('../models/user');
const Stylist = require('../models/stylist');
mongoose.connect('mongodb://localhost/estil');

const users = [
  {
    firstName   : 'Cara',
		lastName    : 'Delevigne',
    username    : "cara@i.com",
    password    : '1234',
    role        : 'User',
    avatar      : ' ',
    // appointments: {
    //   date : new Date()
    // }
  },
  {
    firstName   : 'Tasha',
		lastName    : 'Romasha',
    username    : 'tasha@cool.com',
    password    : '2345',
    role        : 'User',
    avatar      : ' ',
    // appointments: {
    //   date : new Date()
    // }
  },
  {
    firstName   : 'Mika',
		lastName    : 'Thasika',
    username    : 'mika@yell.com',
    password    : '3456',
    role        : 'User',
    avatar      : ' ',
    // appointments: {
    //   date : new Date()
    // }
	}
];

const stylists = [
  {
    firstName   : 'Harry',
		lastName    : 'Potter',
    username    : 'harry@potter.co',
    password    : 'abcd',
    role        : 'Stylist',
    // appointments: {
    //   date : new Date()
    // },
    avatar			: ' ',
		services		: ' ',
		expertise: ["Both"],
		languages: " ",
		description: " ",
		price: " ",
		availability: " ",
		mobile: ["Both"],
		geolocation: {
			type: "Point",
			coordinates: [10,10]
		},
    // location    : 'Via Augusta, 92'
  },
  {
    firstName   : 'Hermione',
		lastName    : 'Granger',
    username    : 'hermione@granger.co.uk',
    password    : 'abcd',
    role        : 'Stylist',
    // appointments: {
    //   date : new Date()
    // },
		avatar			: ' ',
		services		: ' ',
		expertise: ["Both"],
		languages: " ",
		description: " ",
		price: " ",
		availability: " ",
		mobile: ["Both"],
		geolocation: {
			type: "Point",
			coordinates: [20,20]
		},
    // location : 'Carrer de lAtlàntida, 53 08003, Barcelona'
  }
];

// const appointment = [
//   {
//     date     : new Date(),
//     stylist  : {type: Schema.Types.ObjectId, ref: 'Stylist'},
//     user     : {type: Schema.Types.ObjectId, ref: 'User'},
//     completed: true
//   },
// ];
//
// Appointment.create(appointments, (err, docs)=> {
//   if (err){
// 		throw(err);}
//
//   docs.forEach( (appointment)=>{
//     console.log(appointments._id);
//   });
//   mongoose.connection.close();
// });


User.create(users, (err, docs)=> {
  if (err){
		throw(err);}

  docs.forEach( (user)=>{
		console.log(user.username);
  })
  mongoose.connection.close();
});

Stylist.create(stylists, (err, docs)=> {
  if (err){
		throw(err);}

  docs.forEach( (stylist)=>{
		console.log(stylist.username);
  })
  mongoose.connection.close();
});
