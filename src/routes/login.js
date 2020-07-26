var mysql = require("mysql");
var connection = require("../controllers/dbconnection");
var express = require("express");
var router = express.Router();
module.exports = router;
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
var jwt = require("jsonwebtoken");
const utils = require("../utils");
router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// enable CORS
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// static user details
const userData = {
  role: "",
  userId: "",
  password: "",
  name: "",
  username: "",
  isAdmin: false,
};

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
router.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

// request handlers
router.get("/", (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid user to access it." });
      res.status(200).send({
        error: false,
        message: "Welcome - " + req.user.name,
      });
});

// validate the user credentials
router.post("/users/signin", function (req, res) {
  console.log("Request BODY");
  console.log(req.body);
  const user = req.body.username;
  const pwd = req.body.password;
  const role = req.body.role;

  if (user && pwd && role) {
    console.log("user && pwd && role");
    connection.query("Use AlexUni");
    if (role == "student")
    {
      console.log("student");
      connection.query(
        "SELECT * FROM Students WHERE Username = ? AND Password = ?",
        [user, pwd],
        function (error, results, fields)
        {
          console.log(results);
          if (results.length > 0)
          {
            //req.session.loggedin = true;
            //console.log("Request session in login b3d el definition");
            //console.log(req.session.loggedin);
            //req.session.username = user;
            Object.keys(results).forEach(function (key)
            {
              var row = results[key];
              userData.name = row.NameEn;
              userData.username = row.Username;
              userData.role = role;
            });
            console.log("userData FLAG");
            console.log(userData);
            // generate token
            const token = utils.generateToken(userData);
            console.log("token FLAG");
            console.log(token);
            // get basic user details
            const userObj = utils.getCleanUser(userData);
            // return the token along with user details
            return res.status(200).json({ user: userObj, token });

          }
          // return 401 status if credential don't not match.
          else
          {
            return res.status(401).json(
            {
              error: true,
              message: "Username or Password is Wrong.",
            });
          }
        }
      );
    }
    else if (role == "secretary")
    {
      console.log("secretary");
      connection.query(
        "SELECT * FROM Secretary WHERE ID = ? AND Password = ?", [user, pwd],
        function (error, results, fields)
        {
          if (results.length > 0)
          {
            req.session.loggedin = true;
            req.session.username = user;
            Object.keys(results).forEach(function (key)
            {
              var row = results[key];
              userData.name = row.Name;
              userData.username = row.Username;
              userData.role = role;
            });
            // generate token
            const token = utils.generateToken(userData);
            // get basic user details
            const userObj = utils.getCleanUser(userData);
            // return the token along with user details
            return res.json({ user: userObj, token });
          }

          // return 401 status if the credential is not match.
          else
          {
            return res.status(401).json(
            {
              error: true,
              message: "Username or Password is Wrong.",
            });
          }
        }
      );
    } else {
      console.log("Wala di wala di");
    }
    // console.log("Request session in login");
    // console.log(req.session.loggedin);
  }
  // return 401 status if the credential is not match.
  else {
    return res.status(401).json({
      error: true,
      message: "Username, Password and Role are required.",
    });
  }
});

// verify the token and return it if it's valid
router.get("/verifyToken", function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  console.log("token in verifytoken:"+token);
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    // return 401 status if the userId does not match.
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.status(200).json({ user: userObj, token });
  });
});

router.get("/login", function (request, response, next) {
  response.sendFile(__dirname + "/login.html");
});
var connection = require("../controllers/dbconnection");

router.post("/auth", function (request, response, next) {
  var role = request.body.role;
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query("USE AlexUni");
    if (role == "student") {
      connection.query(
        "SELECT * FROM Students WHERE Username = ? AND Password = ?",
        [username, password],
        function (error, results, fields) {
          if (results.length > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect("/home");
          } else {
            response.send("Incorrect Username and/or Password!");
          }
        }
      );
    } else if (role == "secretary") {
      connection.query(
        "SELECT * FROM Secretary WHERE ID = ? AND Password = ?",
        [username, password],
        function (error, results, fields) {
          if (results.length > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect("/homesec");
          } else {
            response.send("Incorrect Username and/or Password!");
          }
          var secid = username;
          console.log(secid);
        }
      );
    }
  } else {
    response.send("Please enter Username and Password!");
  }
});
