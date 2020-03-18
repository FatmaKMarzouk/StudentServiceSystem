var connection = require('../controllers/dbconnection');

function User() {};

User.prototype = {
    // Find the user data byusername.
    find : function(user = null, callback)
    {
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE Username = ?`;


        connection.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },
}


module.exports = User;