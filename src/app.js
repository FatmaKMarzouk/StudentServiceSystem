var express = require("express");
var app = express();
var mysql = require("mysql");
var port = process.env.PORT || 3000;
var path= require('path');
var multer  = require('multer')
var home = require("./routes/home")
var login = require("./routes/login");
var postpone = require("./routes/postpone");
var homesec = require("./routes/homesec");
var enrollement = require("./routes/enrollement");
var chooseprog = require("./routes/chooseprog");
var cart = require("./routes/cart");
var certificateofenrollment = require("./routes/certificateofenrollment");
var addsec = require("./routes/addsec");

app.use(login);
app.use(homesec);
app.use(enrollement);
app.use(postpone);
app.use(home);
app.use(chooseprog);
app.use(certificateofenrollment);
app.use(addsec);
app.use(cart);
app.listen(port); //this function does http.createServer
module.exports = app;
