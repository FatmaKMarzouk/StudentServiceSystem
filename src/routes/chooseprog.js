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
    response.send('html');
    var username = request.session.username;
    var facultyname=""; var ssp="";
    connection.query('USE AlexUni');
    connection.query('SELECT Faculty,SSP FROM Students WHERE Username = ? ', [username], function(error, results1, fields) {
			if (results1.length>0) {
      Object.keys(results1).forEach(function(key) {
      var row = results1[key];
      facultyname = row.Faculty;
      ssp = row.SSP;
      });
    connection.query('USE AlexUni');
    connection.query('SELECT Name FROM Program WHERE FacultyName = ? AND SSP = ?',[facultyname,ssp],function(error,results2,fields){
      if (results2.length>0){
        console.log(results2);
      }
      else {
        console.log("no valid program available");
      }
    });
  }else {
      console.log('Incorrect Data!No Faculty name specified');
    }
    });
  } else {
    response.send('Please login to view this page!');
  }

});
