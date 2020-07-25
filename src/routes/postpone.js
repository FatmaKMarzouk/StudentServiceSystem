var mysql = require("mysql");
var express = require("express");
var router = express.Router();
module.exports = router;
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");
var request = require("request");
var fs = require("fs");
var multer = require("multer");
//var upload = multer({ dest: "uploads/" });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + " - " + Date.now());
  },
});
var upload = multer({ storage: storage }).single("file");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/*router.get("/postpone", function (request, response, next) {
  if (request.session.loggedin) {
    if (request.session.loggedin) {
      response.sendFile(__dirname + "/postpone.html");
    }
  } else {
    response.send("Please sign in");
  }
});*/
var connection = require("../controllers/dbconnection");

router.post("/uploaddoc", function (request, response) {
  console.log("Inside Armyyy uploaddoc");
  if (request.user) {
    const stdId = request.query.stdId || request.body.stdId;
    console.log("query: "+request.body);

    upload(request, response, function (error) {
      const armydoc = request.file;
      console.log("stdId: " + stdId);
      console.log("gowa el upload");
      if (error instanceof multer.MulterError) {
        console.log("awl error: " + error.field);
        return response.status(500).json(error)
      } else if (error) {
        console.log("tany error" + error);
        return response.status(500).json(error)
      }
      connection.query("USE AlexUni");
      fs.readFile(armydoc.path, function (error, data) {
        connection.query(
          "UPDATE Students SET armypostpone = b'1', postponedoc = ? WHERE ID = ? ", [data, stdId], function (error, results, fields) {
            if (error) {
              console.log("error in query postpone: "+error);
            }
            // else {
            //   console.log("Army postponed el mfrood added");
            //   response.status(200).send({
            //     error: false,
            //     message: "File Uploaded"
            //   });
            // }
          }
        );
        if (error)
          console.log("error in fs postpone army: " + error);
      });
      console.log("gowa el upload lsssssa");
      return response.status(200).send({
        error: false,
        message: "Postpone Army document uploaded"
      });

    })
    //-------------------------------------------------------------------------
    /*console.log("ARMY DOCUMENT");
    console.log(req.file);
    console.log("STUDENT ID");
    console.log(req.stdId);
  
    connection.query("USE AlexUni");
    stdId = req.query.stdId;
    connection.query("SELECT * FROM Students WHERE ID = ? ", [stdId], function (error, results, fields) {
      if (results.length > 0) {
        fs.readFile(armydoc.path, function (err, data) {
          connection.query(
            "UPDATE Students SET armypostpone = b'1', postponedoc = ? WHERE ID = ? ",
            [data, stdId],
            function (error, results, fields) {
              response.send("File Uploaded");
            }
          );
          if (err)
            console.log("error in postpone army: " + err);
        });
      } else {
        response.send("Please enter a recorded ID");
      }
    });*/
  } else {
    response.status(400).send({
      error: true,
      message: "Please Login to view this page"
    });
  }
});
