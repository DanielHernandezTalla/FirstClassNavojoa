'use strict';
const res = require('express/lib/response');
const getConnection = require('../../database');

async function get(){
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const pagos = await conn.query('CALL spPago(1,NUll,NULL,NULL,NULL,NULL,NULL)');
        resolve(pagos[0]);
    })
}

async function getById(id){
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const pagos = await conn.query('CALL spPago(2,'+id+',NULL,NULL,NULL,NULL,NULL)');
        resolve(pagos[0]);
    })
}

async function add(body){
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const pagos = await conn.query('CALL spPago(3,NULL,'+body.IdEvento+','+body.NoAbono+',"'+body.FechaPago+'","'+body.MetodoPago+'",'+body.Monto+')');
        resolve({affectedRows: pagos["affectedRows"]});
    })
}

async function update(id, body) {
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const pagos = await conn.query('CALL spPago(2,'+id+',NULL,NULL,NULL,NULL,NULL)');

        let newBody = {
            ...pagos[0][0],
            ...body
        }
        const res = await conn.query('CALL spPago(3,NULL,'+newBody.IdEvento+','+newBody.NoAbono+',"'+newBody.FechaPago+'","'+newBody.MetodoPago+'",'+newBody.Monto+')');
        resolve({
            affectedRows: res["affectedRows"]
        });
    })
}

async function dlt(id){
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const pagos = await conn.query('CALL spPago(5,'+id+',NULL,NULL,NULL,NULL,NULL)');
        resolve({
            affectedRows:pagos["affectedRows"]
        });
    })
}

module.exports ={
    get, getById, add ,update,dlt
}