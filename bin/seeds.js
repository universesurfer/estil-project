const mongoose = require('mongoose');
<<<<<<< HEAD:bin/seed.js
=======
mongoose.connect('mongodb://localhost:27017/estil');
>>>>>>> master:bin/seeds.js
const User = require('../models/user');
const Stylist = require('../models/stylist');
mongoose.connect('mongodb://localhost/estil');

<<<<<<< HEAD:bin/seed.js
// const users = [
//   {
//     name        : 'Cara',
//     email       : "cara@i.com",
//     password    : '1234',
//     role        : 'User',
//     avatar      : ' ',
//     appointments: {
//       date : new Date(),
//       stylist : ' '
//     }
//   },
//   {
//     name        : 'Tasha',
//     email       : 'tasha@cool.com',
//     password    : '2345',
//     role        : 'User',
//     avatar      : ' ',
//     appointments: {
//       date : new Date(),
//       stylist : ' '
//     }
//   },
//   {
//     name        : 'Mika',
//     email       : 'mika@yell.com',
//     password    : '3456',
//     role        : 'User',
//     avatar      : ' ',
//     appointments: {
//       date : new Date(),
//       stylist : ' '
//     }
//   }];
=======
const users = [
  {
    firstName   : 'Cara',
		lastName    : 'Delevigne',
    username    : "cara@i.com",
    password    : '1234',
    role        : 'User',
    avatar      : ' ',
    appointments: {
      date : new Date()
    }
  },
  {
    firstName   : 'Tasha',
		lastName    : 'Romasha',
    username    : 'tasha@cool.com',
    password    : '2345',
    role        : 'User',
    avatar      : ' ',
    appointments: {
      date : new Date()
    }
  },
  {
    firstName   : 'Mika',
		lastName    : 'Thasika',
    username    : 'mika@yell.com',
    password    : '3456',
    role        : 'User',
    avatar      : ' ',
    appointments: {
      date : new Date()
    }
  }];
>>>>>>> master:bin/seeds.js

const stylists = [
  {
    firstName   : 'Harry',
		lastName    : 'Potter',
    username    : 'harry@potter.co',
    password    : 'abcd',
    role        : 'Stylist',
    appointments: {
<<<<<<< HEAD:bin/seed.js
      date : new Date(),
      user : ' '
=======
      date : new Date()
>>>>>>> master:bin/seeds.js
    },
    avatar: ' ',
    experience  : '',
    expertise   : 'Any',
    price       : 30,
    availability: ' ',
    address     : 'Via Augusta, 92'
  },
  {
    firstName   : 'Hermione',
		lastName    : 'Granger',
    username    : 'hermione@granger.co.uk',
    password    : 'abcd',
    role        : 'Stylist',
    appointments: {
<<<<<<< HEAD:bin/seed.js
      date : new Date(),
      user : " "
=======
      date : new Date()
>>>>>>> master:bin/seeds.js
    },
    avatar: ' ',
    experience  : '',
    expertise   : 'Any',
    price       : 40,
    availability: ' ',
    address     : 'Carrer de lAtlàntida, 53, 08003 Barcelona'
  },
];


User.create(users, (err, docs)=> {
  if (err){throw(err);}

  docs.forEach( (user)=>{
    console.log(user.username);
  })
  mongoose.connection.close();
});

Stylist.create(stylists, (err, docs)=> {
  if (err){throw(err);}

  docs.forEach( (stylist)=>{
    console.log(stylist.username);
  })
  mongoose.connection.close();
});
