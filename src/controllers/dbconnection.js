var mysql = require("mysql");
var RDS_HOSTNAME = "alexuni.csmzzxbw7ojv.us-east-2.rds.amazonaws.com";
var RDS_PORT = "3306";
var RDS_DB_NAME = "AlexUni";
var RDS_USERNAME = "Unified7";
var RDS_PASSWORD = "Unified7!!";

var mysql = require('mysql');
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection({
            host: RDS_HOSTNAME,
            user: RDS_USERNAME,
            password: RDS_PASSWORD,
            port: RDS_PORT,
            dbname: RDS_DB_NAME
        });

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();
