var mysql = require('mysql');
var connection = require('../controllers/dbconnection');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var jwt = require('jsonwebtoken');
const utils = require('../utils');
router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// enable CORS
router.use(cors());
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

// static user details
const userData = {
	userId: "789789",
	password: "123456",
	name: "Diaa Saber",
	username: "1",
	isAdmin: true
  };
   
   
   
  //middleware that checks if JWT token exists and verifies it if it does exist.
  //In all future routes, this helps to know if the request is authenticated or not.
  router.use(function (req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.headers['authorization'];
	if (!token) return next(); //if no token, continue
   
	token = token.replace('Bearer ', '');
	jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
	  if (err) {
		return res.status(401).json({
		  error: true,
		  message: "Invalid user."
		});
	  } else {
		req.user = user; //set the user to req so other routes can use it
		next();
	  }
	});
  });
   
   
  // request handlers
  router.get('/', (req, res) => {
	if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
	res.send('Welcome - ' + req.user.name);
  });
   
   
  // validate the user credentials
  router.post('/users/signin', function (req, res) {
	const user = req.body.username;
	const pwd = req.body.password;
   
	// return 400 status if username/password is not exist
	if (!user || !pwd) {
	  return res.status(400).json({
		error: true,
		message: "Username or Password required."
	  });
	}
   
	// return 401 status if the credential is not match.
	if (user !== userData.username || pwd !== userData.password) {
	  return res.status(401).json({
		error: true,
		message: "Username or Password is Wrong."
	  });
	}
   
	// generate token
	const token = utils.generateToken(userData);
	// get basic user details
	const userObj = utils.getCleanUser(userData);
	// return the token along with user details
	return res.json({ user: userObj, token });
  });
   
   
  // verify the token and return it if it's valid
  router.get('/verifyToken', function (req, res) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token;
	if (!token) {
	  return res.status(400).json({
		error: true,
		message: "Token is required."
	  });
	}
	// check token that was passed by decoding token using secret
	jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
	  if (err) return res.status(401).json({
		error: true,
		message: "Invalid token."
	  });
   
	  // return 401 status if the userId does not match.
	  if (user.userId !== userData.userId) {
		return res.status(401).json({
		  error: true,
		  message: "Invalid user."
		});
	  }
	  // get basic user details
	  var userObj = utils.getCleanUser(userData);
	  return res.json({ user: userObj, token });
	});
  });
  














/*router.get('/', function(request, response,next) {
	response.sendFile(__dirname+'/login.html');

});
var connection = require('../controllers/dbconnection');

router.post('/auth', function(request, response,next) {
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
					response.redirect('/homesec');
					} else {
					response.send('Incorrect Username and/or Password!');
				}
				var secid = username;
				console.log(secid);
			});

		 }

	} else {
		response.send('Please enter Username and Password!');

	}
});*/
