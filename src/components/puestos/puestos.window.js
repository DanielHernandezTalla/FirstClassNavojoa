'use strict';
const {
    BrowserWindow
} = require('electron')

const controller = require('./puestos.controller');

let window

function createWindow(homeWindow) {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    window.loadFile('src/public/puestos/puestos.html')

    homeWindow.hide();

    window.on('close', () => {
        homeWindow.show();
    });
}

// async function getPersonal() {
//     controller.get()
//         .then(data => {
//             return data;
//         })
//         .catch(err => {
//             return err;
//         });
// }

// Exportando la ventana y sus metodos
module.exports = {
    createWindowPuestos: createWindow,
    // getPersonal
}
