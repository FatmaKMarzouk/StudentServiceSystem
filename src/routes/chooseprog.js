var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');


router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
var connection = require('../controllers/dbconnection');

router.get('/chooseprog', function(request, response,next) {
  if (request.session.loggedin) {
    var username = request.session.username;
    connection.query('USE AlexUni');
    connection.query('SELECT Faculty,SSP FROM Students WHERE Username = ? ', [username], function(error, results, fields) {
			if (results.length>0) {
      Object.keys(result).forEach(function(key) {
      var row = result[key];
      console.log(row.Faculty);
    });


			} else {
				response.send('Incorrect Data!No Faculty name specified');
			}



		});
      response.sendFile(__dirname+'/home.html');
  } else {
    response.send('Please login to view this page!');
  }

});
