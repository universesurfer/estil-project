var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/search', (req, res, err)=> {
  if(err){console.log('Error ahhh!');}
  res.render('auth/search');
});

module.exports = router;
