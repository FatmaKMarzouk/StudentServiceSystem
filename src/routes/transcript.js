var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');


router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
var connection = require('../controllers/dbconnection');

router.get('/transcript', function (request, response, next) {
    if (request.session.loggedin) {
        response.sendFile(__dirname + '/transcript.html');
        var username = request.session.username;
        var id = "";
        var name = "";
        connection.query('USE AlexUni');
        connection.query('SELECT ID,NameEn,Program FROM Students WHERE Username = ? ', [username], function (error, results, fields) {
            if (results.length > 0) {
                Object.keys(results).forEach(function (key) {
                    var row1 = results[key];
                    id = row1.ID;
                    prog = row1.Program;
                    name = row1.NameEn;
                });
                console.log(id, name, prog);
                connection.query('USE IntegratedData');
                connection.query('SELECT CourseName,Grade,Semester FROM EnrolledCourses WHERE StudentID = ?  ORDER BY SemesterNum ASC', [id], function (error, results2, fields) {
                    
                    if (results2.length > 0) {

                        Object.keys(results2).forEach(function (key) {
                            var row2 = results2[key];
                            courseName = row2.CourseName;
                            grade = row2.Grade;
                            semester = row2.Semester
                            console.log(courseName, grade, semester);
                        });
                    
                    } else {
                        response.send("no registered courses");
                    }
                });
            
            } else {
                response.send("Not a registered student");
            }




        });



    } else {

        response.send('Please login to view this page!');
    }
});
router.get('/transcriptconfirm', function(request, response,fields) {
    if (request.session.loggedin){

        var username = request.session.username;
        var paid = "";
        connection.query('USE AlexUni');
        connection.query('SELECT Paid FROM Payment WHERE StudentID = ? ', [username], function (error, results3, fields) {
            if (results3.length > 0){ 
                Object.keys(results3).forEach(function (key) {
                    var row3 = results3[key];
                    paid =row3.Paid ;
                     });
                      if (paid){
                          response.send("Request confirmed")
                      }
                    else {
                        response.send("You haven't paid fees")
                    }
                    
                    }
                    else {


                    }
                    
                    
                    });

                }
        
  else {
      response.send('Please log in')
  }
   

   


});
    