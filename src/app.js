var express = require('express');

var app = express ();
var mysql = require('mysql');
var port = process.env.PORT || 8080;

app.use('/assets',express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.use('/',function(req,res,next){
  console.log('Request URL :'+ req.url);
  res.send('heyy');
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'addressbook',
  });
  con.connect();

  next();
});

app.listen(port); //this function does http.createServer
