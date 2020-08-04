var mysql = require("mysql");
var express = require("express");
var router = express.Router();
module.exports = router;
var path = require("path");
var dateFormat = require("dateformat");
var moment = require('moment');
var bodyParser = require("body-parser");
var session = require("express-session");
var nodemailer = require("nodemailer");
var facultysec;
var request = require("request");
var fs = require("fs");
var multer = require("multer");
var bcrypt = require('bcryptjs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + " - " + Date.now());
  },
});
var connection = require("../controllers/dbconnection");
const { response } = require("express");
var email;

var upload = multer({ storage: storage }).single("file");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/upload', function (request, response) {
  console.log("bdayet upload");
  console.log(upload.filename);
  console.log("nhayet upload");
  upload(request, response, function (error) {
    console.log("gowa el upload");
    if (error instanceof multer.MulterError) {
      console.log("awl error" + error);
      return response.status(500).json(error)
    } else if (error) {
      console.log("tany error" + error);
      return res.status(500).json(error)
    }
    console.log("gowa el upload lsssssa");
    return response.status(200).send(request.file)

  })
});

router.post("/enroll", function (request, response) {
  if (request.user) {
    var secusername = request.user.username;
    var nameen = request.body.studentinfo.nameen || " ";
    var namear = request.body.studentinfo.namear || " ";
    var ssn = request.body.studentinfo.ssn || " ";
    var medicalcondition = request.body.studentinfo.medicalcondition || " ";
    var parentphone = request.body.studentinfo.parentphone || " ";
    var parentname = request.body.studentinfo.parentname || " ";
    var parentssn = request.body.studentinfo.parentssn || " ";
    var parentrelation = request.body.studentinfo.parentrelation || " ";
    email = request.body.studentinfo.email || " ";
    var nationality = request.body.studentinfo.nationality || " ";
    var birthdate = request.body.studentinfo.birthdate || " ";
    var phonenumber = request.body.studentinfo.phonenumber || " ";
    var address = request.body.studentinfo.address || " ";
    var gender = request.body.studentinfo.gender || " ";
    var selection = request.body.studentinfo.selection || " ";
    var user = "";

    connection.query('USE AlexUni');
    connection.query("SELECT FacultyName FROM Secretary WHERE ID = ? ", [secusername], function (error, results, fields) {
      if (error)
        throw error
      if (results.length > 0) {
        Object.keys(results).forEach(function (key) {
          var row = results[key];
          facultysec = row.FacultyName;
          console.log(facultysec);
        });

        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$/%&";
        var charactersLength = characters.length;
        for (var i = 0; i < 10; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(result, salt, function(err, hash) {

                    connection.query("INSERT INTO Students (NameEn, NameAr, ParentPhone, Gender, medicalCondition, Email, Nationality, Birthdate, SSN, phoneNumber, Address, Password, Faculty, Program, ParentName, ParentSSN, ParentRelation) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ",
                      [nameen, namear, parentphone, gender, medicalcondition, email, nationality, birthdate, ssn, phonenumber, address, hash, facultysec, "General", parentname, parentssn, parentrelation,],
                      function (error, results, fields) {
                        if (error) {
                          response.status(200).send({
                            error: true,
                            message: "Student not added",
                          });
                        }
                        else {

                          if (selection == "SSP") {
                            connection.query("UPDATE Students SET SSP = b'1' WHERE Email = ? ", [email],
                              function (error, results, fields) { });
                          }

                          connection.query("UPDATE Students SET Username = ID WHERE Email = ? ", [email], function (error, results, fields) {
                              if (error)
                                throw error
                              else {
                                connection.query("SELECT Username FROM Students WHERE Email = ? ", [email], function (error, results1, fields) {
                                  if (results1.length > 0) {
                                    Object.keys(results1).forEach(function (key) {
                                      var row = results1[key];
                                      user = row.Username;
                                      console.log(user);
                                      return user;
                                    });
                                    var now = new Date();
                                  var myDate = moment(now).format('YYYY-MM-DD');
                                  console.log(myDate);
                                  var year  = moment(myDate).format('YYYY');
                                  console.log(year);
                                  myDate = moment(year+"-10-01").format('YYYY-MM-DD')
                                  console.log(myDate);
                                  connection.query("INSERT INTO Payment (StudentID,last_payment) VALUES (?,?)",[user,myDate],function(error,results){
                                    if(error)
                                      throw(error)
                                  });

                                    const output = `
                        					<p>Congratulations! You have been accepted in Alexandria University.</p>
                        					<h3>Contact Details</h3>
                        					<ul>
                        					<li>Faculty: ${facultysec}</li>
                        					<li>Username: ${user}</li>
                        					<li>Password: ${result}</li>
                        					</ul>
                        					<h3>Note:</h3>
                        					<p>Please login and change your password.</p>
                        				`;

                                    let transporter = nodemailer.createTransport({
                                      host: "smtp.gmail.com",
                                      port: 587,
                                      secure: false, // true for 465, false for other ports
                                      auth: {
                                        user: "alexandriauniversity7@gmail.com", // generated ethereal user
                                        pass: "Unified7!!", // generated ethereal password
                                      },
                                      tls: {
                                        rejectUnauthorized: false,
                                      },
                                    });

                                    let mailOptions = {
                                      from:
                                        '"Alexandria University" <alexandriauniversity7@gmail.com>', // sender address
                                      to: email, // list of receivers
                                      subject: "Alexandria University", // Subject line
                                      text: "Hello world?", // plain text body
                                      html: output, // html body
                                    };
                                    transporter.sendMail(mailOptions, (error, info) => {
                                      if (error) {

                                      }
                                      else {
                                        console.log("Message sent: %s", info.messageId);
                                      }
                                    });
                                  }
                                });
                                response.status(200).send({
                                  error: false,
                                  message: "Student added successfully",
                                });
                                console.log("Student added successfully")
                              }
                            });
                        }

                      });
        });
      })





      }
      else {
        response.status(401).send({
          error: true,
          message: "Not a valid faculty name!"
        });
      }
    });
  }
  else {
    response.status(401).send({
      error: true,
      message: "Please log in to view this page!"
    });
  }
});

// ------------------------------------------------------------------------------------------------
router.post("/nominationcard", function (request, response) {
  console.log("Inside Nomination Card");
  if (request.user) {
    // upload
    upload(request, response, function (error) {
      var nominationCard = request.file;
      console.log("gowa el upload");
      if (error instanceof multer.MulterError) {
        console.log("awl error" + error);
        return response.status(500).json(error)
      } else if (error) {
        console.log("tany error" + error);
        return response.status(500).json(error)
      }
      console.log("gowa el upload lsssssa");
      console.log("Nomination Cardddddzzzzzzzzz");
      console.log(nominationCard);
      //var email = request.body.email;
      console.log("Email in nominationcard: " + email);
      connection.query("USE AlexUni");
      fs.readFile(nominationCard.path, function(error,data){
        connection.query(
          "UPDATE Students SET NominationCard = ? WHERE Email = ? ",
          [data, email],
          function (error, results, fields) {
            if (error) {
              console.log("talet error:" + error);
            }
            console.log("Nomination card el mfrood added");
            response.status(200).send({
              error: false,
              message: "Nomination card added" });
          }
        );
      });
    });
    //nhayet el upload

  }
});

//---------------------------------------------------------------------------------------------------------------
router.post("/photo", function (request, response) {
console.log("Inside photo");
  if (request.user) {
    upload(request, response, function (error) {
      const photo = request.file;
    if (error instanceof multer.MulterError) {
      console.log("awl error" + error);
      return res.status(500).json(error)
    } else if (error) {
      console.log("tany error" + error);
      return res.status(500).json(error)
    }
    connection.query("USE AlexUni");
    fs.readFile(photo.path, function(error, data){
      connection.query(
        "UPDATE Students SET Photo = ? WHERE Email = ? ",
        [data, email],
        function (error, results, fields) {
          if(error)
          console.log("photo query error: "+ error);
        }
      );
      console.log("Photo added el mfrood");
      response.send({
        error:false,
        message:"Photo added"
      });
    })

  })
  }
});

//----------------------------------------------------------------------------------------------------------------
router.post("/highschoolcertificate", function (request, response) {
  console.log("Inside highschoolcertificate");
  if (request.user) {
    // upload
    upload(request, response, function (error) {
      var highschoolcertificate = request.file;
      if (error instanceof multer.MulterError) {
        console.log("awl error" + error);
        return response.status(500).json(error)
      } else if (error) {
        console.log("tany error" + error);
        return response.status(500).json(error)
      }
      console.log("highschoolcertificatezzzzzzzzz");
      console.log(highschoolcertificate);
      console.log("Email in nominationcard: " + email);
      connection.query("USE AlexUni");
      fs.readFile(highschoolcertificate.path, function(error,data){
        connection.query(
          "UPDATE Students SET highschoolCertificate = ? WHERE Email = ? ",
          [data, email],
          function (error, results, fields) {
            if (error) {
              console.log("talet error in highschoolcertificate:" + error);
            }
            console.log("highschoolcertificate el mfrood added");
            response.status(200).send({
              error: false,
              message: "High School Certificate added" });
          }
        );
      });
    });
    //nhayet el upload
  }
});

//--------------------------------------------------------------------------------------------------------------
router.post("/birthcertificate", function (request, response) {
  console.log("Inside birthcertificate");
  if (request.user) {
    // upload
    upload(request, response, function (error) {
      var birthcertificate = request.file;
      if (error instanceof multer.MulterError) {
        console.log("awl error" + error);
        return response.status(500).json(error)
      } else if (error) {
        console.log("tany error" + error);
        return response.status(500).json(error)
      }
      console.log("birthcertificatezzzzzzzzz");
      console.log(birthcertificate);
      console.log("Email in nominationcard: " + email);
      connection.query("USE AlexUni");
      fs.readFile(birthcertificate.path, function(error,data){
        connection.query(
          "UPDATE Students SET birthCertificate = ? WHERE Email = ? ",
          [data, email],
          function (error, results, fields) {
            if (error) {
              console.log("talet error in birthCertificate:" + error);
            }
            console.log("Birth Certificate el mfrood added");
            response.status(200).send({
              error: false,
              message: "Birth Certificate added" });
          }
        );
      });
    });
    //nhayet el upload
  }
});

//--------------------------------------------------------------------------------------------------------------
router.post("/nationalid", function (request, response) {
  console.log("Inside nationalid");
  if (request.user) {
    // upload
    upload(request, response, function (error) {
      var nationalid = request.file;
      if (error instanceof multer.MulterError) {
        console.log("awl error" + error);
        return response.status(500).json(error)
      } else if (error) {
        console.log("tany error" + error);
        return response.status(500).json(error)
      }
      console.log("nationalidzzzzzzzzz");
      console.log(nationalid);
      console.log("Email in nationalid: " + email);
      connection.query("USE AlexUni");
      fs.readFile(nationalid.path, function(error,data){
        connection.query(
          "UPDATE Students SET Nationalid = ? WHERE Email = ? ",
          [data, email],
          function (error, results, fields) {
            if (error) {
              console.log("talet error in nationalid:" + error);
            }
            console.log("National ID el mfrood added");
            response.status(200).send({
              error: false,
              message: "National ID added" });
          }
        );
      });
    });
    //nhayet el upload
  }
});
