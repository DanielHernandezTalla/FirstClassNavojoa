'use strict';
const getConnection = require('../../database');

async function get(){
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)');
      resolve(eventos[0]);
    })
}

async function getbyid(id){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(2,'+id+',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)');
        resolve(eventos[0]);
    })
}

async function add(body){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(3, NULL,"'+body.Cliente+'","'+body.TipoEvento+'","'+body.Ubicacion+'","'+body.FechaEvento+'","'+body.Telefono+'","'+body.Sesion+'","'+body.CeremoniaCivil+'","'+body.CasoEspecial+'",'+body.NoPersonas+',"'+body.HoraInicio+'","'+body.HoraCena+'","'+body.Platillo+'","'+body.Alcohol+'","'+body.Croquis+'","'+body.TipoMesa+'","'+body.TipoSilla+'","'+body.Mantel+'",'+body.CostoTotal+','+body.AbonoTotal+',"'+body.Cristaleria+'",'+body.NoMeseros+',"'+body.Servilleta+'")');
        resolve({
            affectedRows: eventos["affectedRows"]
        });
    })
}

async function update(id, body){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(2,'+id+',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)');
        
        let newBody = {
            ...eventos[0][0],
            ...body
        }
        const res = await conn.query('CALL spEvento(4, '+id+',"'+newBody.Cliente+'","'+newBody.TipoEvento+'","'+newBody.Ubicacion+'","'+newBody.FechaEvento+'","'+newBody.Telefono+'","'+newBody.Sesion+'","'+newBody.CeremoniaCivil+'","'+newBody.CasoEspecial+'",'+newBody.NoPersonas+',"'+newBody.HoraInicio+'","'+newBody.HoraCena+'","'+newBody.Platillo+'","'+newBody.Alcohol+'","'+newBody.Croquis+'","'+newBody.TipoMesa+'","'+newBody.TipoSilla+'","'+newBody.Mantel+'",'+newBody.CostoTotal+','+newBody.AbonoTotal+',"'+newBody.Cristaleria+'",'+newBody.NoMeseros+',"'+newBody.Servilleta+'")');
        resolve({
            affectedRows: res["affectedRows"]
        });
    })
}

async function dlt(id){
    return new Promise(async function(resolve, reject){
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(5,'+id+',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)');
        resolve({
            affectedRows:eventos["affectedRows"]
        });
    })
}

async function getMonth(date){
    return new Promise(async function (resolve, reject) {
        const conn = await getConnection();
        const eventos = await conn.query('CALL spEvento(6,NULL,NULL,NULL,NULL,"2022-04-01",NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)');
        resolve(eventos[0]);
    })
}
module.exports ={
    get, getbyid,add ,update,dlt,getMonth
}