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
    marker      : {},
		geolocation	: {
			type: "Point",
			coordinates: [2.191064,41.397737]
		},
    location    : 'Razzmatazz, Barcelona',
    board       : 'https://es.pinterest.com/nasti/hair/'
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
    marker      : {},
		geolocation	: {
			type: "Point",
			coordinates: [2.189949,41.396160]
		},
    location    : "L'Ovella Negra, Barcelona",
    board       : "https://es.pinterest.com/Coveteur/hair/"
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
    marker      : {},
		geolocation : {
			type       : "Point",
			coordinates: [2.197695, 41.399427]
		},
    location    : 'Llacuna, Barcelona',
    board       : "https://es.pinterest.com/caitlin_cawley/hair/"
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
    marker      : {},
		geolocation	: {
			type: "Point",
			coordinates: [2.179456,41.400538]
		},
    location    : 'Monumental, Barcelona',
    board       : "https://es.pinterest.com/oliviapalermo/hair/"
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
    marker      : {},
		geolocation	: {
			type: "Point",
			coordinates: [2.187524,41.402260]
		},
    location    : 'Glories, Barcelona',
    board       : "https://es.pinterest.com/apartment_34/hair/"
  },
  {
    firstName   : 'Lucas',
		lastName    : 'Paco',
    username    : 'lucas@paco.com',
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
    marker      : {},
		geolocation	: {
			type: "Point",
			coordinates: [2.189858,41.386333]
		},
    location    : 'Barcelona Zoo, Barcelona',
    board       : "https://es.pinterest.com/dooce/hair/"
  },
  {
    firstName   : 'Antonio',
		lastName    : 'Leandro',
    username    : 'antonio@leandro.com',
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
		distance 		: 10,
    marker      : {},
		geolocation	: {
			type: "Point",
			coordinates: [2.226342,41.410678]
		},
    location    : 'Parc del Forum, Barcelona',
    board       : "https://es.pinterest.com/amberlfillerup/hair/"
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

  },
  {
    date     : new Date(),
    startTime: new Date().getTime(),
    endTime  : new Date().getTime(),
    stylist  : {_id : "58aeab3fc9c2d527d0db47f3"},
    user     : {_id : "58ac73d5b2ba19ab38c51a5e"},
    completed: false,
    accept   : false,

  },
	{
		date     : new Date(),
		startTime: new Date().getTime(),
		endTime  : new Date().getTime(),
		stylist  : {_id : "58aeaa84c9c2d527d0db47f2"},
		user     : {_id : "58ac73d5b2ba19ab38c51a5e"},
		completed: false,
    accept   : false,
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
