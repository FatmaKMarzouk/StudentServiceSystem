var mysql = require('mysql');
var cart = require('./cart');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
var connection = require('../controllers/dbconnection');
var env = require("dotenv").config({ path: __dirname + "../.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
var dateFormat = require('dateformat');
var username = "";
const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log("stripeChargeCallback Error: "+stripeErr);
    res.status(500).send({ error: stripeErr });
  } else {
    var date = dateFormat(new Date(),"yyyy-mm-dd");
    connection.query('USE AlexUni');
    console.log(username);
    connection.query('SELECT * FROM Requests WHERE Paid="0" AND StudentID = ? AND ServiceName = ?',[username,'Annual Fees'],function(error, results){
      if (results.length > 0) {
        connection.query(
          "SELECT * FROM Payment WHERE StudentID = ?",[username],function (error, results, fields) {
            if (results.length > 0) {
              Object.keys(results).forEach(function (key) {
                var row = results[key];
                myDate = row.last_payment;
              });
              myDate = new Date(myDate);
              myDate.setDate(myDate.getDate() + 366);
              var date = new Date();
              var diff = date.getTime() - myDate.getTime();
              diff = diff / (1000 * 3600 * 24);
              diff = parseInt(diff / 365) + 1;
              myDate.setDate(myDate.getDate() - 366 + (diff*366))
              connection.query('UPDATE Payment SET last_payment=? WHERE StudentID=?',['2020-10-01',username],function(error,results){
                if (error)
                  throw error
              });
            }
          });

      }
    });
    connection.query('UPDATE Requests SET Paid = "1" , DatePaid =? WHERE StudentID =?',[date,username], function (error, results, fields) {
      if (error)
        throw error
      else{
        console.log("Payment is successful")
        res.status(200).send({
          error: false,
          message: " !تم بنجاح",
        });
      }
    });

  }
};


router.post('/payment',function (req, res){
console.log("inside payment api");
if(req.user)
{
  console.log("hii")
  username=req.user.username;
  var total = 0;
  var requests = [];
  connection.query("USE AlexUni");
  connection.query("SELECT * FROM Requests WHERE StudentID = ? AND Paid = 0",[username],function (error, results, fields) {
      if (results.length > 0) {
        Object.keys(results).forEach(function (key) {
          requests.push(results[key]);
          var row = results[key];
          total += row.Amount;
        });
    const body = {
      source: req.body.token.id,
      amount: total,
      currency: "usd"
    };

    stripe.charges.create(body, stripeChargeCallback(res));
  }
  });
}
else{
  response.status(400).send({
    error: true,
    message: "Please log in to view this page!",
  });
}
});
