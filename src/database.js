//Configuration of connection to database
const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: 'Daniel2000',
    database: 'electrondb'
});

function getConnection() {
    return connection;
}

module.exports = getConnection;
