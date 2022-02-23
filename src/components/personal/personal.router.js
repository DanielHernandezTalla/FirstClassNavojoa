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

module.exports = router;
