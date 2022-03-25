'use strict'
const Joi = require('joi');

const create = Joi.object({
    Cliente: Joi.string().min(3).max(100).required(),
    // TipoEvento : Joi.string().min(1).max(100),
    // Ubicacion: Joi.string().min(3).max(100),
    // FechaEvento: Joi.date().format('YYYY-MM-DD'),
    // Telefono: Joi.string().length(10).pattern(/^[0-9]+$/),
    // Sesion: Joi.date().format('YYYY-MM-DD-HH'),
    // CeremoniaCivil: Joi.string().min(3).max(100),
    // CasoEspecial: Joi.string().min(3).max(255),
    // NoPersonas: Joi.number(),
    // HoraInicio: Joi.time(),
    // HoraCena: Joi.time(),
    // Platillo: Joi.string().min(0).max(200),
    // Alcohol: Joi.string().min(0).max(150),
    // Croquis: Joi.string().min(3).max(250),
    // TipoMesa: Joi.string().min(0).max(150),

})

const update = Joi.object({
    Cliente: Joi.string().min(3).max(100).required(),
})

const getById = Joi.object({
    id: Joi.number().required(),
})

const getMonth = Joi.object({
    date: Joi.date().required(),
})

module.exports = {
    create,
    getById,
    update,
    getMonth
}
