const {
    BrowserWindow,
    Menu
} = require('electron');

let window;

function createWindow(app) {
    window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // -- Para quitar el menu
    // window.setMenu(null);
    window.on('closed', () => {
        app.quit();
    });

    window.loadFile('src/public/index.html');
}

module.exports = {
    createWindow,
    // showNewWindow
};
