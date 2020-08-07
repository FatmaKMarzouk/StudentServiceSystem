var express = require("express");
var app = express();
var mysql = require("mysql");
var port = process.env.PORT || 5000;
var path = require("path");
var multer = require("multer");
var env = require("dotenv").config({ path: __dirname + "/.env" });
var home = require("./routes/home");
var login = require("./routes/login");
var postpone = require("./routes/postpone");
var homesec = require("./routes/homesec");
var enrollement = require("./routes/enrolling");
var chooseprog = require("./routes/chooseprog");
const cors = require("cors");

var docx = require("docx");

var annualfees = require("./routes/annualfees");


var request = require('request');
var officegen = require('officegen')
var fs = require('fs')
var request = require("request");

var cart = require("./routes/cart");
var certificateofenrollment = require("./routes/certificateofenrollment");
var transcript = require("./routes/transcript");
var addsec = require("./routes/addsec");
var checkout = require("./routes/checkout");
var card = require("./routes/card");
var requests = require("./routes/requests");
var payment = require("./routes/payment");
app.use(express.static(process.env.STATIC_DIR));
app.use(express.json());

app.use(login);
app.use(homesec);
app.use(enrollement);
app.use(postpone);
app.use(home);
app.use(annualfees);

app.use(transcript);

app.use(chooseprog.router);
app.use(certificateofenrollment);
app.use(card);
app.use(addsec);
app.use(cart);
app.use(checkout);
app.use(requests);
app.use(payment)

app.listen(port); //this function does http.createServer
module.exports = env;
