var express = require("express");
var app = express();
var mysql = require("mysql");
var port = process.env.PORT || 3000;
var path= require('path');
app.set("view engine", "ejs");

var routes = require("./routes/index");
var login = require("./routes/login");

app.use(login);

app.listen(port); //this function does http.createServer
module.exports = app;
