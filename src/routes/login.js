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

router.post('/auth', function(request, response,next) {
	console.log('its fatma');

	var role = request.body.role;
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('USE AlexUni');
	     if(role=='student'){
		connection.query('SELECT * FROM Students WHERE Username = ? AND Password = ?', [username, password], function(error, results, fields) {
			if (results.length>0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}



		});
		 }
		 else if (role=='secretary'){
			connection.query('SELECT * FROM Secretary WHERE ID = ? AND Password = ?', [username, password], function(error, results, fields) {
				if (results.length>0) {
					request.session.loggedin = true;
					request.session.username = username;
					response.redirect('/home');
					} else {
					response.send('wrong secretary account');
				}



			});



		 }

	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


//app.listen(3000);
