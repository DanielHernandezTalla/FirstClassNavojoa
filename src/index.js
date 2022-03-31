'use strict'
const express = require('express')
const path = require('path');

// Creamos la app con electron
const {
    app
} = require('electron');

// ---- Creamos la ventana desde electron ----
const {
    createWindow
} = require('./main');
// } = require('./components/personal/personal.window');

// Creamos la conexion con la base de datos
require('./database')

// Creamos el servidor de express
const server = express();

// Obtenemos las rutas que iran en nuesto servidor express
const router = require('./routes/router')

// Usamos express.json para que nos parse el contenido que nos manden
server.use(express.json());

// Agregamos las rutas al servidor express
router(server)

// Agregamos carpeta public
server.use('/public', express.static(path.join(__dirname, '/css')))

// Hacemos correr el servidor express
server.listen(3000, () => {
    console.log('listening on http://localhost:3000')
});

require('electron-reload')(__dirname)

app.allowRendererProcessReuse = false

// Cuando la aplicacion de electron esta lista, inicia y se crea la ventana
app.whenReady()
    .then(() => {
        createWindow(app)
    });
