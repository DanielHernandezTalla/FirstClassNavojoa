'use strict';
const getConnection = require('../../database')

async function get() {
    return new Promise(async function (resolve, reject) {

        const conn = await getConnection()

        const personas = await conn.query('SELECT * FROM evento');

        resolve(personas)
    })
}

module.exports = {
    get
}
