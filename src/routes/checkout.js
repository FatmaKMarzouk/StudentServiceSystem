var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
var connection = require('../controllers/dbconnection');

router.get('/checkout',function(request,response,next){
   //bab3at page el checkout.html hena ely fyha el fields ey tetmala bl credit card number w hakaza
});
router.post('/payment',function(request,response,next){
  // hena ba2ra mel request.body el ma3lomat that he submitted 3an el card 3shan adyha lel bank b2a aw whatever.
});
