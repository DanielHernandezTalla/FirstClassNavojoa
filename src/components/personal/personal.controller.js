'use strict';
const getConnection = require('../../database')

async function get() {
    return new Promise(async function (resolve, reject) {

        const conn = await getConnection()

        const personas = await conn.query('SELECT * FROM empleado');

        resolve(personas)
    })
}

async function getbyid(id) {
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const persona = await conn.query('CALL spEmpleado(2,' + id + ',NULL,NULL)');
        resolve(persona);
    })
}

async function add(body) {
    console.log(body);
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const persona = await conn.query('CALL spEmpleado(3, NULL,"' + body.Nombre + '","' + body.Telefono + '")');
        resolve(persona);
    });
}

async function update(body) {
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const persona = await conn.query('CALL spEmpleado(4, "' + body.ID + '","' + body.Nombre + '","' + body.Telefono + '")');
        resolve(persona);
    });
}

async function dlt(id) {
    console.log(id);
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const persona = await conn.query('CALL spEmpleado(5,' + id + ',NULL, NULL)');
        resolve(persona);
    });
}

module.exports = {
    get,
    getbyid,
    add,
    update,
    dlt
}
