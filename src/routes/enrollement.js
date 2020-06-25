var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
var facultysec;
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var request = require('request');
var fs = require('fs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/enrollement', function (request, response, next) {
	response.sendFile(__dirname + '/enrollement.html');
	//console.log('its anhoon11');

});

var connection = require('../controllers/dbconnection');
var email;

router.post('/enroll', function (request, response) {
	console.log("frontend connected");

	if (request.user) {
		//console.log("request.user test");
		//console.log(request.user);
		var secusername = request.user.username;

		
		connection.query('SELECT FacultyName FROM Secretary WHERE ID = ? ', [secusername], function (error, results, fields) {

			if (results.length > 0) {
				Object.keys(results).forEach(function (key) {
					var row = results[key];
					facultysec = row.FacultyName;
					console.log(facultysec);
				});
			}
			else {
				console.log("3aaaaaaaaaaaa");
			}

			//});

			//response.send('Student has been added successfully');
			console.log("student added");

			var nameen = request.body.nameen;
			var namear = request.body.namear;
			var ssn = request.body.ssn;
			var medicalcondition = request.body.medicalcondition || " ";
			var parentphone = request.body.parentphone;
			var parentname = request.body.parentname;
			var parentssn = request.body.parentssn;
			var parentrelation = request.body.parentrelation;
			email = request.body.email;
			var nationality = request.body.nationality || " ";
			var birthdate = request.body.birthdate || " ";
			var phonenumber = request.body.phonenumber || " ";
			var address = request.body.address || " ";
			var gender = request.body.gender;
			var selection = request.body.selection || " ";
			//var birthCerftificate = request.body.birthCerftificate || " ";
			//var nationalid = request.body.nationalid || " ";
			//var nominationCard = request.body.nominationCard || " ";
			//var photo = request.body.photo || "";
			var user = '';


			connection.query('USE AlexUni');

			var result = '';
			var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$/%&';
			var charactersLength = characters.length;
			for (var i = 0; i < 10; i++) {
				result += characters.charAt(Math.floor(Math.random() * charactersLength));
			}
			// connection.query('INSERT INTO Students (NameEn,NameAr,Gender,medicalCondition,Email,Nationality,Birthdate,SSN,phoneNumber,Address,Password,Faculty,Program) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ',[nameen, namear, gender, medicalcondition, email, nationality, birthdate, ssn, phonenumber, address, result ,'Faculty of Engineering', 'General'] ,  function(error, results, fields){
			//connection.query('INSERT INTO Students (NameEn, NameAr, ParentPhone, Gender, medicalCondition, Email, Nationality, Birthdate, SSN, phoneNumber, Address, Password, Faculty, Program, ParentName, ParentSSN, ParentRelation, birthCertificate, Nationalid, NominationCard, Photo) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ', [nameen, namear, parentphone, gender, medicalcondition, email, nationality, birthdate, ssn, phonenumber, address, result, facultysec, 'General', parentname, parentssn, parentrelation, birthCerftificate, nationalid, nominationCard, photo], function (error, results, fields) {
			connection.query('INSERT INTO Students (NameEn, NameAr, ParentPhone, Gender, medicalCondition, Email, Nationality, Birthdate, SSN, phoneNumber, Address, Password, Faculty, Program, ParentName, ParentSSN, ParentRelation) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ', [nameen, namear, parentphone, gender, medicalcondition, email, nationality, birthdate, ssn, phonenumber, address, result, facultysec, 'General', parentname, parentssn, parentrelation], function (error, results, fields) {

				if (selection == 'private') {
					connection.query("UPDATE Students SET SSP = b'1' WHERE Email = ? ", [email], function (error, results, fields) {
					});
				}

				connection.query("UPDATE Students SET Username = ID WHERE Email = ? ", [email], function (error, results, fields) {
				});

				connection.query("SELECT Username FROM Students WHERE Email = ? ", [email], function (error, results1, fields) {
					if (results1.length > 0) {
						Object.keys(results1).forEach(function (key) {
							var row = results1[key];
							user = row.Username;
							console.log(user);
							return user;
						});
					}
					const output = `
					<p>Congratulations! You have been accepted in Alexandria University.</p>
					<h3>Contact Details</h3>
					<ul>
					<li>Faculty: ${facultysec}</li>
					<li>Username: ${user}</li>
					<li>Password: ${result}</li>
					</ul>
					<h3>Note:</h3>
					<p>Please login and change your password.</p>
				`;

					let transporter = nodemailer.createTransport({
						host: 'smtp.gmail.com',
						port: 587,
						secure: false, // true for 465, false for other ports
						auth: {
							user: 'alexandriauniversity7@gmail.com', // generated ethereal user
							pass: 'Unified7!!'  // generated ethereal password
						},
						tls: {
							rejectUnauthorized: false
						}
					});

					let mailOptions = {
						from: '"Alexandria University" <alexandriauniversity7@gmail.com>', // sender address
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

						res.render('contact', { msg: 'Email has been sent' });
					});

				});
				//response.status(200).send("Student added successfully");
				console.log("student added successfully");
				if (error) throw error;
			});
		});
		console.log("yaaay");
		response.redirect("/documents");
	}
});

router.get('/documents', function (request, response, next) {
	response.sendFile(__dirname + '/documents.html');
	//console.log('its anhoon11');

});

router.post('/nominationcard', function (request, response) {

	var nominationCard = request.body.nominationCard || " ";
	//var email = request.body.email;

	if (request.session.loggedin) {

		connection.query('USE AlexUni');
		connection.query("UPDATE Students SET NominationCard = ? WHERE Email = ? ", [nominationCard, email], function (error, results, fields) {
			console.log("yoooooooh");
		});
		response.send("Nomination card added");

	}
});

router.post('/photo', function (request, response) {

	var photo = request.body.photo || " ";
	//var email = request.body.email;

	if (request.session.loggedin) {

		connection.query('USE AlexUni');
		connection.query("UPDATE Students SET Photo = ? WHERE Email = ? ", [photo, email], function (error, results, fields) {
			console.log("yoooooooh");
		});
		response.send("Photo added");

	}
});

router.post('/highschoolcertificate', function (request, response) {

	var highschoolcertificate = request.body.highschoolcertificate || " ";
	//var email = request.body.email;

	if (request.session.loggedin) {

		connection.query('USE AlexUni');
		connection.query("UPDATE Students SET highschoolCertificate = ? WHERE Email = ? ", [highschoolcertificate, email], function (error, results, fields) {
			console.log("yoooooooh");
		});
		response.send("High school Certificate added");

	}
});

router.post('/birthcertificate', function (request, response) {

	var birthcertificate = request.body.birthcertificate || " ";
	//var email = request.body.email;

	if (request.session.loggedin) {

		connection.query('USE AlexUni');
		connection.query("UPDATE Students SET birthCertificate = ? WHERE Email = ? ", [birthcertificate, email], function (error, results, fields) {
			console.log("yoooooooh");
		});
		response.send("Birth Certificate added");

	}
});

router.post('/nationalid', function (request, response) {

	var nationalid = request.body.nationalid || " ";
	//var email = request.body.email;

	if (request.session.loggedin) {

		connection.query('USE AlexUni');
		connection.query("UPDATE Students SET Nationalid = ? WHERE Email = ? ", [nationalid, email], function (error, results, fields) {
			console.log("yoooooooh");
		});
		response.send("National ID added");

	}
});