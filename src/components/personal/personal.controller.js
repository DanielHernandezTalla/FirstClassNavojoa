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

        resolve(persona[0]);
    })
}

async function add(body) {
    return new Promise(async function (resolve, reject) {

        if (body.Telefono === "0000000000")
            body.Telefono = ""

        const conn = await getConnection();

        const persona = await conn.query('CALL spEmpleado(3, NULL,"' + body.Nombre + '","' + body.Telefono + '")');

        resolve({
            affectedRows: persona["affectedRows"]
        });
    });
}

async function update(id, body) {
    return new Promise(async function (resolve, reject) {

        if (body.Telefono === "0000000000")
            body.Telefono = ""

        const conn = await getConnection();

        // -- Primero obtenemos los datos del recurso a actualizar
        const persona = await conn.query('CALL spEmpleado(2,' + id + ',NULL,NULL)');

        // -- Creamos un objeto combinando los datos recividos con los de la base de datos
        let newBody = {
            ...persona[0][0],
            ...body
        }
        // -- Actualizamos al recurso
        const res = await conn.query('CALL spEmpleado(4, "' + id + '","' + newBody.Nombre + '","' + newBody.Telefono + '")');

        resolve({
            affectedRows: res["affectedRows"]
        });
    });
}

async function dlt(id) {
    return new Promise(async function (resolve, reject) {

        const conn = await getConnection();

        const persona = await conn.query('CALL spEmpleado(5,' + id + ',NULL, NULL)');

        resolve({
            affectedRows: persona["affectedRows"]
        });
    });
}

module.exports = {
    get,
    getbyid,
    add,
    update,
    dlt
}
