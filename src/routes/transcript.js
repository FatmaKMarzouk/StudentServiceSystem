var mysql = require("mysql");
var express = require("express");
var router = express.Router();
module.exports = router;
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var courses = "";
const officegen = require("officegen");
const fs = require("fs");
var masterobject1 = "";
var masterobject2 = "";
var name = "";
var id = "";
var flag = 1;
var totalReg = "";
var totalEarned = "";
var totalGPA = "";
var prog = "";
var row1 = {};
var row2 = {};
var row3;
var row4 = {};
var grades = "";
var semesters = "";
var grade = "";
var info1 = [];
var info1sep = [];
var sems = "";
var gpa = "";
var regH = "";
var info2 = [];
var info2sep = [];
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
var fees = "";

var masterobject = "";

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(bodyParser.json());
var connection = require("../controllers/dbconnection");

router.get("/transcript", function (request, response, next) {
  if (request.user) {
    //response.sendFile(__dirname + '/transcript.html');
    var username = request.user.username;

    connection.query("USE IntegratedData");
    // query to extract object row1 (object of totalGPA), query based on username
    connection.query(
      "SELECT ID,Name,ProgramName,TotalRegHours,TotalEarnedHours,GPA FROM Student WHERE ID = ? ",
      [username],
      function (error, results, fields) {
        var info = [];
        // if no username, then student not registered
        if (results.length > 0) {
          Object.keys(results).forEach(function (key) {
            row1arr = results[key];
            row1 = { ...row1, ...results };
            // info.push(results[key]);
            id = row1arr.ID;
            prog = row1arr.ProgramName;
            name = row1arr.Name;
            totalReg = row1arr.TotalRegHours;
            totalEarned = row1arr.TotalEarnedHours;
            totalGPA = row1arr.GPA;
            // console.log(info)
          });

          //console.log(id, name, prog, totalReg, totalEarned);
          console.log("bada2t teba3a row1\n");
          console.log(row1);
          console.log("\n5allast teba3a row1\n");
          connection.query("USE IntegratedData");
          // query to extract object row2, query based on id
          connection.query("USE IntegratedData");
          console.log(id);
          connection.query(
            "SELECT EnrolledCourses.CourseName, EnrolledCourses.Grade, EnrolledCourses.Semester, Courses.ID, Courses.CH FROM EnrolledCourses JOIN Courses ON EnrolledCourses.CourseName = Courses.Name WHERE EnrolledCourses.StudentID = ?  ORDER BY EnrolledCourses.semesterNum ASC",
            [username],
            function (error, results2, fields) {
              if (error) {
                console.log(error);
                throw error;
              }
              if (results2.length > 0) {
                //console.log("loop print");
                Object.keys(results2).forEach(function (key) {
                  row2arr = results2[key];
                  row2 = { ...row2, ...results2 };
                  courses = row2arr.CourseName;
                  grade = row2arr.Grade;
                  semesters = row2arr.Semester;
                  info1.push(
                    courses + " ,Grade: " + grade + " ,Semester: " + semesters
                  );
                  info1sep = info1.join("\n");
                  console.log(results2[key]);
                  //console.log(courses + " " + grade + " " + semesters + "\n")

                  // masterobject1 = {
                  //     ...1,
                  //     ...results2
                  // };
                });
                console.log("loop print end");

                console.log("bada2t teba3a row2\n");
                row2 = JSON.parse(JSON.stringify(row2));
                console.log(row2[18].CourseName);
                console.log("\n5allast teba3a row2\n");
                connection.query("USE IntegratedData");
                connection.query(
                  "SELECT Semester,GPA,regHours FROM Semesters WHERE StudentID = ? ",
                  [username],
                  function (error, results4, fields) {
                    var termGpa = [];
                    if (results4.length > 0) {
                      Object.keys(results4).forEach(function (key) {
                        //  termGpa.push(results4[key]);
                        row4arr = results4[key];
                        row4 = { ...row4, ...results4 };
                        sems = row4arr.Semester;
                        gpa = row4arr.GPA;
                        regH = row4arr.regHours;
                        info2.push(
                          sems + " ,GPA: " + gpa + " ,Registered Hours: " + regH
                        );
                        info2sep = info2.join("\n");
                        // masterobject2 = {
                        //     ...masterobject2,
                        //     ...results4
                        // };
                      });
                      console.log("bada2t teba3a row4\n");
                      // var obj2
                      console.log(row4);
                      console.log("\n5allast teba3a row4\n");
                      response.status(200).send({ row1, row2, row4 });
                      console.log("b3d el response test");
                      // Create an empty Word object:
                      let docx = officegen("docx");

                      // Officegen calling this function after finishing to generate the docx document:
                      docx.on("finalize", function (written) {
                        console.log(
                          "Finish to create a Microsoft Word document."
                        );
                      });

                      // Officegen calling this function to report errors:
                      docx.on("error", function (err) {
                        console.log(err);
                      });

                      // Create a new paragraph:

                      pObj = docx.createP({ align: "center" });

                      // We can even add images:
                      pObj.addImage(path.resolve(__dirname, "uni_logoo.png"), {
                        cx: 120,
                        cy: 120,
                      });

                      pObj = docx.createP({
                        align: "left",
                      });
                      pObj.addText("Student's name :" + name);
                      //pObj.addText(name,{color : '0000A0', bold: true, underline: true})
                      pObj.addLineBreak();
                      pObj.addText("Student's ID : " + id);

                      pObj.addLineBreak();
                      pObj.addText("Student's program : " + prog);

                      pObj.addLineBreak();
                      pObj.addText(
                        "Student's total registered hours : " + totalReg
                      );

                      pObj.addLineBreak();
                      pObj.addText(
                        "Student's total earned hours : " + totalEarned
                      );
                      pObj.addLineBreak();
                      pObj.addText("Student's total GPA : " + totalGPA);
                      //var myobj1 = JSON.stringify(masterobject1);
                      pObj.addLineBreak();
                      pObj.addText("Subject's taken :");

                      pObj.addLineBreak();
                      pObj.addText(info1sep.toString());
                      pObj.addLineBreak();
                      pObj.addText("Semester GPA and registered hours :");
                      pObj.addLineBreak();
                      pObj.addText(info2sep.toString(), { color: "0000FF" });

                      // Let's generate the Word document into a file:
                      let out = fs.createWriteStream("transcript.docx");
                      out.on("error", function (err) {
                        console.log(err);
                      });

                      // Async call to generate the output file:
                      docx.generate(out);

                      info1 = [];
                      info1sep = [];
                      info2 = [];
                      info2sep = [];
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
          response.status(400).send({
            error: true,
            message: "Not a registered student",
          });
        }

        flag = 0;
      }
    );
  } else {
    response.send({
      error: true,
      message: "!رجاء تسجيل الدخول",
    });
  }
});
router.get("/transcriptconfirm", function (request, response, fields) {
  if (request.user) {
    var username = request.user.username;
    var myDate = "";
    var flag = 1;
    var paid =0;
    connection.query("USE AlexUni");
    connection.query(
      "SELECT last_payment FROM Payment WHERE StudentID = ? ",[username],function (error, results3, fields) {
        if (error) throw error;
        if (results3.length > 0) {
          Object.keys(results3).forEach(function (key) {
            var row3 = results3[key];
            myDate = row3.last_payment;
          });
          myDate = new Date(myDate);
          myDate.setDate(myDate.getDate() + 366);
          var date = new Date();
          var diff = date.getTime() - myDate.getTime();
          diff = diff / (1000 * 3600 * 24);
          diff = parseInt(diff / 365) + 1;

          if (diff <= 0) {
            paid=1;
          }
          else{
            paid=0;
          }
          // flag 1
          if (paid==1) {
            if (flag == 1) {
              fs.readFile("./transcript.docx", function (err, data) {
                connection.query("USE AlexUni");
                connection.query(
                  "INSERT INTO Requests (StudentID,ServiceName,ServiceNameِAr,Amount,FacultyName,document) VALUES( ?,?,?,?,?,? ) ",
                  [
                    username,
                    "Request Transcript",
                    "طلب ترانسكريبت",
                    "50",
                    "Faculty of Engineering",
                    data,
                  ]
                );
                //response.redirect('/cart');
                response.status(200).send({
                  error: false,
                  message: "!تم بنجاح",
                });
              });
            }
          } else {
            flag = 0;
            response.status(400).send({
              error: true,
              message: "يجب دفع المصاريف السنويةاولا",
            });
          }
        } else {
          response.status(400).send({
            error: true,
            message: "No data Retrieved",
          });
        }
      }
    );
  } else {
    response.status(400).send({
      error: true,
      message: "!رجاء تسجيل الدخول",
    });
  }
});
