var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var requests =[];
var i=0;
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
var connection = require('../controllers/dbconnection');

router.get('/cart',function(request,response,next){
  if(request.session.loggedin){
  var username = request.session.username;
  connection.query('USE AlexUni');
  connection.query('SELECT * FROM Requests WHERE StudentID = ? AND Paid = 0',[username],function(error,results,fields){
    if(results.length>0){
      Object.keys(results).forEach(function(key){
        requests.push(results[key]);
      });
      console.log(requests);
    }
    else {
      console.log('You have no requested services in your cart');
    }
  });

  response.sendFile(__dirname+'/cart.html');
}
else{
  response.send("Please log in to view this page!");
}
});

router.post('/delete-cart',function(request,response,next){
  var reqID = request.session.reqID;
  connection.query('USE AlexUni');
  connection.query('DELETE FROM Requests WHERE ID = ?',[reqID]);
  response.redirect('/cart');





});
