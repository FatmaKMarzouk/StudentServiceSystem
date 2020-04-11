var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var  courses=[]
const officegen = require('officegen')
const fs = require('fs')
var masterobject="";





router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
var connection = require('../controllers/dbconnection');

router.get('/transcript', function (request, response, next) {
    if (request.session.loggedin) {
        response.sendFile(__dirname + '/transcript.html');
        var username = request.session.username;
        var id = "";
        var name = "";
        var flag = 1;
        var totalReg= "";
        var totalEarned= "";
        connection.query('USE IntegratedData');
        connection.query('SELECT ID,Name,ProgramName,TotalRegHours,TotalEarnedHours FROM Student WHERE ID = ? ', [username], function (error, results, fields) {
            var info = [];
            if (results.length > 0) {

                Object.keys(results).forEach(function (key) {
                   row1=results[key]
                    // info.push(results[key]);
                   id = row1.ID;
                    prog = row1.ProgramName;
                    name = row1.Name;
                totalReg =row1.TotalRegHours
                totalEarned = row1.TotalEarnedHours
               // console.log(info)
            });

                console.log(id, name, prog,totalReg,totalEarned);
               connection.query('USE IntegratedData');
                connection.query('SELECT CourseName,Grade,Semester FROM EnrolledCourses WHERE StudentID = ?  ORDER BY SemesterNum ASC', [id], function (error, results2, fields) {

                    if (results2.length > 0) {

                        Object.keys(results2).forEach(function (key) {
                            //courses.push(results2[key]);
                            masterobject = {...masterobject,...results2};
                        });
                              console.log('bada2t teba3a\n');
                              console.log(masterobject);
                              console.log('\n5allast teba3a\n');
                              connection.query('USE IntegratedData');
                              connection.query('SELECT Semester,GPA,regHours FROM Semesters WHERE StudentID = ?',[id],function (error, results4, fields) {
                                    var termGpa = [];
                                  if (results4.length > 0) {

                                      Object.keys(results4).forEach(function (key) {
                                        //  termGpa.push(results4[key]);
                                         masterobject = {...masterobject,...results4};

                                      });
                                      console.log('bada2t teba3a tanyyy\n');
                                      console.log(masterobject);
                                      console.log('\n5allast teba3a tanyyy\n');
                                  }
                                  else{
                                  response.send('Wrong ID');
                                  }

                              });





                            } else {
                        response.send("no registered courses");
                        flag =0;
                    }
                });

            } else {
                response.send("Not a registered student");
                flag=0;
            }




        });



    } else {

        response.send('Please login to view this page!');
    }



});
router.get('/transcriptconfirm', function(request, response,fields) {
    if (request.session.loggedin){

        var username = request.session.username;
        var paid = "";
         var flag=1;
        connection.query('USE AlexUni');
        connection.query('SELECT Paid FROM Payment WHERE StudentID = ? ', [username], function (error, results3, fields) {
            if (results3.length > 0){
                Object.keys(results3).forEach(function (key) {
                    var row3 = results3[key];
                    paid =row3.Paid ;
                     });
                      if (paid){                      
                            // Create an empty Word object:
let docx = officegen('docx')
 
// Officegen calling this function after finishing to generate the docx document:
docx.on('finalize', function(written) {
  console.log(
    'Finish to create a Microsoft Word document.'
  )
})
 
// Officegen calling this function to report errors:
docx.on('error', function(err) {
  console.log(err)
})
 
// Create a new paragraph:
let pObj = docx.createP()
 
pObj.addText('Simple')
pObj.addText(' with color', { color: '000088' })
pObj.addText(' and back color.', { color: '00ffff', back: '000088' })
 
pObj = docx.createP()
 
pObj.addText('Since ')
pObj.addText('officegen 0.2.12', {
  back: '00ffff',
  shdType: 'pct12',
  shdColor: 'ff0000'
}) // Use pattern in the background.
pObj.addText(' you can do ')
pObj.addText('more cool ', { highlight: true }) // Highlight!
pObj.addText('stuff!', { highlight: 'darkGreen' }) // Different highlight color.
 
pObj = docx.createP()
 
pObj.addText('Even add ')
pObj.addText('external link', { link: 'https://github.com' })
pObj.addText('!')
 
pObj = docx.createP()
 
pObj.addText('Bold + underline', { bold: true, underline: true })
 
pObj = docx.createP({ align: 'center' })
 
pObj.addText('Center this text', {
  border: 'dotted',
  borderSize: 12,
  borderColor: '88CCFF'
})
 
pObj = docx.createP()
pObj.options.align = 'right'
 
pObj.addText('Align this text to the right.')
 
pObj = docx.createP()
 
pObj.addText('Those two lines are in the same paragraph,')
pObj.addLineBreak()
pObj.addText('but they are separated by a line break.')
 
docx.putPageBreak()
 
pObj = docx.createP()
 
pObj.addText('Fonts face only.', { font_face: 'Arial' })
pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 })
 
docx.putPageBreak()
 
pObj = docx.createP()
 
// We can even add images:

 
// Let's generate the Word document into a file:
 
let out = fs.createWriteStream('example.docx')
 
out.on('error', function(err) {
  console.log(err)
})
 
// Async call to generate the output file:
docx.generate(out)
                                 
                          if (flag==1){

                          connection.query('USE AlexUni');
                          connection.query('INSERT INTO Requests (StudentID,ServiceName,Amount) VALUES( ?,?,? ) ',[username,"Request Transcript","50"]);
                          response.redirect('/cart');
                        }
                      }
                    else {
                        response.send("You haven't paid fees");
                        flag = 0;
                    }

                    }
                    else {


                    }


                    });

                }

  else {
      response.send('Please log in')
  }





});
