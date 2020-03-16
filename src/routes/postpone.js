var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var mysql = require("mysql");

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/postpone', function(request, response,next) {
	response.sendFile(__dirname+'/postpone.html');
    console.log("connection 3")
});
var connection = require('../controllers/dbconnection');

router.post('/upload', function(request, response) {
    
    connection.query('USE AlexUni');
    stdId = request.body.stdId;
    connection.query('SELECT * FROM Students WHERE ID = ? ', [stdId], function(error, results, fields) {
        
        if (results.length>0) {
           connection.query("UPDATE Students SET armypostpone = b'1' WHERE ID = ? ",[stdId], function(error, result,fields){

            if (error) throw error;
             response.send('Info updated');

           });
            
        } else {
            response.send('Please enter a recorded ID');
        }
            });
    //response.send('File Uploaded');
		//response.end();

});
