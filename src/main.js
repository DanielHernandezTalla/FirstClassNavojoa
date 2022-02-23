const {
    BrowserWindow
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

    window.loadFile('src/public/index.html');
}

module.exports = {
    createWindow
};
