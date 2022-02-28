'use strict';
const getConnection = require('../../database');

async function get(){
    return new Promise(async function(resolve, reject){
        const conn= await getConnection();
        const puestos = await conn.query('CALL spPuesto(1,NULL,NULL,NULL)');
        resolve(puestos);
    })
}

async function getbyid(id){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const puestos = await conn.query('CALL spPuesto(2,'+id+',NULL,NULL)');
        resolve(puestos);
    })
}

async function add(body){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const puestos = await conn.query('CALL spPuesto(3,NULL,"'+body.Nombre+'",'+body.Salario+')');
        resolve(puestos);
    })
}

async function update(body){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const puestos = await conn.query('CALL spPuesto(4,'+body.ID+',"'+body.Nombre+'",'+body.Salario+')')
        resolve(puestos);
    })
}

async function dlt(id){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const puestos = await conn.query('CALL spPuesto(5,'+id+',NULL,NULL)')
        resolve(puestos);
    })

}

module.exports ={
    get,getbyid,add,update,dlt
}