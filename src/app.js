var express = require("express");
var app = express();
var mysql = require("mysql");
var port = process.env.PORT || 3000;
var path= require('path');
app.set("view engine", "ejs");

var routes = require("./routes/index");
var login = require("./routes/login");


var mysqlConf = require('F:/Graduation Project/StudentServiceSystem/src/controllers/dbconnection').mysql_pool;
mysqlConf.getConnection(function (err, connection) {
      console.log('hello');
      console.log(mysqlConf.host);
   });
// connection = mysql.createConnection({
//   host: RDS_HOSTNAME,
//   user: RDS_USERNAME,
//   password: RDS_PASSWORD,
//   port: RDS_PORT,
//   dbname: RDS_DB_NAME
// });
// connection.connect(function(err) {
//   if (err) {
//     console.error("Database connection failed: " + err.stack);
//     return;
//   }
//   console.log("Connected to database.");
// });

app.use(function(req,res,next){
    req.connection = connection;
    next();
});
app.use(login);

app.listen(port); //this function does http.createServer
module.exports = app;
