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
var name = " ";
var username = " ";
router.get('/home', function(req, res,next) {
  if(req.user)
  {

    connection.query('USE AlexUni');

  }
  else{
    response.status(400).send({
      error: true,
      message: "Please log in to view this page!",
    });
  }

});
