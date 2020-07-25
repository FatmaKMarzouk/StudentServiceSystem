var connection = require("../controllers/dbconnection");
//var msopdf = require('node-msoffice-pdf');
var convertapi = require('convertapi')('hG9EhwYoIPrtKMrw');
var mysql = require("mysql");
var express = require("express");
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
    connection.query("SELECT Students.NameEN, Students.NameAr, Students.Faculty, Students.Program, Students.armypostpone, Students.Gender, Payment.Paid FROM Students RIGHT JOIN Payment ON Students.ID=Payment.StudentID WHERE Students.Username = ?",
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
      message: "Please login to view this page!"
    });
  }
});


router.get("/certificatecart", function (req, res, next) {
  if (req.user) {
    var username = req.user.username;
    var flag = 1;
    if (allresults.Gender === "Male") {
      if (!allresults.Paid && allresults.armypostpone) {
        //   // res.json(allresults);
        // } else {
        flag = 0;
        res.status(400).send({
          error: true,
          message: "You are not eligible for extracting certificate of enrollment as fees are not paid or your army postponing papers are not done."
        });
      }

    }
    else {
      if (!allresults.Paid) {
        //   // res.json(allresults);
        // } else {
        flag = 0;
        res.status(400).send({
          error: true,
          message: "You are not eligible for extracting certificate of enrollment as fees are not paid."
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

            convertapi.convert('pdf', { File: './enrollment.docx' })
            .then(function(result) {
              return result.file.save('./enrollment.pdf');
            })
            .then(function(file) {
              console.log("File saved: " + file);
              fs.readFile('./enrollment.pdf', function (_err, data) {
                connection.query('USE AlexUni');
                connection.query("INSERT INTO Requests (StudentID,ServiceName,Data,Amount,FacultyName,document) VALUES( ?,?,?,?,?,? ) ",[username, "Certificate of Enrollment", JSON.stringify(allresults), fees, faculty, data]);
               res.status(200).send("submit successfully");
              })
            })
            .catch(function(e) {
              console.error(e.toString());
            });


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
        message: "Please log in to view this page!"
      });
    }
});
/*router.get('/cart-test', function(req,res,next)
{     if(req.session.loggedin){
      var username = req.session.username;
      var flag =1;
                if(allresults.Gender==='Male')
                {
                    if(allresults.Paid && allresults.armypostpone)
                    {
                        // res.json(allresults);
                    }
                    else
                    {
                         res.send('You are not eligible for extracting certificate of enrollment as fees are not paid or your army postponing papers are not done.');
                         flag =0;
                    }
                }
                else
                {
                    if(allresults.Paid)
                    {
                        // res.json(allresults);
                    }
                    else
                    {
                        res.send('You are not eligible for extracting certificate of enrollment as fees are not paid.');
                        flag=0;
                    }
                }
                if(flag == 1){
                  connection.query('USE AlexUni');
                  connection.query('SELECT * FROM Services WHERE Name = "Certificate of Enrollment" ',function(error,results1,fields){
                    if(results1.length>0){
                      Object.keys(results1).forEach(function(key){
                        var row = results1[key];
                        fees = row.Fees;
                      });

                      fs.readFile('./enrollment.docx', function (err, data) {
                      connection.query('USE AlexUni');
                    connection.query('INSERT INTO Requests (StudentID,ServiceName,Data,Amount,FacultyName,document) VALUES( ?,?,?,?,?,? ) ',[username,"Certificate of Enrollment",JSON.stringify(allresults),fees,faculty,data]);
                    res.redirect('/cart');
                      })

                    }
                    else {
                      console.log('No such service');
                    }

                });
              }
}
else{
  console.log("Please log in to view this page!")
}
});*/
