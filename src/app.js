var express = require("express");
var app = express();
var mysql = require("mysql");
var port = process.env.PORT || 5000;
const hostname = 'ec2-3-134-107-83.us-east-2.compute.amazonaws.com';
var path = require("path");
var multer = require("multer");
var env = require("dotenv").config({ path: __dirname + "/.env" });
var home = require("./routes/home");
var login = require("./routes/login");
var postpone = require("./routes/postpone");
var homesec = require("./routes/homesec");
var enrollement = require("./routes/enrolling");
var chooseprog = require("./routes/chooseprog");
var changepassstudent = require("./routes/changepassstudent");
var changepasssec = require("./routes/changepasssec");
var cors = require("cors");
app.use(cors());

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
app.use(changepassstudent);
app.use(changepasssec);
app.use(transcript);

app.use(chooseprog.router);
app.use(certificateofenrollment);
app.use(card);
app.use(addsec);
app.use(cart);
app.use(requests);
app.use(payment)

app.listen(port,hostname);
module.exports = env;
