var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

var connection = require('../controllers/dbconnection');
var facultysec;
var resultall = '' ;
var resultsearch = '' ;

router.get('/allrequests',function(request, response) {

	//console.log("hiiiiiiiiiiiiiiiii");
    if (request.session.loggedin) {
		var secusername = request.session.username;

		connection.query('SELECT FacultyName FROM Secretary WHERE ID = ? ',[secusername] ,  function(error, results, fields){

			if(results.length>0){
				Object.keys(results).forEach(function(key){
				  var row = results[key];
				  facultysec = row.FacultyName;
				 // console.log("helloooo");
				});}
			else {
			 	console.log("3aaaaaaaaaaaa");
			   }
        });

        connection.query('SELECT ID,StudentID,ServiceName,Data,Amount,Paid,DatePaid,done,received FROM Requests WHERE FacultyName = ? && Paid = ?',[facultysec,'1'] ,  function(error, results, fields){

			if(results.length>0){
				// Object.keys(results).forEach(function(key){
				//   var row = results[key];
				//   resultall=row;
				// });
				console.log("ana hena");
				console.log(results);
			}
			// else {
			// 	console.log("No new requests");
			// }
		});

	} else{
		response.send("Please log in to view this page!");
	  }
});

router.get('/undonerequests',function(request, response) {
    if (request.session.loggedin) {
		var secusername = request.session.username;
		var array = [];

		connection.query('SELECT FacultyName FROM Secretary WHERE ID = ?',[secusername] ,  function(error, results, fields){

			if(results.length>0){
				Object.keys(results).forEach(function(key){
				  var row = results[key];
				  facultysec = row.FacultyName;
				});}
			else {
			 	console.log("3aaaaaaaaaaaa");
			   }

        });

        connection.query('SELECT ID,StudentID,ServiceName,Data,Amount,Paid,DatePaid,done,received FROM Requests WHERE FacultyName = ? && done = ? && Paid = ?',[facultysec,'0','1'] ,  function(error, results, fields){

			if(results.length > 0){
				console.log("ana hena2");
				Object.keys(results).forEach(function(key){
				  var row = results[key];
				  array.push(results[key]);
				});
				
				console.log(array);
			}
			// } else {
			// 	console.log("No undone requests");
			// }
		
        });

	} else{
		response.send("Please log in to view this page!");
	  }
});

router.get('/search', function(request, response,next) {
	response.sendFile(__dirname+'/searchrequest.html');
	//console.log('its anhoon11');

});
router.post('/searchrequests',function(request, response) {
	var studentid = request.body.studentid;
	var array2 = [];
	console.log("hiiiiiiiiiiiiiiiii");
    if (request.session.loggedin) {
		var secusername = request.session.username;

        connection.query('SELECT ID,StudentID,ServiceName,Data,Amount,Paid,DatePaid,done,received FROM Requests WHERE StudentID = ?',[studentid] ,  function(error, results, fields){

			if(results.length > 0){
				Object.keys(results).forEach(function(key){
				  var row = results[key];
				  array2.push(results[key]);
				});
				console.log("ana hena3");
				console.log(array2);
			}
        });

	} else{
		response.send("Please log in to view this page!");
	  }
});

router.get('/requestdone',function(request, response) {
	var studentid = request.body.studentid;
	var array2 = [];
	console.log("hiiiiiiiiiiiiiiiii");
    if (request.session.loggedin) {
		var reqID = request.session.reqID;
		console.log(reqID);
		connection.query('UPDATE Requests SET done = 1 WHERE ID = 77',[reqID]);

	} else{
		response.send("Please log in to view this page!");
	  }
});


