var express = require('express');
var router = express.Router();
var Stylist = require('../models/stylist.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/search', (req, res)=> {
  res.render('search');
});

router.post('/search/results',(req, res, next) => {
  Stylist.find((error, places) => {
    if (error) { next(error); }
    else {
      res.json(places);
    }
  })
})

module.exports = router;
