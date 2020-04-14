var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var dateFormat = require('dateformat');
var requests =[];
var total = 0;
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
var connection = require('../controllers/dbconnection');
var myDate = " ";
router.get('/annualfees',function(request,response,next){
  if(request.session.loggedin){
  var username = request.session.username;
  connection.query('USE AlexUni');
  connection.query('SELECT * FROM Payment WHERE StudentID = ?',[username],function(error,results,fields){
    if(results.length>0){
      Object.keys(results).forEach(function(key){
        requests.push(results[key]);
        var row = results[key];
        myDate = row.last_payment;

      });
      myDate = new Date(myDate);
      myDate.setDate(myDate.getDate() + 366);
      var date = new Date();
      var diff = date.getTime()-myDate.getTime();
      diff = diff / (1000 * 3600 * 24);
      diff = parseInt(diff/365) +1;
      if(diff<=0){
        response.send("You have paid your annual fees");
      }
      else{
      console.log("You have to pay for " +diff+" academic years");
    }



    }
    else {

    }
  });

}
else{
  response.send("Please log in to view this page!");
}
});
