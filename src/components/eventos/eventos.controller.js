'use strict';
const getConnection = require('../../database');

async function get(){
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)');
        resolve(eventos);
    })
}

async function getbyid(id){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(2,'+id+',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)');
        resolve(eventos);
    })
}

async function add(body){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(3, NULL,"'+body.Cliente+'","'+body.TipoEvento+'","'+body.Ubicacion+'","'+body.FechaEvento+'","'+body.Telefono+'","'+body.Sesion+'","'+body.CeremoniaCivil+'","'+body.CasoEspecial+'",'+body.NoPersonas+',"'+body.HoraInicio+'","'+body.HoraCena+'","'+body.Platillo+'","'+body.Alcohol+'","'+body.Croquis+'","'+body.TipoMesa+'","'+body.TipoSilla+'","'+body.Mantel+'",'+body.CostoTotal+','+body.AbonoTotal+',"'+body.Cristaleria+'",'+body.NoMeseros+',"'+body.Servilleta+'")');
        resolve(eventos);
    })
}

async function update(body){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(4, '+body.ID+',"'+body.Cliente+'","'+body.TipoEvento+'","'+body.Ubicacion+'","'+body.FechaEvento+'","'+body.Telefono+'","'+body.Sesion+'","'+body.CeremoniaCivil+'","'+body.CasoEspecial+'",'+body.NoPersonas+',"'+body.HoraInicio+'","'+body.HoraCena+'","'+body.Platillo+'","'+body.Alcohol+'","'+body.Croquis+'","'+body.TipoMesa+'","'+body.TipoSilla+'","'+body.Mantel+'",'+body.CostoTotal+','+body.AbonoTotal+',"'+body.Cristaleria+'",'+body.NoMeseros+',"'+body.Servilleta+'")');
        resolve(eventos);
    })
}

async function dlt(id){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(5,'+id+',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)');
        resolve(eventos);
    })
}
module.exports ={
    get, getbyid,add ,update,dlt
}