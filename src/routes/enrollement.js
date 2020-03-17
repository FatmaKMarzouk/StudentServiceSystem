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
	//console.log('its anhoon11');
});

var connection = require('../controllers/dbconnection');

router.post('/enroll', function(request, response) {
	//console.log('its anhoon');
	response.send('Student has been added successfully');

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
	var program = request.body.program;
	var faculty = request.body.faculty;
	var birthCerftificate = request.body.birthCerftificate;
	var nationalid = request.body.nationalid;
	var nominationCard = request.body.nominationCard;

	
		connection.query('USE AlexUni');
		//connection.query('INSERT INTO Students (NameEn,NameAr,emergencyContact,Gender,medicalCondition,Email,Nationality,Birthdate,SSN,phoneNumber,Address,Username,Password,Faculty,Program) VALUES (nameen, namear, emergencycontact, gender, medicalcondition, email, nationality, birthdate, ssn, phonenumber, address, username, password,faculty,program) ',  function(error, results, fields){
		connection.query('INSERT INTO Students (NameEn,NameAr,emergencyContact,Gender,medicalCondition,Email,Nationality,Birthdate,SSN,phoneNumber,Address,Username,Password,Faculty,Program) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ',[nameen, namear, emergencycontact, gender, medicalcondition, email, nationality, birthdate, ssn, phonenumber, address, username, password,faculty,program] ,  function(error, results, fields){

			if (error) throw error;

		});
});