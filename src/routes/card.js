var connection = require("../controllers/dbconnection");
var mysql = require("mysql");
var express = require("express");
var dateFormat = require("dateformat");
var router = express.Router();
module.exports = router;
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

var cardobject = {};
var allresults = {};

router.get("/card", function (req, res, next) {
  if (req.user) {
    console.log("in card API");
    //res.sendFile(__dirname+'/card.html');
    var username = req.user.username;
    connection.query("Use AlexUni");
    connection.query(
      "SELECT Students.NameEN, Students.NameAr, Students.Faculty, Students.Program, Students.Gender, Students.Username, Students.Photo, Students.SSN, Payment.last_payment FROM Students RIGHT JOIN Payment ON Students.ID=Payment.StudentID WHERE Students.Username = ?",
      [username],
      function (err, results, field) {
        if (results.length > 0) {
          Object.keys(results).forEach(function (key) {
            cardobject = { ...cardobject, ...results };
            //cardobject = results;
          });
          /* console.log("bada2t teba3a cardobject barra");
                    cardobject = JSON.stringify(cardobject);
                    console.log(cardobject);
                    console.log("5allast teba3a cardobject barra");*/
          allresults = cardobject;
          console.log("bada2t allresults");
          console.log(allresults);
          console.log("5allast allresults");
          res.status(200).json(cardobject[0]);
          return;
        }
      }
    );
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
  } else {
    return res.status(400).send({
      error: true,
      message: "Please login to view this page!",
    });
  }
});

router.get("/cardcart", function (req, res, next) {
  if (req.user) {
    var username = req.user.username;
    var flag = 1;
    console.log("in cardcart api");
    console.log(allresults[0].Gender);
    var paid = 1;
    allresults.last_payment = new Date(allresults.last_payment);
    allresults.last_payment.setDate(allresults.last_payment.getDate() + 366);
    var date = new Date();
    var diff = date.getTime() - allresults.last_payment.getTime();
    diff = diff / (1000 * 3600 * 24);
    diff = parseInt(diff / 365) + 1;
    if(diff<=0){
       paid =1;
    }
    else{
      paid=0;
    }
    if (paid==0) {
      flag = 0;
      res.status(400).send({
        error: true,
        message:
          "You are not eligible for extracting a student card as fees are not paid.",
      });
    }

    if (flag == 1) {
      connection.query("USE AlexUni");
      connection.query(
        "INSERT INTO Requests (StudentID,ServiceName,Data,Amount,FacultyName) VALUES( ?,?,?,?,? ) ",
        [
          username,
          "Student Card",
          JSON.stringify(allresults),
          "50",
          "Faculty of Engineering",
        ]
      );
      res.status(200).send({
        error: false,
        message: "Successfully added to cart!",
      });
      //res.redirect('/cart');
    }
  } else {
    res.status(400).send({
      error: true,
      message: "Please login to view this page!",
    });
  }
});
