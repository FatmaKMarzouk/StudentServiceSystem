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

router.get("/cart", function (request, response, next) {
  if (request.user) {
    var total = 0;
    var username = request.user.username;
    var requests = [];
    connection.query("USE AlexUni");
    connection.query(
      "SELECT * FROM Requests WHERE StudentID = ? AND Paid = 0",
      [username],
      function (error, results, fields) {
        if (results.length > 0) {
          Object.keys(results).forEach(function (key) {
            requests.push(results[key]);
            var row = results[key];
            total += row.Amount;
          });
          //sessionStorage.setItem('total',total);
          console.log("bada2t tba3a total");
          console.log(total);
          console.log("5allast tba3a total");
          response.status(200).send({ requests, total });
        } else {
          response.status(400).send({
            error: true,
            message: "You have no requested services in your cart",
          });
        }
      }
    );

    //response.sendFile(__dirname+'/cart.html');
  } else {
    response.status(400).send({
      error: true,
      message: "Please log in to view this page!",
    });
  }
});

router.post("/delete-cart", function (request, response, next) {
  if (request.user) {
    var reqID = request.body.reqID;
    console.log(reqID);
    connection.query("USE AlexUni");
    connection.query("DELETE FROM Requests WHERE ID = ?", [reqID]);
    //response.redirect('/cart');
    response.status(200).send({ message: " deleted tmam " });
  } else {
    response.status(400).send({
      error: true,
      message: "Please log in to view this page!",
    });
  }
});
exports.total = total;
