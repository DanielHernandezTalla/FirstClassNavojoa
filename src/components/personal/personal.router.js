const express = require('express');

const controller = require('./personal.controller');
const mySchema = require('./personal.schema');
const validate = require('../../middlewares/validator');
const response = require('../../middlewares/response');

const router = express.Router();

router.get('/', (req, res) => {
    controller.get()
        .then(data => {
            response.success(req, res, data);
            // res.send(data);
        })
        .catch(err => {
            response.error(req, res, "No se pudo acceder al recurso", 500, err);
            // res.send(err);
        });
});

router.get('/:id', validate(mySchema, 'getById'), (req, res) => {

    controller.getbyid(req.params.id)
        .then(data => {
            response.success(req, res, data);
            // res.status(200).send({});
        })
        .catch(err => {
            response.error(req, res, "No se pudo acceder al recurso", 500, err);
            // res.status(400).send({});
            // res.send(err);
        });
});

router.post('/', validate(mySchema, 'create'), (req, res) => {

    controller.add(req.body)
        .then(data => {
            response.success(req, res, data, 201);
            // res.send(data);
        })
        .catch(err => {
            response.error(req, res, "Error al crear el recurso", 500, err);
            // res.send(err);
        });
});

router.patch('/:id', validate(mySchema, 'edit'), (req, res) => {
    controller.update(req.params.id, req.body)
        .then(data => {
            response.success(req, res, data);
            // res.send(data);
        })
        .catch(err => {
            response.error(req, res, "Error al actualizar el recurso", 500, err);
            // res.send(err);
        });
});

router.delete('/:id', validate(mySchema, 'getById'), (req, res) => {
    controller.dlt(req.params.id)
        .then(data => {
            response.success(req, res, data);
            // res.send(data);
        })
        .catch(err => {
            response.error(req, res, "Error al eliminar el recurso", 500, err);
            // res.send(err);
        });
});

module.exports = router;
