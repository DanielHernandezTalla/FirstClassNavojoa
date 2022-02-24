const express = require('express');

const controller = require('./personal.controller');

const router = express.Router();

router.get('/', (req, res) => {
    controller.get()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

router.patch('/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    res.send(req.body);
});

router.delete('/:id', (req, res) => {
    console.log(req.params.id);

    res.send("Eliminado correctamente");
});

module.exports = router;
