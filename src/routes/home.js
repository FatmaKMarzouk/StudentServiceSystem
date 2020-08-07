var mysql = require("mysql");
var express = require("express");
var router = express.Router();
module.exports = router;
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var connection = require("../controllers/dbconnection");
var env = require("dotenv").config({ path: __dirname + "../.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
var name = " ";
var username = " ";
router.get("/studentinfo", function (req, res, next) {
  if (req.user) {
    username = req.user.username;
    connection.query("USE AlexUni");
    connection.query(
      "SELECT NameAr,ID FROM Students WHERE ID=?",
      [username],
      function (error, results) {
        if (results.length > 0) {
          Object.keys(results).forEach(function (key) {
            var row = results[key];
            name = row.NameAr;
          });
          res.status(200).json(results);
        } else {
          console.log("no such id");
        }
      }
    );
  } else {
    res.status(400).send({
      error: true,
      message: "Please log in to view this page!",
    });
  }
});

router.get("/secretaryinfo", function (req, res, next) {
  if (req.user) {
    username = req.user.username;
    connection.query("USE AlexUni");
    connection.query(
      "SELECT Name,ID FROM Secretary WHERE ID=?",
      [username],
      function (error, results) {
        if (results.length > 0) {
          Object.keys(results).forEach(function (key) {
            var row = results[key];
            name = row.Name;
          });
          res.status(200).json(results);
        } else {
          console.log("no such id");
        }
      }
    );
  } else {
    res.status(400).send({
      error: true,
      message: "Please log in to view this page!",
    });
  }
});
