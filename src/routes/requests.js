var mysql = require("mysql");
var express = require("express");
var router = express.Router();
module.exports = router;
var session = require("express-session");
var bodyParser = require("body-parser");
var request = require("request");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var connection = require("../controllers/dbconnection");
var facultysec;
var resultall = "";
var resultsearch = "";

router.get("/allrequests", function (request, response) {
  if (request.user) {
    var secusername = request.user.username;
    connection.query("USE AlexUni");
    connection.query(
      "SELECT FacultyName FROM Secretary WHERE ID = ? ",
      [secusername],
      function (error, results, fields) {
        if (results.length > 0) {
          Object.keys(results).forEach(function (key) {
            var row = results[key];
            facultysec = row.FacultyName;
            console.log("helloooo");
          });
          connection.query("USE AlexUni");
          connection.query(
            "SELECT ID,StudentID,ServiceName,Data,Amount,Paid,DatePaid,done,received,document FROM Requests WHERE FacultyName = ? && Paid = ?",
            [facultysec, "1"],
            function (error, results, fields) {
              if (results.length > 0) {
                console.log("ana hena");
                response.status(200).json({
                  error: false,
                  results,
                });
                console.log(results);
              } else {
                response.status(401).send({
                  error: true,
                  message: "No requests",
                });
              }
            }
          );
        } else {
          console.log("3aaaaaaaaaaaa");
          response.status(401).send({
            error: true,
            message: "Something went wrong. Please try again",
          });
        }
      }
    );
  } else {
    response.status(401).send({
      error: true,
      message: "Please log in to view this page!",
    });
  }
});

router.get("/undonerequests", function (request, response) {
  if (request.user) {
    var secusername = request.user.username;
    var array = [];

    connection.query("USE AlexUni");
    connection.query(
      "SELECT FacultyName FROM Secretary WHERE ID = ?",
      [secusername],
      function (error, results, fields) {
        if (results.length > 0) {
          Object.keys(results).forEach(function (key) {
            var row = results[key];
            facultysec = row.FacultyName;
          });
        } else {
          console.log("3aaaaaaaaaaaa");
          response.status(401).send({
            error: true,
            message: "Something went wrong. Please try again",
          });
        }

        connection.query("USE AlexUni");
        connection.query(
          "SELECT ID,StudentID,ServiceName,Data,Amount,Paid,DatePaid,done,received,document FROM Requests WHERE FacultyName = ? && done = ? && Paid = ?",
          [facultysec, "0", "1"],
          function (error, results, fields) {
            if (results.length > 0) {
              console.log("ana hena2");
              Object.keys(results).forEach(function (key) {
                var row = results[key];
                array.push(results[key]);
              });
              response.status(200).send({
                error: false,
                array,
              });
            } else {
              response.status(401).send({
                error: true,
                message: "No undone requests",
              });
            }
          }
        );
      }
    );
  } else {
    response.status(401).send({
      error: true,
      message: "Please log in to view this page!",
    });
  }
});

/*router.get('/search', function (request, response, next) {
	response.sendFile(__dirname + '/searchrequest.html');

});*/
router.post("/searchrequests", function (request, response) {
  if (request.user) {
    var studentid = request.body.studentid;
    var array2 = [];
    console.log("hiiiiiiiiiiiiiiiii");
    if (request.user) {
      var secusername = request.user.username;

      connection.query(
        "SELECT ID,StudentID,ServiceName,Data,Amount,Paid,DatePaid,done,received,document FROM Requests WHERE StudentID = ? && Paid=1",
        [studentid],
        function (error, results, fields) {
          if (results.length > 0) {
            Object.keys(results).forEach(function (key) {
              var row = results[key];
              array2.push(results[key]);
            });
            console.log("ana hena3");
            response.status(200).send({
              error: false,
              array2,
            });
          } else {
            response.status(401).send({
              error: true,
              message: "No request with this ID",
            });
          }
        }
      );
    } else {
      response.status(401).send({
        error: true,
        message: "Please log in to view this page!",
      });
    }
  } else {
    response.status(401).send({
      error: true,
      message: "Please log in to view this page!",
    });
  }
});

router.post("/requestdone", function (request, response) {
  //var studentid = request.body.studentid;
  var array2 = [];
  console.log("hiiiiiiiiiiiiiiiii");
  if (request.user) {
    var reqID = request.body.reqID;
    console.log(reqID);
    connection.query("USE AlexUni");
    connection.query("UPDATE Requests SET done = 1 WHERE ID = ?", [reqID]);
    response.status(200).send({
      error: false,
      message: "Request done",
    });
  } else {
    response.status(401).send({
      error: true,
      message: "Please log in to view this page!",
    });
  }
});
