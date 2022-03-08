'use strict';
const {
    BrowserWindow
} = require('electron')

const controller = require('./usuarios.controller');

let window

function createWindow(homeWindow) {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    window.loadFile('src/public/usuarios/usuarios.html')

    homeWindow.hide();

    window.on('close', () => {
        homeWindow.show();
    });
}


// Exportando la ventana y sus metodos
module.exports = {
    createWindowUsuarios: createWindow,
    
}