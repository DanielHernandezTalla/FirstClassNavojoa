'use strict';
const Joi = require('joi');

const create = Joi.object({
    Nombre: Joi.string().min(3).max(100).required(),
    Salario: Joi.string().pattern(/^[0-9]+$/).max(5),
})

const update = Joi.object({
    Nombre: Joi.string().min(3).max(100).required(),
    Salario: Joi.string().pattern(/^[0-9]+$/).max(5),
})

const getById = Joi.object({
    id: Joi.number().required(),
})

module.exports = {
    create,
    update,
    getById,
}
