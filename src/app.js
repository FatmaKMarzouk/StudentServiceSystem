var express = require('express');

var app = express ();
var mysql = require('mysql');
var port = process.env.PORT || 3000;

app.use('/assets',express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.use('/',function(req,res,next){
  console.log('Request URL :'+ req.url);
  res.send('heyy');
  var connection = mysql.createConnection({
    host     : 'database-2.csmzzxbw7ojv.us-east-2.rds.amazonaws.com',
    user     : 'Unified7',
    password : 'Unified7!!',
    port     : 3306
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });
  

  next();
});

app.listen(port); //this function does http.createServer
