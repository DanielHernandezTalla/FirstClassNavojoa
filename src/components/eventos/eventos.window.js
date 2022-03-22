'use strict';
const{
    BrowserWindow
} = require('electron')

const controller = require('./eventos.controller');

let window

function createWindow(homeWindow) {
    window = new BrowserWindow({
        width:800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    window.loadFile('src/public/eventos/eventos.html')

    homeWindow.hide();

    window.on('close', () => {
        homeWindow.show();
    })
}

async function getEventos()
{
    try{
        let data = await controller.get();
        return data;
    }
    catch(error){
        return error;
    }
}

module.exports = {
    createWindowEvento: createWindow,
    getEventos
}