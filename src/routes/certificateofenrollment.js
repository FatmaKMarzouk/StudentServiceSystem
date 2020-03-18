var connection = require('../controllers/dbconnection');
var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.get('/certificateofenrollment', function(req,res,next){
    var username = req.session.username;
    console.log('gowa el certificate '+username);
    var resultobject1='';
    var resultobject2='';
    connection.query('Use AlexUni');
    connection.query('SELECT * FROM Students WHERE Username = ?', [username], function(err,results,field){
        if(results.length>0)
        {
            Object.keys(results).forEach(function(key) {
                var row = results[key];
                resultobject1 = {
                    fullnameEN: row.NameEn,
                    fullnameAR: row.NameAr,
                    faculty: row.Faculty,
                    program: row.Program

                };
                res.send('1st result: ' + resultobject1);
                return;
                });
             /*   console.log("1st result " + results);
                res.send(`${results}\n2nd results\n`);*/
        }
    });
    connection.query('Use IntegratedData');
    connection.query('SELECT GPA FROM Student WHERE ID = ?', [username], function(err,results,field){
        if(results.length>0)
        {
              Object.keys(results).forEach(function(key) {
                var row = results[key];
                resultobject2 = {
                    term: row.Semester,
                    gpa: row.GPA
                };
                console.log(term,gpa);
                return;
                });
        }
    //    res.send('\n2nd Result\n' + results);
    });
        //res.send('result 1: ' + resultobject1 + '\n\n\n\n result 2: ' + resultobject2);
});