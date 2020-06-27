var mysql = require("mysql");
var express = require("express");
var router = express.Router();
var dateFormat = require("dateformat");
exports.router = router;
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var info = {};
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var connection = require("../controllers/dbconnection");
var username = "";
router.get("/chooseprog", function (request, response, next) {
  console.log("inside chooseprog API");
  if (request.user) {
    // response.sendFile(__dirname+'/chooseprog.html');
    username = request.user.username;
    var facultyname = "";
    var ssp = "";
    connection.query("USE AlexUni");
    connection.query(
      "SELECT Faculty,SSP FROM Students WHERE Username = ? ",
      [username],
      function (error, results1, fields) {
        if (results1.length > 0) {
          Object.keys(results1).forEach(function (key) {
            var row = results1[key];
            facultyname = row.Faculty;
            ssp = row.SSP;
          });
          connection.query("USE AlexUni");
          connection.query(
            "SELECT Name FROM Program WHERE FacultyName = ? AND SSP = ?",
            [facultyname, ssp],
            function (error, results2, fields) {
              if (results2.length > 0) {
                console.log("bada2t teba3a results2");
                console.log(results2);
                console.log("bada2t teba3a results2");
                response.status(200).send(results2);
                // console.log(results2);  //To be shown in drop down menu
              } else {
                response.status(400).send({
                  error: true,
                  message: "no valid program available",
                });
              }
            }
          );
        } else {
          response.status(400).send({
            error: true,
            message: "Incorrect Data!No Faculty name specified",
          });
        }
      }
    );
  } else {
    response.status(400).send({
      error: true,
      message: "Please login to view this page!",
    });
  }
});
router.post("/submitprog", function (request, response, next) {
  console.log("inside submitprog API");
  var currentprog = "";
  if (request.user) {
    console.log("submitprog test 1");
    console.log(request.user.username);
    var flag = 1;
    var username = request.user.username;
    var program = request.body.selectedprogram;
    connection.query("USE AlexUni");
    connection.query(
      "SELECT Program FROM Students WHERE Username =?",
      [username],
      function (error, results0, fields) {
        if (results0.length > 0) {
          console.log("submitprog test 1");
          Object.keys(results0).forEach(function (key) {
            var row = results0[key];
            currentprog = row.Program;
          });
          if (currentprog == "General") {
            connection.query("USE IntegratedData");
            connection.query(
              "SELECT ReqGPA FROM Program WHERE Name = ? ",
              [program],
              function (error, results1, fields) {
                if (results1.length > 0) {
                  console.log("submitprog test 2");
                  Object.keys(results1).forEach(function (key) {
                    var row = results1[key];
                    reqgpa = row.ReqGPA;
                  });
                  connection.query("USE IntegratedData");
                  connection.query(
                    "SELECT GPA FROM Student WHERE ID = ? ",
                    [username],
                    function (error, results2, fields) {
                      if (error) console.log(error);
                      if (results2.length > 0) {
                        console.log("submitprog test 3");
                        Object.keys(results2).forEach(function (key) {
                          var row = results2[key];
                          gpa = row.GPA;
                        });
                        if (gpa >= reqgpa) {
                          console.log("submitprog test 4");
                          connection.query("USE AlexUni");
                          connection.query(
                            "UPDATE Students SET Program = ? WHERE ID =?",
                            [program, username],
                            function (error, res, fields) {
                              if (error) console.log(error);
                            }
                          );
                        } else {
                          flag = 0;
                          response.status(400).send({
                            error: true,
                            message:
                              'Your GPA doesn"t meet the minimum required grade for this program',
                          });
                        }
                      }
                    }
                  );
                }
              }
            );
          } else {
            flag = 0;
            response.status(400).send({
              error: true,
              message:
                "You have already chosen a program. Please Contact the secretary office for transfers.",
            });
          }
          if (flag == 1) {
            var date = dateFormat(new Date(), "yyyy-mm-dd");
            info = {
              studentID: username,
              service: "Choose Program",
              program: program,
              Fee: "0",
              Date: date,
            };
            connection.query("USE AlexUni");
            connection.query(
              "INSERT INTO Requests (StudentID,ServiceName,Data,Amount,Paid,DatePaid,done,received,FacultyName) VALUES( ?,?,?,?,?,?,?,?,? ) ",
              [
                username,
                "Choose Program",
                JSON.stringify(info),
                info.Fee,
                "1",
                info.Date,
                "1",
                "1",
                "Faculty of Engineering",
              ]
            );
            console.log("submitprog test 5");
            console.log("el flag bta3 el response hna ya ali => ");
            response.status(200).send({
              error: false,
              message: "Your Program has been selected successfully",
            });
          }
        }
      }
    );
  } else {
    response.status(400).send({
      error: true,
      message: "Please login to view this page!",
    });
  }
});
