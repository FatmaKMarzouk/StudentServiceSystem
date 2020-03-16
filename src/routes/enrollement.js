var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/enrollement', function(request, response,next) {
	response.sendFile(__dirname+'/enrollement.html');
	console.log('its anhoon11');
});

var connection = require('../controllers/dbconnection');

router.post('/enroll', function(request, response) {
	console.log('its anhoon');
	response.send('3aaaaaaaaaaaaaaaaaaa');

	var nameen = request.body.nameen;
	var namear = request.body.namear;
	var ssn = request.body.ssn;
	var emergencycontact = request.body.emergencycontact;	
	var medicalcondition = request.body.medicalcondition;
	var email = request.body.email;
	var nationality = request.body.nationality;
	var birthdate = request.body.birthdate;
	var phonenumber = request.body.phonenumber;
	var address = request.body.address;
	var username = request.body.username;
	var password = request.body.password;
	var gender = request.body.gender;
	var birthCerftificate = request.body.birthCerftificate;
	var Nationalid = request.body.Nationalid;
	var NominationCard = request.body.NominationCard;

	//if (username && password) {
		connection.query('USE AlexUni');
		console.log(nameen);
		//connection.query('INSERT INTO Students (NameEn,NameAr,emergencyContact,Gender,medicalCondition,Email,Nationality,Birthdate,SSN,phoneNumber,Address,Username,Password) VALUES [nameen, namear, emergencycontact, gender, medicalcondition, email, nationality, birthdate, ssn, phonenumber, address, username, password] ',  function(error, results, fields){

		//NameEn,Namear,emergencyContact,Gender,medicalCondition,Email,Nationality,Birthdate,SSN,phoneNumber,Address,Username,Password
		connection.query('INSERT INTO Students WHERE NameEn  = ? AND Namear  = ? AND emergencyContact  = ?  AND medicalCondition  = ? AND Email  = ? AND Nationality  = ? AND Birthdate  = ? AND SSN  = ? AND phoneNumber  = ? AND Address  = ? AND Username  = ? AND Password  = ? AND Gender  = ?', [nameen, namear, emergencycontact, medicalcondition, email, nationality, birthdate, ssn, phonenumber, address, username, password, gender],  function(error, results, fields) {
		// 	if (results.length>0) {
		// 		console.log(results);
		// 		response.redirect('/home');
		// 	} else {
		// 		response.send('Incorrect data');
		// 	}
		// 	response.end();
		// });
	// } else {
	// 	response.send('Please enter the students information');
	// 	response.end();
	// }

	console.log('its anhoooooooooooooon');
});
});