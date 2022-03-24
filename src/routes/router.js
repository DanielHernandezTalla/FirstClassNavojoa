'use strict';
const personal = require('../components/personal/personal.router');
const puestos = require('../components/puestos/puestos.router');
const eventos = require('../components/eventos/eventos.router');
const usuarios = require('../components/usuarios/usuarios.router');
const pagos = require('../components/pagos/pagos.router');

function router(server) {
    server.use('/personal', personal);
    server.use('/puestos', puestos);
    server.use('/eventos', eventos);
    server.use('/usuarios', usuarios);
    server.use('/pagos', pagos);
}

module.exports = router;
