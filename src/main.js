const {
    BrowserWindow
} = require('electron');

const {
    createWindowPersonal
} = require('./components/personal/personal.window');

const {
    createWindowPuestos
} = require('./components/puestos/puestos.window');

let window;

function createWindow() {
    window = new BrowserWindow({
        width: 1024,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });

    window.loadFile('src/public/home/index.html');
}

function showNewWindow(id) {
    if (id === 1) {
        createWindowPersonal(window);
    }
    if (id === 2) {
        createWindowPuestos(window);
    }
}

module.exports = {
    createWindow,
    showNewWindow
};
