var express = require('express');

var app = express ();
var mysql = require('mysql');
var port = process.env.PORT || 3000;
var RDS_HOSTNAME ='alexandriauniversity.csmzzxbw7ojv.us-east-2.rds.amazonaws.com';
var RDS_PORT = '3306';
var RDS_DB_NAME= 'AlexandriaUniversity';
var RDS_USERNAME = 'Unified7';
var RDS_PASSWORD = 'Unified7!!';
app.use('/assets',express.static(__dirname + '/public'));
app.set('view engine','ejs');

app.use('/',function(req,res,next){
  console.log('Request URL :'+ req.url);
  res.send('heyy');
  var connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    dbname   : process.env.RDS_DB_NAME
  });

  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      console.log(err.code);
      console.log(err.fatal);
      console.log(err.sqlState);
      console.log(err.sqlMessage);
      return;
    }

    console.log('Connected to database.');
  });

 connection.close();
  next();
});

app.listen(port); //this function does http.createServer
