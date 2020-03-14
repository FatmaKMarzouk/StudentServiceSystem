var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

router.get('/', function(request, response,next) {
	response.sendFile(__dirname+'/login.html');
});

router.post('/auth', function(request, response) {
	console.log('wkenklwf');
	var mysqlConf = require('F:/Graduation Project/StudentServiceSystem/src/controllers/dbconnection').mysql_pool;
	mysqlConf.getConnection(function (err, connection) {
	      console.log('hello');
	      connection.query('SELECT FROM Students WHERE Username=1' ,[{FIELDS}], function (err, rows) {
	            connection.release();   //---> don't forget the connection release.
	        });
	   });
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM Students WHERE Username = ? AND Password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

/*app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});*/

//app.listen(3000);
