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
    firstName   : 'Rodolfo',
		lastName    : 'Oscar',
    username    : 'rodolfo@oscar.com',
    password    : 'abcd',
    role        : 'Stylist',
    avatar			: ' ',
		services		: ['Blow Dry','Color','Cut'],
		expertise		: "Men",
		languages		: ["English","Spanish","Catalan"],
		description	: " ",
		price				: "€€€",
		availability: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
		mobile			: ["Salon","Home"],
		distance 		: 5,
		geolocation	: {
			type: "Point",
			coordinates: [2.191064,41.397737]
		},
    location    : 'Razzmatazz, Barcelona',
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
    firstName   : 'Angelino',
		lastName    : 'Torsten',
    username    : 'angelino@torsten.com',
    password    : 'abcd',
    role        : 'Stylist',
    avatar			: ' ',
		services		: ['Blow Dry','Cut'],
		expertise		: "Men",
		languages		: ["Catalan"],
		description	: " ",
		price				: "€€€",
		availability: ["Monday","Tuesday","Saturday","Sunday"],
		mobile			: ["Salon","Home"],
		distance 		: 5,
		geolocation	: {
			type: "Point",
			coordinates: [2.189949,41.396160]
		},
    location    : "L'Ovella Negra, Barcelona",
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
    firstName   : 'Breixo',
		lastName    : 'Aramis',
    username    : 'breixo@aramis.co.uk',
    password    : 'abcd',
    role        : 'Stylist',
		avatar			: ' ',
		services		: ['Blow Dry','Color'],
		expertise   : "Any",
		languages   : ["English"],
		description : " ",
		price       : "€",
		availability: ["Monday", "Friday", "Saturday", "Sunday"],
		mobile      : ["Both"],
		distance		: 2.5,
		geolocation : {
			type       : "Point",
			coordinates: [2.197695, 41.399427]
		},
    location : 'Llacuna, Barcelona',
    reviews : [
      {
        name    : " ",
        comment : " ",
        stars   : 4,
        date    : new Date()
      }
    ]
  },
  {
    firstName   : 'Clemente',
		lastName    : 'Galo',
    username    : 'clemente@galo.com',
    password    : 'abcd',
    role        : 'Stylist',
    avatar			: ' ',
		services		: ['Blow Dry','Color'],
		expertise		: "Men",
		languages		: ["Spanish","Catalan"],
		description	: " ",
		price				: "€€",
		availability: ["Wednesday","Thursday","Friday","Saturday","Sunday"],
		mobile			: ["Salon","Home"],
		distance 		: 7.5,
		geolocation	: {
			type: "Point",
			coordinates: [2.179456,41.400538]
		},
    location    : 'Monumental, Barcelona',
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
    firstName   : 'Fran',
		lastName    : 'Pablo',
    username    : 'fran@pablo.com',
    password    : 'abcd',
    role        : 'Stylist',
    avatar			: ' ',
		services		: ['Blow Dry','Color','Cut'],
		expertise		: "Men",
		languages		: ["English","Spanish","Catalan"],
		description	: " ",
		price				: "€€€",
		availability: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
		mobile			: ["Salon","Home"],
		distance 		: 2.5,
		geolocation	: {
			type: "Point",
			coordinates: [2.187524,41.402260]
		},
    location    : 'Glories, Barcelona',
    reviews : [
      {
        name    : " ",
        comment : " ",
        stars   : 1,
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
    stylist  : {_id : "58aeaa84c9c2d527d0db47f2"},
    user     : {_id : "58aea2ef20b5ac2419eca716"},
    completed: true,
    accept   : true,
    request  : String

  },
  {
    date     : new Date(),
    startTime: new Date().getTime(),
    endTime  : new Date().getTime(),
    stylist  : {_id : "58aeab3fc9c2d527d0db47f3"},
    user     : {_id : "58ac73d5b2ba19ab38c51a5e"},
    completed: false,
    accept   : false,
    request  : String

  },
	{
		date     : new Date(),
		startTime: new Date().getTime(),
		endTime  : new Date().getTime(),
		stylist  : {_id : "58aeaa84c9c2d527d0db47f2"},
		user     : {_id : "58ac73d5b2ba19ab38c51a5e"},
		completed: false,
    accept   : false,
    request  : String
	}
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
