var express = require("express");
var app = express();
var mysql = require("mysql");
var port = process.env.PORT || 5000;
var path= require('path');
var multer  = require('multer')
var env = require("dotenv").config({ path: __dirname + "/.env" });
var home = require("./routes/home")
var login = require("./routes/login");
var postpone = require("./routes/postpone");
var homesec = require("./routes/homesec");
var enrollement = require("./routes/enrollement");
var chooseprog = require("./routes/chooseprog");

var transcript = require("./routes/transcript");
var request = require('request');

var cart = require("./routes/cart");
var certificateofenrollment = require("./routes/certificateofenrollment");
var addsec = require("./routes/addsec");
var checkout = require("./routes/checkout");
var allRequests = require("./routes/allRequests");
var todaysRequests = require("./routes/todaysRequests");
var doneRequests = require("./routes/doneRequests");

app.use(express.static(process.env.STATIC_DIR));
app.use(express.json());

app.use(login);
app.use(homesec);
app.use(enrollement);
app.use(postpone);
app.use(home);


app.use(transcript);


app.use(chooseprog.router);
app.use(certificateofenrollment);
app.use(addsec);
app.use(cart);
app.use(checkout);
app.use(allRequests);
app.use(doneRequests);
app.use(todaysRequests);

app.listen(port); //this function does http.createServer
module.exports = env;
