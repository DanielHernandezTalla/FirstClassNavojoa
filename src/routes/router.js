'use strict';
const personal = require('../components/personal/personal.router');
const puestos = require('../components/puestos/puestos.router');
const eventos = require('../components/eventos/eventos.router');

function router(server) {
    server.use('/personal', personal);
    server.use('/puestos', puestos);
    server.use('/eventos', eventos);
}

module.exports = router;
