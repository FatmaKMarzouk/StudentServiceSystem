var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/all', function(request, response,next) {
	response.sendFile(__dirname+'/allrequests.html');
	//console.log('its anhoon11');

});

var connection = require('../controllers/dbconnection');
var facultysec;

router.post('/allrequests',function(request, response) {
    if (request.session.loggedin) {
		var secusername = request.session.username;

		connection.query('SELECT FacultyName FROM Secretary WHERE ID = ? ',[secusername] ,  function(error, results, fields){

			if(results.length>0){
				Object.keys(results).forEach(function(key){
				  var row = results[key];
				  facultysec = row.FacultyName;
			      console.log(facultysec);
				});}
			else {
			 	console.log("3aaaaaaaaaaaa");
			   }

        });

        connection.query('SELECT * FROM Students WHERE FacultyName = ? ',[facultysec] ,  function(error, results, fields){

			if(results.length>0){
				Object.keys(results).forEach(function(key){
				  var row = results[key];
				  facultysec = row.FacultyName;
			      console.log(facultysec);
                });
            }
			else {
			 	console.log("3aaaaaaaaaaaa");
			   }

        });

        

	}
});