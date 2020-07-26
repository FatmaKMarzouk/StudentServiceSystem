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

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log("stripeChargeCallback Error: "+stripeErr);
    res.status(500).send({ error: stripeErr });
  } else {
    console.log("looooloyy")
    res.status(200).send({ success: stripeRes });
  }
};


router.post('/payment', function (req, res){
  console.log("inside payment api");
if(req.user)
{
  const username=req.user.username;
  console.log("da5alt api payment w hatba3 username: ");
  console.log(username);
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd"
    };
    console.log("bada2t tba3a body.amount");
    console.log(body.source);
    console.log("5allast tba3a body.amount");
    stripe.charges.create(body, stripeChargeCallback(res));
  }
});
