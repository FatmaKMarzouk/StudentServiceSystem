var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var courses = []
const officegen = require('officegen')
const fs = require('fs')
var masterobject1 = "";
var masterobject2="";
var name = "";
var id = ""
var flag = 1;
var totalReg = "";
var totalEarned = "";
var prog="";


router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
var connection = require('../controllers/dbconnection');

router.get('/transcript', function (request, response, next) {
    if (request.session.loggedin) {
        response.sendFile(__dirname + '/transcript.html');
        var username = request.session.username;

        connection.query('USE IntegratedData');
        connection.query('SELECT ID,Name,ProgramName,TotalRegHours,TotalEarnedHours FROM Student WHERE ID = ? ', [username], function (error, results, fields) {
            var info = [];
            if (results.length > 0) {

                Object.keys(results).forEach(function (key) {
                    row1 = results[key]
                    // info.push(results[key]);
                    id = row1.ID;
                    prog = row1.ProgramName;
                    name = row1.Name;
                    totalReg = row1.TotalRegHours
                    totalEarned = row1.TotalEarnedHours
                    // console.log(info)
                });

                console.log(id, name, prog, totalReg, totalEarned);
                connection.query('USE IntegratedData');
                connection.query('SELECT CourseName,Grade,Semester FROM EnrolledCourses WHERE StudentID = ?  ORDER BY SemesterNum ASC', [id], function (error, results2, fields) {

                    if (results2.length > 0) {

                        Object.keys(results2).forEach(function (key) {
                            //courses.push(results2[key]);
                            masterobject1 = {
                                ...1,
                                ...results2
                            };
                        });
                        console.log('bada2t teba3a\n');
                        console.log(masterobject1);
                        console.log('\n5allast teba3a\n');
                        connection.query('USE IntegratedData');
                        connection.query('SELECT Semester,GPA,regHours FROM Semesters WHERE StudentID = ?', [id], function (error, results4, fields) {
                            var termGpa = [];
                            if (results4.length > 0) {

                                Object.keys(results4).forEach(function (key) {
                                    //  termGpa.push(results4[key]);
                                    masterobject2 = {
                                        ...masterobject2,
                                        ...results4
                                    };

                                });
                                console.log('bada2t teba3a tanyyy\n');
                                console.log(masterobject2);
                                console.log('\n5allast teba3a tanyyy\n');
                            } else {
                                response.send('Wrong ID');
                            }

                        });





                    } else {
                        response.send("no registered courses");
                        flag = 0;
                    }
                });

            } else {
                response.send("Not a registered student");
                flag = 0;
            }




        });



    } else {

        response.send('Please login to view this page!');
    }



});
router.get('/transcriptconfirm', function (request, response, fields) {
    if (request.session.loggedin) {

        var username = request.session.username;
        var paid = "";
        var flag = 1;
        connection.query('USE AlexUni');
        connection.query('SELECT Paid FROM Payment WHERE StudentID = ? ', [username], function (error, results3, fields) {
            if (results3.length > 0) {
                Object.keys(results3).forEach(function (key) {
                    var row3 = results3[key];

                    paid = row3.Paid;
                });
                if (paid) {
                    // Create an empty Word object:
                    let docx = officegen('docx')

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
                        align: 'center'
                    })

                    // We can even add images:
                    pObj.addImage(path.resolve(__dirname, 'uni_logoo.png'), {
                        cx: 120,
                        cy: 120
                    })


                    pObj = docx.createP({
                        align: 'left'
                    })
                    pObj.addText("Studnet's name :"+name)
                    //pObj.addText(name,{color : '0000A0', bold: true, underline: true})
                    pObj.addLineBreak()
                   pObj.addText("Student's ID : "+id)
                   
                    pObj.addLineBreak()
                    pObj.addText("Student's program: "+prog)
                    
                    pObj.addLineBreak()
                    pObj.addText("Student's total registered hours : "+totalReg)
                    
                    pObj.addLineBreak()
                    pObj.addText("Student's total earned hours : "+totalEarned)
                    pObj.addLineBreak()
                   var myobj1=JSON.stringify(masterobject1);
                    pObj.addText("Subject's taken :")

                    pObj.addLineBreak()
                    pObj.addText(myobj1,{color:'0000A0'})
                    
                    
                    //pObj = docx.createP()
                    //pObj.addText('Bold + underline', { bold: true, underline: true })
                    //pObj = docx.createP()
                    //pObj.addText('Those two lines are in the same paragraph,')
                    //pObj.addLineBreak()
                    //pObj.addText('but they are separated by a line break.')
                   // docx.putPageBreak()
                    //pObj = docx.createP()
                    //pObj.addText('Fonts face only.', { font_face: 'Arial' })
                    //pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 })
                    //docx.putPageBreak()

                    // Let's generate the Word document into a file:
                    let out = fs.createWriteStream('example.docx')
                    out.on('error', function (err) {
                        console.log(err)
                    })
                    // Async call to generate the output file:
                    docx.generate(out)

                    if (flag == 1) {

                        connection.query('USE AlexUni');
                        connection.query('INSERT INTO Requests (StudentID,ServiceName,Amount) VALUES( ?,?,? ) ', [username, "Request Transcript", "50"]);
                        response.redirect('/cart');

                    paid =row3.Paid ;
                     });
                      if (paid){
                        if (flag==1){

                          connection.query('USE AlexUni');
                          connection.query('INSERT INTO Requests (StudentID,ServiceName,Amount,FacultyName) VALUES( ?,?,?,? ) ',[username,"Request Transcript","50","Faculty of Engineering"]);
                          response.redirect('/cart');
                        }
                      }
                    else {
                        response.send("You haven't paid fees");
                        flag = 0;
                    }

 
                    }
                } else {
                    response.send("You haven't paid fees");
                    flag = 0;
                }

            } else {


            }


        });

    } else {
        response.send('Please log in')
    }





});