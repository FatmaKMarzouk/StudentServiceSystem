var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/homesec', function(request, response,next) {
    
    if (request.session.loggedin) {
      response.sendFile(__dirname+'/homesec.html');
   
  } else {
    response.send('Please login to view this page!');
  }
 
});
