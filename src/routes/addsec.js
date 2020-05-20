var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');
var facultysec;
var adminsec;
var nodemailer = require('nodemailer');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

var connection = require('../controllers/dbconnection');

router.get('/addsec', function(request, response,next) {
	response.sendFile(__dirname+'/addsec.html');
	//console.log('its anhoon11');

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

        connection.query('SELECT admin FROM Secretary WHERE ID = ? ',[secusername] ,  function(error, results, fields){

			if(results.length>0){
				Object.keys(results).forEach(function(key){
				  var row = results[key];
				  adminsec = row.admin;
			      console.log(adminsec); 
				});}
			else {
			 	console.log("3aaaaaaaaaaaa");
			   }
        });
	}

});

router.post('/add',function(request, response) {


    var name = request.body.name;
    var email = request.body.email;
    var admin = request.body.admin;

    connection.query('USE AlexUni');

		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$/%&';
		var charactersLength = characters.length;
		for ( var i = 0; i < 10; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        if(adminsec == 1){

            response.send('Employee has been added successfully');
            
        connection.query('INSERT INTO Secretary (Name,email,FacultyName,Password) VALUES( ?, ?, ?, ?) ',[name, email, facultysec, result] ,  function(error, results, fields){

			if(admin == 'admin'){
				connection.query("UPDATE Secretary SET admin = b'1' WHERE email = ? ",[email], function(error, results,fields){

               });
			}

			connection.query("UPDATE Secretary SET Username = ID WHERE email = ? ",[email], function(error, results,fields){
			});

			connection.query("SELECT Username FROM Secretary WHERE email = ? ",[email], function(error, results1,fields){
				if(results1.length>0){
					Object.keys(results1).forEach(function(key){
					  var row = results1[key];
					  user = row.Username;
					  console.log(user); 
					  return user;
					});}
					const output = `
					<p>You have been accepted to work in Alexandria University</p>
					<h3>Contact Details</h3>
					<ul>  
					<li>Username: ${user}</li>
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
			  
					res.render('contact', {msg:'Email has been sent'});
				});
				
			});

			if (error) throw error;


        });
    }
    else {
        response.send('You are not allowed to add other employees');
    }


});