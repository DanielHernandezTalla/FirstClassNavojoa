const {
    BrowserWindow,
    Menu
} = require('electron');

let window;

function createWindow() {
    window = new BrowserWindow({
        width: 1024,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // -- Para quitar el menu
    // window.setMenu(null);

    window.loadFile('src/public/index.html');
}

module.exports = {
    createWindow,
    // showNewWindow
};
