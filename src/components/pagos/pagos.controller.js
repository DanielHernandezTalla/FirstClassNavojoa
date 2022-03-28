'use strict';
const res = require('express/lib/response');
const getConnection = require('../../database');

async function get() {
    return new Promise(async function (resolve, reject) {
        try {
            const conn = await getConnection();
            const pagos = await conn.query('CALL spPago(1,NUll,NULL,NULL,NULL,NULL,NULL)');
            resolve(pagos[0]);
        } catch (e) {

            console.log(e)
            reject(e);
        }
    })
}

async function getById(id) {
    return new Promise(async function (resolve, reject) {
        try {
            const conn = await getConnection();
            const pagos = await conn.query('CALL spPago(2,' + id + ',NULL,NULL,NULL,NULL,NULL)');
            resolve(pagos[0]);
        } catch (e) {

            console.log(e)
            reject(e);
        }
    })
}

async function add(body, confirm) {
    return new Promise(async function (resolve, reject) {
        try {
            const conn = await getConnection();
            const pagos = await conn.query('CALL spPago(3,NULL,' + body.IdEvento + ',' + body.NoAbono + ',"' + body.FechaPago + '","' + body.MetodoPago + '",' + body.Monto + ')');

            if (pagos[0][0]['@ABONO'])
                resolve({
                    isMayor: pagos[0][0]['@ABONO']
                });

            resolve({
                affectedRows: pagos["affectedRows"]
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
            const pagos = await conn.query('CALL spPago(2,' + id + ',NULL,NULL,NULL,NULL,NULL)');

            let newBody = {
                ...pagos[0][0],
                ...body
            }
            const res = await conn.query('CALL spPago(3,NULL,' + newBody.IdEvento + ',' + newBody.NoAbono + ',"' + newBody.FechaPago + '","' + newBody.MetodoPago + '",' + newBody.Monto + ')');
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
            const pagos = await conn.query('CALL spPago(5,' + id + ',NULL,NULL,NULL,NULL,NULL)');
            resolve({
                affectedRows: pagos["affectedRows"]
            });
        } catch (e) {

            console.log(e)
            reject(e);
        }
    })
}

module.exports = {
    get,
    getById,
    add,
    update,
    dlt
}
