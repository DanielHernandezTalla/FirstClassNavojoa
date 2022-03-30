const express = require('express');
const multer = require('multer')
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const mySchema = require('./eventos.schema');
const controller = require('./eventos.controller');
const validate = require('../../middlewares/validator');
const response = require('../../middlewares/response');

const router = express.Router();

const upload = multer({
    dest: 'src/uploads'
})

router.get('/', (req, res) => {
    controller.get()
        .then(data => {
            response.success(req, res, data);
        })
        .catch(err => {
            response.error(req, res, "No se pudo acceder al recurso", 500, err);
        });
});

router.get('/:id', validate(mySchema, 'getById'), (req, res) => {

    controller.getbyid(req.params.id)
        .then(data => {
            response.success(req, res, data);
        })
        .catch(err => {
            response.error(req, res, "No se pudo acceder al recurso", 500, err);
        });

});

router.post('/', (req, res) => {

    controller.add(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(err => {
            response.error(req, res, "Error al crear el recurso", 500, err);
        });

});

router.patch('/:id', (req, res) => {
    controller.update(req.params.id, req.body)
        .then(data => {
            response.success(req, res, data);
        })
        .catch(err => {
            response.error(req, res, "Error al actualizar el recurso", 500, err);
        });

});

router.delete('/:id', validate(mySchema, 'getById'), (req, res) => {
    controller.dlt(req.params.id)
        .then(data => {
            response.success(req, res, data);
        })
        .catch(err => {
            response.error(req, res, "Error al eliminar el recurso", 500, err);
        });

});

router.get('/getMonth/:id', (req, res) => {

    controller.getMonth(req.params.id)
        .then(data => {
            response.success(req, res, data);
        })
        .catch(err => {
            response.error(req, res, "No se pudo acceder al recurso", 500, err);
        });

});

router.get('/getAvailableDays/:day', (req, res) => {

    // res.send("nasnk")

    controller.availableDays(req.params.day)
        .then(data => {
            response.success(req, res, data);
        })
        .catch(err => {
            response.error(req, res, "No se pudo acceder al recurso", 500, err);
        });

});

router.post('/savaImage', (req, res) => {

    let src = req.body.url;

    let newname = new Date();
    let extension = path.parse(req.body.url).ext;

    let newPath = path.join(__dirname, '../../', 'uploads', newname.getTime().toString() + extension);

    fsExtra.move(src, newPath, (err) => {
        if (err) {
            response.error(req, res, err);
        };

        response.success(req, res, newPath);
    });
});

router.delete('/removeImage/:name', (req, res) => {

    let filename = req.params.name

    let url = path.join(__dirname, '../../', 'uploads', filename)

    console.log(url)

    try {

        let resul = fs.unlinkSync(url)
        response.success(req, res);

    } catch (err) {
        response.error(req, res, "Error al eliminar el recurso");
    }
});

module.exports = router;
