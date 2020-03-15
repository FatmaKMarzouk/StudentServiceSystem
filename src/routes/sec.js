var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
var mysql = require("mysql");
console.log("connection 2")
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/sec', function(request, response,next) {
	response.sendFile(__dirname+'/sec.html');
    console.log("connection 3")
});
var connection = require('../controllers/dbconnection');

router.post('/upload', function(request, response) {

    console.log("heey")
    response.send('File Uploaded');
		response.end();

});