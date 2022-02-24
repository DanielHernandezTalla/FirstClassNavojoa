//Configuration of connection to database
const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'localhost',
    password: '12345',
    database: 'sfc'
});

function getConnection() {
    return connection;
}

module.exports = getConnection;
