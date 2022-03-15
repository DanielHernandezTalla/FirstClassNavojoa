//Configuration of connection to database
const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'Daniel2000',
    database: 'sfc'
});

// database Name id16766404_sfc
// dbUser 	id16766404_root
// XJc!4MTap4aJkQjL

function getConnection() {
    return connection;
}

module.exports = getConnection;
