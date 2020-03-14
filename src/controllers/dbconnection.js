var mysql = require("mysql");
var RDS_HOSTNAME = "alexuni.csmzzxbw7ojv.us-east-2.rds.amazonaws.com";
var RDS_PORT = "3306";
var RDS_DB_NAME = "AlexUni";
var RDS_USERNAME = "Unified7";
var RDS_PASSWORD = "Unified7!!";

var config;
config = {
    mysql_pool : mysql.createPool({
        host     : RDS_HOSTNAME,
        port     : RDS_PORT,
        user     : RDS_USERNAME,
        password : RDS_PASSWORD,
        database : RDS_DB_NAME
    })
};
module.exports = config;
