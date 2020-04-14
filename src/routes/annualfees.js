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
var lastPayment="";
router.get('/annualfees',function(request,response,next){
  if(request.session.loggedin){
  var username = request.session.username;
  connection.query('USE AlexUni');
  connection.query('SELECT * FROM Payment WHERE StudentID = ?',[username],function(error,results,fields){
    if(results.length>0){
      Object.keys(results).forEach(function(key){
        requests.push(results[key]);
        var row = results[key];
        lastPayment=row.last_payment;
      });
      var myDate = new Date(lastPayment);
      myDate.setDate(myDate.getDate() + 366);
      myDate = new Date(dateFormat(myDate,"yyyy-mm-dd"));
      var date = new Date(dateFormat(new Date(), "yyyy-mm-dd"));
      var diff = date.getTime() - myDate.getTime();
      diff = diff / (1000 * 3600 * 24)/365 + 1;
      diff = Math.floor(diff)

      console.log(diff);


    }
    else {
      console.log('Something went wrong');
    }
  });

}
else{
  response.send("Please log in to view this page!");
}
});
