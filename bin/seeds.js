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

const stylists=[{firstName:"Harry",lastName:"Potter",username:"harry@potter.co",password:"abcd",role:"Stylist",avatar:" ",services:["Blow Dry","Color"],expertise:"Men",languages:" ",description:" ",price:" ",availability:["Monday"],mobile:["Both"],geolocation:{type:"Point",coordinates:[2.189858,41.386333]},location:" ",reviews:[{name:" ",comment:" ",stars:1,date:new Date()}]},{firstName:"Hermione",lastName:"Granger",username:"hermione@granger.co.uk",password:"abcd",role:"Stylist",avatar:" ",services:["Cut","Blow Dry"],expertise:"Any",languages:" ",description:" ",price:" ",availability:["Tuesday"],mobile:["Both"],geolocation:{type:"Point",coordinates:[2.186015,41.388123]},location:" ",reviews:[{name:" ",comment:" ",stars:4,date:new Date()}]},{firstName:"Roger",lastName:"Rabbit",username:"roger@rabbit.co.uk",password:"abcd",role:"Stylist",avatar:" ",services:["Cut","Blow Dry","Color"],expertise:"Any",languages:" ",description:" ",price:" ",availability:["Monday"],mobile:["Both"],geolocation:{type:"Point",coordinates:[2.180722,41.390699]},location:" ",reviews:[{name:" ",comment:" ",stars:4,date:new Date()}]}];

// const stylists = [
//   {
//     firstName   : 'Harry',
// 		lastName    : 'Potter',
//     username    : 'harry@potter.co',
//     password    : 'abcd',
//     role        : 'Stylist',
//     avatar			: ' ',
// 		services		: ' ',
// 		expertise: ["Both"],
// 		languages: " ",
// 		description: " ",
// 		price: " ",
// 		availability: " ",
// 		mobile: ["Both"],
// 		geolocation: {
// 			type: "Point",
// 			coordinates: [9999,9999]
// 		},
//     location    : ' ',
//     reviews : [
//       {
//         name    : " ",
//         comment : " ",
//         stars   : 1,
//         date    : new Date()
//       }
//     ]
//   },
//   {
//     firstName   : 'Hermione',
// 		lastName    : 'Granger',
//     username    : 'hermione@granger.co.uk',
//     password    : 'abcd',
//     role        : 'Stylist',
// 		avatar			: ' ',
// 		services		: ' ',
// 		expertise   : ["Both"],
// 		languages   : " ",
// 		description : " ",
// 		price       : " ",
// 		availability: " ",
// 		mobile      : ["Both"],
// 		geolocation : {
// 			type       : "Point",
// 			coordinates: [9999,9999]
// 		},
//     location : ' ',
//     reviews : [
//       {
//         name    : " ",
//         comment : " ",
//         stars   : 4,
//         date    : new Date()
//       }
//     ]
//   }
// ];


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
    console.log(appointment._id);
  });
  mongoose.connection.close();
});


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
