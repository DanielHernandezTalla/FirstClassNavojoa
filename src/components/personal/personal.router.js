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

    controller.getbyid(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });

});

router.post('/', (req, res) => {
    controller.add(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });

});

router.patch('/:id', (req, res) => {
    controller.update(req.params.id, req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });

});

router.delete('/:id', (req, res) => {
    controller.dlt(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });

});

module.exports = router;
