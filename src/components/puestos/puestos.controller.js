'use strict';
const getConnection = require('../../database');

async function get() {
    return new Promise(async function (resolve, reject) {
        try {
            const conn = await getConnection();
            const puestos = await conn.query('CALL spPuesto(1,NULL,NULL,NULL)');
            resolve(puestos[0]);
        } catch (e) {

            console.log(e)
            reject(e);
        }
    })
}

async function getbyid(id) {
    return new Promise(async function (resolve, reject) {
        try {
            const conn = await getConnection();
            const puestos = await conn.query('CALL spPuesto(2,' + id + ',NULL,NULL)');
            resolve(puestos[0]);
        } catch (e) {

            console.log(e)
            reject(e);
        }
    })
}

async function add(body) {
    return new Promise(async function (resolve, reject) {
        try {
            const conn = await getConnection();
            const puestos = await conn.query('CALL spPuesto(3,NULL,"' + body.Nombre + '",' + body.Salario + ')');
            resolve({
                affectedRows: puestos["affectedRows"]
            });
        } catch (e) {

            console.log(e)
            reject(e);
        }
    })
}

async function update(id, body) {
    return new Promise(async function (resolve, reject) {
        try {
            const conn = await getConnection();
            const puesto = await conn.query('CALL spEmpleado(2, ' + id + ',NULL,NULL)')

            let newBody = {
                ...puesto[0][0],
                ...body
            }

            const res = await conn.query('CALL spPuesto(4,' + id + ',"' + newBody.Nombre + '",' + newBody.Salario + ')');
            resolve({
                affectedRows: res["affectedRows"]
            });
        } catch (e) {

            console.log(e)
            reject(e);
        }
    })
}

async function dlt(id) {
    return new Promise(async function (resolve, reject) {
        try {
            const conn = await getConnection();
            const puestos = await conn.query('CALL spPuesto(5,' + id + ',NULL,NULL)')
            resolve({
                affectedRows: ["affectedRows"]
            });
        } catch (e) {

            console.log(e)
            reject(e);
        }
    })

}

module.exports = {
    get,
    getbyid,
    add,
    update,
    dlt
}
