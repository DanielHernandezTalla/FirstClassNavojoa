'use strict';
const Joi = require('joi');

const create = Joi.object({
    Nombre: Joi.string().min(3).max(100).required(),
    Telefono: Joi.string().length(10).pattern(/^[0-9]+$/),
    Contraseña: Joi.string().min(3).max(100).required(),
})

const update = Joi.object({
    Nombre: Joi.string().min(3).max(100),
    Telefono: Joi.string().length(10).pattern(/^[0-9]+$/),
    Contraseña: Joi.string().min(3).max(100),
})

const getById = Joi.object({
    id: Joi.number().required(),
})

module.exports = {
    create,
    update,
    getById,
}
