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
    response.sendFile(__dirname+'/chooseprog.html');
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

router.post('/submitprog', function(request, response,next) {
  var currentprog="";
  if (request.session.loggedin) {
    response.send('success');
    var username = request.session.username;
    var program = request.body.selectedprogram;
    connection.query('USE AlexUni');
    connection.query('SELECT Program FROM Students WHERE ID =?',[username],function(error,results0, fields){
      if(results0.length>0){
        Object.keys(results0).forEach(function(key){
          var row = results0[key];
          currentprog = row.Program;
        });

    if(currentprog=="General" || currentprog=="General SSP"){
    connection.query('USE IntegratedData');
    connection.query('SELECT ReqGPA FROM Program WHERE Name = ? ', [program], function(error, results1, fields) {
			if (results1.length>0) {
        Object.keys(results1).forEach(function(key) {
        var row = results1[key];
        reqgpa = row.ReqGPA;
        });
        connection.query('USE IntegratedData');
        connection.query('SELECT GPA FROM Student WHERE ID = ? ',[username],function(error, results2, fields){
          if (results2.length>0){
            Object.keys(results2).forEach(function(key) {
            var row = results2[key];
            gpa = row.GPA;
            });
            if(gpa>=reqgpa){
              connection.query('USE AlexUni');
              connection.query('UPDATE Students SET Program = ? WHERE ID =?',[program,username]);
            }
            else {
              console.log('Your GPA doesn"t meet the minimum required grade for this program');
            }
          }
        });
      }
    });
  }
  else{
    console.log("You have already chosen a program. Please Contact the secretary office for transfers.")
  }
}
});
  } else {
    response.send('Please login to view this page!');
  }

});
