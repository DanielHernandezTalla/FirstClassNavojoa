'use strict';
const getConnection = require('../../database');

async function get() {
    return new Promise(async function (resolve, reject) {
        try {
            const conn = await getConnection();
            const usuarios = await conn.query('CALL spUsuario(1,NULL,NULL,NULL,NULL)');
            resolve(usuarios[0]);
        } catch (e) {

            console.log(e)
            reject(e);
        }
    })
}

async function login(user) {
    return new Promise(async function (resolve, reject) {
        try {
            const conn = await getConnection();
            const usuarios = await conn.query(`CALL spLogin('${user.name}','${user.password}')`);
            resolve(usuarios[0]);
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
            const usuarios = await conn.query('CALL spUsuario(2,' + id + ',NULL,NULL,NULL)');
            resolve(usuarios[0]);
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
            const usuarios = await conn.query('CALL spUsuario(3,NULL,"' + body.Nombre + '",' + body.Telefono + ', ' + body.Contraseña + ')');
            resolve({
                affectedRows: usuarios["affectedRows"]
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
            const usuarios = await conn.query('CALL spUsuario(2, ' + id + ',NULL,NULL, NULL)')

            let newBody = {
                ...usuarios[0][0],
                ...body
            }

            const res = await conn.query('CALL spUsuario(4,' + id + ',"' + newBody.Nombre + '",' + newBody.Telefono + ',' + newBody.Contraseña + ')');
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
            const usuarios = await conn.query('CALL spUsuario(5,' + id + ',NULL,NULL, NULL)')
            resolve({
                affectedRows: usuarios["affectedRows"]
            });
        } catch (e) {
            console.log(e)
            reject(e);
        }
    })

}

module.exports = {
    get,
    login,
    getbyid,
    add,
    update,
    dlt
}
