var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/todays', function(request, response,next) {
	response.sendFile(__dirname+'/todaysrequests.html');
	//console.log('its anhoon11');

});

var connection = require('../controllers/dbconnection');

router.post('/todaysrequests',function(request, response) {
});