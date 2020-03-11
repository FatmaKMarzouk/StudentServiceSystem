var express = require('express');

var app = express ();
var mysql = require('mysql');
var port = process.env.PORT || 3000;
var RDS_HOSTNAME ='alexuni.csmzzxbw7ojv.us-east-2.rds.amazonaws.com';
var RDS_PORT = '3306';
var RDS_DB_NAME= 'AlexUni';
var RDS_USERNAME = 'Unified7';
var RDS_PASSWORD = 'Unified7!!';
app.use('/assets',express.static(__dirname + '/public'));
app.set('view engine','ejs');
console.log('hi');
app.use('/',function(req,res,next){
  console.log('Request URL :'+ req.url);
  res.send('heyy');
  var connection = mysql.createConnection({
    host     : RDS_HOSTNAME,
    user     : RDS_USERNAME,
    password : RDS_PASSWORD,
    port     : RDS_PORT,
    dbname   : RDS_DB_NAME
  });
  connection.connect(function(err) {
    if (err) {
      console.log({
        host            : RDS_HOSTNAME,
        user            : RDS_USERNAME,
        password        : RDS_PASSWORD,
        database        : RDS_DB_NAME
     })
      console.error('Database connection failed: ' + err.stack);
      return;
    }

    console.log('Connected to database.');

    console.log('Connected to database hana.');
  });

 connection.end();
  next();
});

app.listen(port); //this function does http.createServer
