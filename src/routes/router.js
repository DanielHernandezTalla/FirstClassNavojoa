'use strict';
const personal = require('../components/personal/personal.router');
const puestos = require('../components/personal/personal.router');

function router(server) {
    server.use('/personal', personal);
    server.use('/puestos', puestos);
}

module.exports = router;
