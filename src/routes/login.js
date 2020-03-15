var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/', function(request, response,next) {
	response.sendFile(__dirname+'/login.html');
});
var connection = require('../controllers/dbconnection');

router.post('/auth', function(request, response) {
	console.log('its fatma');

	var checkboxStd = request.body.std;
	var checkboxSec = request.body.sec;
	var username = request.body.username;
	var password = request.body.password;
	if (checkboxSec && checkboxStd){
		response.send('Please choose only one box');
		response.end();

	 }
	else if (username && password) {
		connection.query('USE AlexUni');
	     if(checkboxStd){
		connection.query('SELECT * FROM Students WHERE Username = ? AND Password = ?', [username, password], function(error, results, fields) {
			if (results.length>0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();



		});
		 }
		 else if (checkboxSec){
			connection.query('SELECT * FROM Secretary WHERE ID = ? AND Password = ?', [username, password], function(error, results, fields) {
				if (results.length>0) {
					request.session.loggedin = true;
					request.session.username = username;
					response.redirect('/sec');

					} else {
					response.send('wrong secretary account');
				}
				response.end();



			});



		 }

	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


//app.listen(3000);
