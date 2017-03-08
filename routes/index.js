var express = require('express');
var router = express.Router();
var Stylist = require('../models/stylist.js');

router.get("/api/search", (req, res)=> {
	Stylist.find({}, (err, allStylists) => {
		mapInfo = {};
		allStylists.forEach(function(stylist, index){
			mapInfo["prop" + index] = stylist;
		});
		res.json(mapInfo);
	});

});

module.exports = router;
