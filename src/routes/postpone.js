var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var mysql = require("mysql");
var request = require('request');
var fs = require('fs');
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());



router.get('/postpone', function(request, response,next) {
	response.sendFile(__dirname+'/postpone.html');
    console.log("connection 3")
});
var connection = require('../controllers/dbconnection');

router.post('/uploaddoc',upload.single('armydoc'), function(req, response) {
     armydoc = req.file;
    
    connection.query('USE AlexUni');
    stdId = req.body.stdId;
    connection.query('SELECT * FROM Students WHERE ID = ? ', [stdId], function(error, results, fields) {
        




        if (results.length>0) {
           console.log("iam heereee")
            fs.readFile(armydoc.path,function (err, data) {
                console.log("iam heereee2")
                connection.query("UPDATE Students SET armypostpone = b'1', postponedoc = ? WHERE ID = ? ",[data,stdId], function(error, results,fields){

                    response.send('File Uploaded');
    
               });
                                 
                   });
           
            
            
        } else {
           // response.send('Please enter a recorded ID');
        }
            });
    //response.send('File Uploaded');
		//response.end();
    
    
    
    
    
    

});
