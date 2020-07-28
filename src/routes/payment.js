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
const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log("stripeChargeCallback Error: "+stripeErr);
    res.status(500).send({ error: stripeErr });
  } else {
    // var date = dateFormat(new Date(),"yyyy-mm-dd");
    // connection.query('USE AlexUni');
    // connection.query('UPDATE Requests SET Paid = "1" , DatePaid =? WHERE ID =?',[date,username]);
    console.log("Payment is successful")
    res.status(200).send({
      error: false,
      message: "Payment is successful",
    });
  }
};


router.post('/payment',function (req, res){
console.log("inside payment api");
if(req.user)
{
  console.log("hii")
  const username=req.user.username;
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
