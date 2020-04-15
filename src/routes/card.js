var connection = require('../controllers/dbconnection');
var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var resultobject1='';
var allresults='';

router.get('/card', function(req,res,next)
{  
    if(req.session.loggedin)
    {
    res.sendFile(__dirname+'/card.html');
    var username = req.session.username;
    connection.query('Use AlexUni');
    connection.query('SELECT Students.NameEN, Students.NameAr, Students.Faculty, Students.Program, Students.Gender, Students.Username, Payment.Paid FROM Students RIGHT JOIN Payment ON Students.ID=Payment.StudentID WHERE Students.Username = ?', [username], function(err,results,field){
        if(results.length>0)
        {
            Object.keys(results).forEach(function(key) {
                var row = results[key];
                resultobject1=row;
                });
                return;
        }
    });
    /*connection.query('Use IntegratedData');
    connection.query('SELECT GPA,Semester FROM Student WHERE ID = ?', [username], function(err,results,field){
        if(results.length>0)
        {
            Object.keys(results).forEach(function(key) {
                var row = results[key];
                resultobject2=row;
                //console.log(row);
                return;
                });

                console.log(allresults);
        }
    });*/
    allresults = {resultobject1};
    }
    else
    {
    res.send("Please log in to view this page!");
    }
});


router.get('/cart-test1', function(req,res,next)
{     if(req.session.loggedin){
    var username = req.session.username;
    var flag =1;
            if(allresults.Paid)
            {
                res.json(allresults);
                console.log(allresults);
            }
            else
            {
                res.send('You are not eligible for extracting certificate of enrollment as fees are not paid.');
                console.log('You are not eligible for extracting certificate of enrollment as fees are not paid.');
                flag=0;
            }
        
            if(flag == 1){
                connection.query('USE AlexUni');
                connection.query('INSERT INTO Requests (StudentID,ServiceName,Data,Amount,FacultyName) VALUES( ?,?,?,?,? ) ',[username,"Certificate of Enrollment",JSON.stringify(allresults),"50","Faculty of Engineering"]);
                res.redirect('/cart');
            }
}
else{
console.log("Please log in to view this page!")
}
});
