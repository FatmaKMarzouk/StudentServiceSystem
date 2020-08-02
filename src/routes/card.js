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
        
          allresults = cardobject;
          console.log("bada2t allresults");
          console.log(allresults);
          console.log("5allast allresults");
          res.status(200).json(cardobject[0]);
          return;
        }
      }
    );

  } else {
    return res.status(400).send({
      error: true,
      message: "!رجاء تسجيل الدخول",
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
    allresults[0].last_payment = new Date(allresults[0].last_payment);
    allresults[0].last_payment.setDate(allresults[0].last_payment.getDate() + 366);
    var date = new Date();
    var diff = date.getTime() - allresults[0].last_payment.getTime();
    diff = diff / (1000 * 3600 * 24);
    diff = parseInt(diff / 365) + 1;
    console.log(diff);
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
        message:  "يجب دفع المصاريف السنويةاولا",
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
        message: "!تم بنجاح",
      });
      //res.redirect('/cart');
    }
  } else {
    res.status(400).send({
      error: true,
      message: "!رجاء تسجيل الدخول",
    });
  }
});
