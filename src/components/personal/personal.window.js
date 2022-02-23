'use strict';
const {
    BrowserWindow
} = require('electron')

const controller = require('./personal.controller');

let window

function createWindow(homeWindow) {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    window.loadFile('src/public/personal/personal.html')

    homeWindow.hide();

    window.on('close', () => {
        homeWindow.show();
    });
}

async function getPersonal() {
    try {

        let data = await controller.get();

        return data;
    } catch (error) {
        return error;
    }
}

// Exportando la ventana y sus metodos
module.exports = {
    createWindowPersonal: createWindow,
    getPersonal
}
