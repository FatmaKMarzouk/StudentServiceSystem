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
const getObjs = require('./chooseprog');
getObjs(function(objects) {
    console.log(objects);
});
router.get('/cart',function(request,response,next){
  response.sendFile(__dirname+'/cart.html');
});
