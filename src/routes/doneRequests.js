var mysql = require('mysql');
var express = require('express');
var router = express.Router();
module.exports = router;
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/done', function(request, response,next) {
	response.sendFile(__dirname+'/donerequests.html');
	//console.log('its anhoon11');

});

var connection = require('../controllers/dbconnection');

router.post('/donerequests',function(request, response) {
});