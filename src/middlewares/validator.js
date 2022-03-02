'use strict';

const response = require('./response');

// -- Validando los datos
function validate(schema, action) {
    return (req, res, next) => {

        let error = null;

        // -- Validando para crear
        if (action === 'create')
            error = validateCreate(req, schema);

        // -- Validando para id's
        if (action === 'getById')
            error = validateGetById(req, schema);

        // -- Validando para editar
        if (action === 'edit') {
            error = validateGetById(req, schema);
            if (error) {
                response.error(req, res, error, 400, error);
                return;
            }
            error = validateUpdate(req, schema);
        }

        // -- En caso de error, este se regresa al cliente, si no continua normal
        if (error)
            response.error(req, res, error, 400, error);
        else
            next();
    }
}

// -- Validando el id
function validateGetById(req, schema) {
    let data = req.params;

    const {
        error
    } = schema.getById.validate(data, {
        abortEarly: false
    });

    return error;
}

// -- Validando el body para crear un nuevo recurso
function validateCreate(req, schema) {
    let data = req.body;

    const {
        error
    } = schema.create.validate(data, {
        abortEarly: false
    });

    return error;
}

// -- Validando datos que vengan, cuando se baya a actualizar
function validateUpdate(req, schema) {
    let data = req.body;

    const {
        error
    } = schema.update.validate(data, {
        abortEarly: false
    });

    return error;
}

module.exports = validate
