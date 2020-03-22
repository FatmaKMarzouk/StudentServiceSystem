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
    connection.connect
    connection.query('Use AlexUni');
    connection.query('SELECT Students.NameEN, Students.NameAr, Students.Faculty, Students.Program, Students.armypostpone, Students.Gender, Payment.Paid FROM Students RIGHT JOIN Payment ON Students.ID=Payment.ID WHERE Students.Username = ?', [username], function(err,results,field){
        if(results.length>0)
        {
            Object.keys(results).forEach(function(key) {
                var row = results[key];
                //console.log(row);
                resultobject1=row;
                });
                return;
             /*   console.log("1st result " + results);
                res.send(`${results}\n2nd results\n`);*/
        }
    });
    connection.query('Use IntegratedData');
    connection.query('SELECT GPA,Semester FROM Student WHERE ID = ?', [username], function(err,results,field){
        if(results.length>0)
        {
            Object.keys(results).forEach(function(key) {
                var row = results[key];
                resultobject2=row;
                //console.log(row);
                return;
                });

                let allresults = { ...resultobject1, ...resultobject2 };
                console.log('ALLRESULTS:    ');
                console.log(allresults);
                if(allresults.Gender='Male')
                {
                    if(allresults.Paid && allresults.armypostpone) 
                    {
                        console.log(allresults);
                        res.json(allresults);
                    }
                    else
                    {
                         res.send('You are not eligible for extracting certificate of enrollment as fees are not paid or your army postponing papers are not done.');
                    }
                } 
                else 
                {
                    if(allresults.Paid)
                    {
                        console.log(allresults);
                        res.json(allresults);
                    } 
                    else 
                    {
                        res.send('You are not eligible for extracting certificate of enrollment as fees are not paid.');
                    }
                }
                }
    });
        
});
