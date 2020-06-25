var mysql = require('mysql');
var cart = require('./cart');
var total = cart.total;
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
    res.status(500).send({ error: stripeErr });
  } else {
    console.log("looooloyy")
    res.status(200).send({ success: stripeRes });
  }
};


router.post('/payment', function (req, res){

    console.log(total);
    const body = {
      source: req.body.token.id,
      amount: 88,
      currency: "usd"
    };
    stripe.charges.create(body, stripeChargeCallback(res));

});
