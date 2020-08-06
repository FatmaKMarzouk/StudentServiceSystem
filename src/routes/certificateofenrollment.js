var connection = require("../controllers/dbconnection");
//var msopdf = require('node-msoffice-pdf');
var mysql = require("mysql");
var express = require("express");
var dateFormat = require("dateformat");
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var officegen = require('officegen')
var fs = require('fs')
var resultobject1 = '';
var resultobject2 = '';
var allresults = '';
var faculty = '';
var program = '';
var namear='';

router.get("/certificateofenrollment", function (req, res, next) {
  if (req.user) {
    var username = req.user.username;
    console.log("REQ.USER TEST");
    console.log(req.user);
    console.log("REQ.USER TEST END");
    console.log("THE USERNAME REACHED TO API:");
    console.log(username);
    connection.query("Use AlexUni");
    connection.query("SELECT Students.NameEN, Students.NameAr, Students.Faculty, Students.Program, Students.armypostpone, Students.Gender, Payment.last_payment FROM Students RIGHT JOIN Payment ON Students.ID=Payment.StudentID WHERE Students.Username = ?",
      [username],
      function (err, results, field) {
        if (results.length > 0) {
          Object.keys(results).forEach(function (key) {
            var row = results[key];
            resultobject1 = row;
            faculty = row.Faculty;
            program = row.Program;
            namear = row.NameAr;
          });


    connection.query("Use IntegratedData");
    connection.query("SELECT GPA,Semester FROM Student WHERE ID = ?",
      [username],
      function (err, results, field) {
        if (results.length > 0) {
          Object.keys(results).forEach(function (key) {
            var row = results[key];
            resultobject2 = row;
          });

          allresults = { ...resultobject1, ...resultobject2 };
          console.log("All resultsssssssss");
          console.log(allresults);
          res.status(200).json(allresults);

        // Create an empty Word object:
        let docx = officegen('docx');

        // Officegen calling this function after finishing to generate the docx document:
        docx.on('finalize', function (written) {
          console.log(
            'Finish to create a Microsoft Word document.'
          )
        })

        // Officegen calling this function to report errors:
        docx.on('error', function (err) {
          console.log(err)
        })

        // Create a new paragraph:


        pObj = docx.createP({
          align: 'right'
        })

        // We can even add images:
        pObj.addImage(path.resolve(__dirname, 'uni_logoo.png'), {
          cx: 120,
          cy: 120
        })
        pObj.addLineBreak()
        pObj = docx.createP({
          align: 'center'
        })
        pObj.addText("(شهادة قيد)")
        pObj = docx.createP({
          align: 'right'
        })
        pObj.addText(faculty)
        pObj.addText(" تشهد كلية")

        pObj.addLineBreak()
        pObj.addText("    بأن الطالب/الطالبة    ")
        pObj.addText(namear)


        pObj.addLineBreak()

        pObj.addText("    مقيد(ة) بالفرقة / الرابعة   ")

        pObj.addLineBreak()
        pObj.addText(program)
        pObj.addText("    شعبة / التخصص    ")

        pObj.addLineBreak()
        pObj.addText(allresults.GPA.toString(10))
        pObj.addText("   التقدير العام  ")

        pObj.addLineBreak()
        pObj.addText(allresults.Semester)
        pObj.addText("   وذلك في العام الجامعي   ")

        pObj.addLineBreak()
        pObj.addText(" وقد اعطيت له هذه الشهادة بناء علي طلبه من واقع ملف اوراقه وذلك لتقديمها الي ")
        pObj.addLineBreak()
        pObj.addText("            المختص")

        pObj.addText("             رئيس القسم")

        pObj.addText("              مدير الادارة    ")

        pObj.addText("            يعتمد   ")


        // Let's generate the Word document into a file:
        let out = fs.createWriteStream('enrollment.docx')
        out.on('error', function (err) {
          console.log(err)
        })

        // Async call to generate the output file:
        docx.generate(out)
        console.log('done api 1')
          }

      });
        }
    });

  } else {
    return res.status(400).send({
      error: true,
      message: "!رجاء تسجيل الدخول"
    });
  }
});


router.get("/certificatecart", function (req, res, next) {
  if (req.user) {
    var username = req.user.username;
    var flag = 1;
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
    if (allresults.Gender === "Male") {
      if (paid==0 && allresults.armypostpone) {
        //   // res.json(allresults);
        // } else {
        flag = 0;
        res.status(400).send({
          error: true,
          message: " يجب دفع المصاريف السنوية و تأجيل التجنيد اولا"
        });
      }

    }
    else {
      if (paid==0) {
        //   // res.json(allresults);
        // } else {
        flag = 0;
        res.status(400).send({
          error: true,
          message: "يجب دفع المصاريف السنويةاولا"
        });
      }
    }
    if (flag == 1) {
      connection.query("USE AlexUni");
      connection.query('SELECT * FROM Services WHERE Name = "Certificate of Enrollment" ',
        function (error, results1, fields) {
          if (results1.length > 0) {
            Object.keys(results1).forEach(function (key) {
              var row = results1[key];
              fees = row.Fees;
            });

              fs.readFile('./enrollment.docx', function (_err, data) {
                connection.query('USE AlexUni');
                connection.query("INSERT INTO Requests (StudentID,ServiceName,Data,Amount,FacultyName,document) VALUES( ?,?,?,?,?,? ) ",[username, "Certificate of Enrollment", JSON.stringify(allresults), fees, faculty, data]);
                res.status(200).send({
                  error: false,
                  message: "!تم بنجاح",
                });
              })

            // res.redirect("/cart");
          }
          else {
            res.status(400).send({
              error: true,
              message: "No such service"
            });
            //console.log("No such service");
          }
        });
      }

    } else {
      res.status(401).send({
        error: true,
        message: "!رجاء تسجيل الدخول"
      });
    }
});
