var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');


router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

var facultyesc;

router.get('/enrollement', function(request, response,next) {
	response.sendFile(__dirname+'/enrollement.html');
	//console.log('its anhoon11');

	if (request.session.loggedin) {
		var secusername = request.session.username;
		
		connection.query('SELECT FacultyName FROM Secretary WHERE ID = ? ',[secusername] ,  function(error, results, fields){

			// if (results.length>0){
			// 	console.log(results);  
			// 	facultyesc = JSON.stringify(results.FacultyName);
			// 	console.log("fooooooooooooooo");
			// 	console.log(facultyesc); 
			//   }
			if(results.length>0){
				console.log("hhhhhooooooooooooo");
				Object.keys(results).forEach(function(key){
				  var row = results[key];
				  facultyesc = row.FacultyName;
				  console.log("fooooooooooooooo");
			      console.log(facultyesc); 
				});}
			else {
			 	console.log("3aaaaaaaaaaaa");
			   }


		});
	}

});

console.log("woooooo");
console.log(facultyesc); 
var connection = require('../controllers/dbconnection');


router.post('/enroll', function(request, response) {

	console.log("plzzzzzzzzz");
	//console.log(facultysec);
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
	//var password = request.body.password;
	var gender = request.body.gender;
	var program = request.body.program;
	//var faculty = request.body.faculty;
	var birthCerftificate = request.body.birthCerftificate;
	var nationalid = request.body.nationalid;
	var nominationCard = request.body.nominationCard;
	
		connection.query('USE AlexUni');

		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$/%&';
		var charactersLength = characters.length;
		for ( var i = 0; i < 10; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}


		//connection.query('INSERT INTO Students (NameEn,NameAr,emergencyContact,Gender,medicalCondition,Email,Nationality,Birthdate,SSN,phoneNumber,Address,Username,Password,Faculty,Program) VALUES (nameen, namear, emergencycontact, gender, medicalcondition, email, nationality, birthdate, ssn, phonenumber, address, username, password,faculty,program) ',  function(error, results, fields){
		// connection.query('INSERT INTO Students (NameEn,NameAr,emergencyContact,Gender,medicalCondition,Email,Nationality,Birthdate,SSN,phoneNumber,Address,Username,Password,Faculty,Program) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ',[nameen, namear, emergencycontact, gender, medicalcondition, email, nationality, birthdate, ssn, phonenumber, address, username, result ,facultysec, program] ,  function(error, results, fields){

		// 	console.log("ana heenaaaaaaaaaaa")
		// 	if (error) throw error;

		// });

		const output = `
			<p>You have been accepted in Alexandria University</p>
			<h3>Contact Details</h3>
			<ul>  
			<li>Username: ${username}</li>
			<li>Password: ${result}</li>
			</ul>
			<h3>Message</h3>
			<p>Please login and change your password</p>
		`;

		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: 'alexandriauniversity7@gmail.com', // generated ethereal user
				pass: 'Unified7!!'  // generated ethereal password
			},
			tls:{
			  rejectUnauthorized:false
			}
		  });

		let mailOptions = {
			from: '"Alexandria University" <hanaayman1997@gmail.com>', // sender address
			to: email, // list of receivers
			subject: 'Alexandria University', // Subject line
			text: 'Hello world?', // plain text body
			html: output // html body
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);   
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	  
			res.render('contact', {msg:'Email has been sent'});
		});
});