const mongoose     = require('mongoose');
const User         = require('../models/user');
const Stylist      = require('../models/stylist');
const Appointment  = require('../models/appointment');
mongoose.connect('mongodb://localhost/estil');

const users = [
  {
    firstName   : 'Cara',
		lastName    : 'Delevigne',
    username    : "cara@i.com",
    password    : '1234',
    role        : 'User',
    avatar      : ' ',
  },
  {
    firstName   : 'Tasha',
		lastName    : 'Romasha',
    username    : 'tasha@cool.com',
    password    : '2345',
    role        : 'User',
    avatar      : ' ',
  },
  {
    firstName   : 'Mika',
		lastName    : 'Thasika',
    username    : 'mika@yell.com',
    password    : '3456',
    role        : 'User',
    avatar      : ' ',
	}
];

const stylists = [
  {
    firstName   : 'Harry',
		lastName    : 'Potter',
    username    : 'harry@potter.co',
    password    : 'abcd',
    role        : 'Stylist',
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
    reviews : [
      {
        name    : " ",
        comment : " ",
        stars   : 1,
        date    : new Date()
      }
    ]
  },
  {
    firstName   : 'Hermione',
		lastName    : 'Granger',
    username    : 'hermione@granger.co.uk',
    password    : 'abcd',
    role        : 'Stylist',
		avatar			: ' ',
		services		: ' ',
		expertise   : ["Both"],
		languages   : " ",
		description : " ",
		price       : " ",
		availability: " ",
		mobile      : ["Both"],
		geolocation : {
			type       : "Point",
			coordinates: [20,20]
		},
    // location : 'Carrer de lAtlàntida, 53 08003, Barcelona'
    reviews : [
      {
        name    : " ",
        comment : " ",
        stars   : 4,
        date    : new Date()
      }
    ]
  }
];


const appointments = [
  {
    date     : new Date(),
    startTime: new Date().getTime(),
    endTime  : new Date().getTime(),
    stylist  : {_id : "58ac741e46a05babb522aa69"},
    user     : {_id : "58ac7365b2ba19ab38c51a5d"},
    completed: true
  },
  {
    date     : new Date(),
    startTime: new Date().getTime(),
    endTime  : new Date().getTime(),
    stylist  : {_id : "58ac742846a05babb522aa6b"},
    user     : {_id :  "58ac73d5b2ba19ab38c51a5e"},
    completed: false
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


User.create(users, (err, docs)=> {
	console.log(users.username);
  if (err){
		throw(err);}

  docs.forEach( (user)=>{
  })
  mongoose.connection.close();
});

Stylist.create(stylists, (err, docs)=> {
	console.log(stylists.username);
  if (err){
		throw(err);}

  docs.forEach( (stylist)=>{
  })
  mongoose.connection.close();
});
