var mysql = require("mysql");
var express = require("express");
var router = express.Router();
module.exports = router;
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var courses = [];
var fees = "";

var resultobject1 = "";
var termGpa = "";

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(bodyParser.json());
var connection = require("../controllers/dbconnection");

router.get("/transcript", function (request, response, next) {
  if (request.user) {
    var username = request.user.username;
    var id = "";
    var name = "";
    var flag = 1;
    var totalReg = "";
    var totalEarned = "";

    connection.query("USE IntegratedData");
    connection.query(
      "SELECT ID,Name,ProgramName,TotalRegHours,TotalEarnedHours FROM Student WHERE ID = ? ",
      [username],
      function (error, results, fields) {
        var info = [];
        if (results.length > 0) {
          Object.keys(results).forEach(function (key) {
            row1 = results[key];
            id = row1.ID;
            prog = row1.ProgramName;
            name = row1.Name;
            totalReg = row1.TotalRegHours;
            totalEarned = row1.TotalEarnedHours;
          });

          console.log(id, name, prog, totalReg, totalEarned);
          connection.query("USE IntegratedData");
          connection.query(
            "SELECT CourseName,Grade,Semester FROM EnrolledCourses WHERE StudentID = ?  ORDER BY SemesterNum ASC",
            [id],
            function (error, results2, fields) {
              if (results2.length > 0) {
                Object.keys(results2).forEach(function (key) {
                  resultobject1 =results2 ;
                });
                connection.query("USE IntegratedData");
                connection.query(
                  "SELECT Semester,GPA,regHours FROM Semesters WHERE StudentID = ?",
                  [id],
                  function (error, results4, fields) {
                    if (results4.length > 0) {
                      Object.keys(results4).forEach(function (key) {
                        termGpa =results4 ;
                      });
                      response.send({resultobject1,termGpa});
                    } else {
                      response.send("Wrong ID");
                    }
                  }
                );
              } else {
                response.send("no registered courses");
                flag = 0;
              }
            }
          );
        } else {
          response.send("Not a registered student");
          flag = 0;
        }
      }
    );
  } else {
    response.send("Please login to view this page!");
  }
});
router.get("/transcriptconfirm", function (request, response, fields) {
  if (request.session.loggedin) {
    var username = request.session.username;
    var paid = "";
    var flag = 1;
    connection.query("USE AlexUni");
    connection.query(
      "SELECT Paid FROM Payment WHERE StudentID = ? ",
      [username],
      function (error, results3, fields) {
        if (results3.length > 0) {
          Object.keys(results3).forEach(function (key) {
            var row3 = results3[key];
            paid = row3.Paid;
          });
          if (paid) {
            if (flag == 1) {
              connection.query("USE AlexUni");
              connection.query(
                'SELECT * FROM Services WHERE Name = "Request Transcript" ',
                function (error, results4, fields) {
                  if (results4.length > 0) {
                    Object.keys(results4).forEach(function (key) {
                      var row = results4[key];
                      fees = row.Fees;
                    });
                    connection.query("USE AlexUni");
                    connection.query(
                      "INSERT INTO Requests (StudentID,ServiceName,Amount,FacultyName) VALUES( ?,?,?,? ) ",
                      [
                        username,
                        "Request Transcript",
                        fees,
                        "Faculty of Engineering",
                      ]
                    );
                    response.redirect("/cart");
                  } else {
                    console.log("No such service");
                  }
                }
              );
            }
          } else {
            response.send("You haven't paid fees");
            flag = 0;
          }
        } else {
        }
      }
    );
  } else {
    response.send("Please log in");
  }
});
