var connection = require("../controllers/dbconnection");
var mysql = require("mysql");
var express = require("express");
var router = express.Router();
module.exports = router;
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

var resultobject1 = "";
var resultobject2 = "";
var allresults = "";
var faculty = "";

router.get("/certificateofenrollment", function (req, res, next) {
  //res.sendFile(__dirname+'/certificateofenrollment.html');
  //var username = 1;
  var username = req.user.username;
  console.log("REQ.USER TEST");
  console.log(req.user);
  console.log("REQ.USER TEST END");
  console.log("THE USERNAME REACHED TO API:");
  console.log(username);
  connection.query("Use AlexUni");
  connection.query(
    "SELECT Students.NameEN, Students.NameAr, Students.Faculty, Students.Program, Students.armypostpone, Students.Gender, Payment.Paid FROM Students RIGHT JOIN Payment ON Students.ID=Payment.StudentID WHERE Students.Username = ?",
    [username],
    function (err, results, field) {
      if (results.length > 0) {
        Object.keys(results).forEach(function (key) {
          var row = results[key];
          resultobject1 = row;
          faculty = row.Faculty;
        });
        return;
      }
    }
  );
  connection.query("Use IntegratedData");
  connection.query(
    "SELECT GPA,Semester FROM Student WHERE ID = ?",
    [username],
    function (err, results, field) {
      if (results.length > 0) {
        Object.keys(results).forEach(function (key) {
          var row = results[key];
          resultobject2 = row;
          //console.log(row);
          return;
        });

        allresults = { ...resultobject1, ...resultobject2 };
        console.log("All resultsssssssss");
        console.log(allresults);
        res.status(200).json(allresults);
      }
    }
  );
});
router.get("/cart-test", function (req, res, next) {
  if (req.user) {
    var username = req.user.username;
    var flag = 1;
    if (allresults.Gender === "Male") {
      if (!allresults.Paid && allresults.armypostpone) {
      //   // res.json(allresults);
      // } else {
        flag = 0;
        res.status(400).send({
          error:true,
          message:"You are not eligible for extracting certificate of enrollment as fees are not paid or your army postponing papers are not done."
        });
      }
      
    } else {
      if (!allresults.Paid) {
      //   // res.json(allresults);
      // } else {
        res.status(400).send({
          error:true,
          message:"You are not eligible for extracting certificate of enrollment as fees are not paid."
        });
        flag = 0;
      }
    }
    if (flag == 1) {
      connection.query("USE AlexUni");
      connection.query(
        'SELECT * FROM Services WHERE Name = "Certificate of Enrollment" ',
        function (error, results1, fields) {
          if (results1.length > 0) {
            Object.keys(results1).forEach(function (key) {
              var row = results1[key];
              fees = row.Fees;
            });
            connection.query("USE AlexUni");
            connection.query(
              "INSERT INTO Requests (StudentID,ServiceName,Data,Amount,FacultyName) VALUES( ?,?,?,?,? ) ",
              [
                username,
                "Certificate of Enrollment",
                JSON.stringify(allresults),
                fees,
                faculty,
              ]
            );
            res.status(200).send();
            // res.redirect("/cart");
          } else {
            res.status(400).send({
              error:true,
              message:"No such service"
            });
            console.log("No such service");
          }
        }
      );
    }
  } else {
    res.status(400).send({
      error:true,
      message:"Please log in to view this page!"
    });
    console.log("Please log in to view this page!");
  }
});
