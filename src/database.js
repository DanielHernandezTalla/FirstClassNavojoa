//Configuration of connection to database
const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'beajjg9oovumjxjrwknn-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'uwzm74uonuqr1alp',
    password: 'tWpuxqakUnhHGNmkvVJO',
    database: 'beajjg9oovumjxjrwknn'
})

// database Name id16766404_sfc
// dbUser 	id16766404_root
// XJc!4MTap4aJkQjL

function getConnection() {
    return connection;
}

module.exports = getConnection;
