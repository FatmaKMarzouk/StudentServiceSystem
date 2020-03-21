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
const chooseprog = require('./chooseprog');

router.get('/cart',function(request,response,next){
  if (chooseprog.flag==1){
    connection.query('USE AlexUni');

    connection.query('INSERT INTO Requests (StudentID,ServiceName,Data,Amount) VALUES( ?,?,?,? ) ',[chooseprog.info.studentID, chooseprog.info.service,JSON.stringify(chooseprog.info),chooseprog.info.Fee] );

    console.log(JSON.stringify(chooseprog.info));
  }
  response.sendFile(__dirname+'/cart.html');
});
