'use strict'
const Joi = require('Joi');

const create= Joi.object({
//    monto: Joi.number().required(),
//    IdEvento:  Joi.number().required(),
//    NoAbono: Joi.number().required(),
})

const update = Joi.object({
//    monto: Joi.number.required(),
})

const getById = Joi.object({
    id: Joi.number().required()
})

module.exports ={
    create, getById,update
}