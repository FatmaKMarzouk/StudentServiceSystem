var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var path = require('path');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/enrollement', function(request, response,next) {
	response.sendFile(__dirname+'/enrollement.html');
});

var connection = require('../controllers/dbconnection');

router.put('/enroll', function(request, response) {
	console.log('its anhoon');

	//if (username && password) {
		connection.query('USE AlexUni');
		connection.query('SELECT * FROM Students WHERE Username = 1',  function(error, results, fields) {
			if (results.length>0) {
				console.log(results);
				response.redirect('/home');
			} else {
				response.send('Incorrect data');
			}
			response.end();
		});
	// } else {
	// 	response.send('Please enter the students information');
	// 	response.end();
	// }
});

