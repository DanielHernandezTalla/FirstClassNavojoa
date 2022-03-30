const electron = require('electron')
const path = require('path');

const {
    remote
} = require('electron')

const main = remote.require('./main')

const fs = require('fs')

import contenido from './documentos.pdf.js';
// Importing BrowserWindow from Main

export default async function imprimir(data) {

    const htmlPDF = data.cloneNode(true);

    // // Editamos los links css
    htmlPDF.querySelectorAll('link').forEach((link, index) => {
        if (index === 7 || index === 8)
            link.outerHTML = '';
        if (index === 9)
            link.setAttribute('href', 'http://localhost:3000/public/main.css');
    })

    htmlPDF.querySelector('.btn-document-pdf-print').outerHTML = '';
    htmlPDF.querySelector('.btn-document-pdf-cancel').outerHTML = '';
    htmlPDF.querySelector('script').outerHTML = '';


    let content = htmlPDF.innerHTML;

    if (await save(content))
        createWindow();
    else
        console.log("no guardado")

}

let win;

function createWindow() {
    const BrowserWindow = electron.remote.BrowserWindow;

    var options = {
        silent: false,
        printBackground: true,
        color: false,
        margin: {
            marginType: 'printableArea'
        },
        landscape: false,
        pagesPerSheet: 1,
        collate: false,
        copies: 1,
        header: 'Header of the Page',
        footer: 'Footer of the Page'
    }

    // console.log('window creadop ')
    win = new BrowserWindow({
        show: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    let URL = path.join(__dirname, '../../../', 'docdumento.html');

    win.loadFile(URL);
    win.once('ready-to-show', () => {
        // win.show()
    })

    win.webContents.on('did-finish-load', () => {
        win.webContents.print(options, async (success, failureReason) => {
            if (!success) console.log(failureReason);
            // console.log('Print Initiated');
            await fs.unlinkSync(URL);
        });
    });
}

async function save(content) {
    try {
        let URL = path.join(__dirname, '../../../', 'docdumento.html');

        console.log('==================')
        console.log(__dirname)
        console.log(URL)
        await fs.writeFileSync(URL, content);
        // console.log("after save")

        return true;
    } catch (e) {
        console.log("Cannot write file ", e);
        return false;
    }
}
