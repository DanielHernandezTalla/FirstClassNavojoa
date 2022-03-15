const electron = require('electron')
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
    htmlPDF.querySelectorAll('link')[5].setAttribute('href', '../../../css/main.css');
    // htmlPDF.querySelectorAll('link').outerHTML = ''
    // htmlPDF.querySelectorAll('link').outerHTML = ''

    htmlPDF.querySelector('.btn-document-pdf-cancel').outerHTML = '';
    htmlPDF.querySelector('script').outerHTML = '';


    let content = htmlPDF.innerHTML;
    console.log(content)

    // await setTimeout(() => {
    if (await save(content))
        // }, 1500);
        // await main.saveFile(content)

        createWindow();
    else {
        console.log("no guardado")
    }
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

    console.log('window creadop ')
    win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('src/public/app/components/documentos/docdumento.html');
    win.once('ready-to-show', () => {
        // win.show()
    })

    win.webContents.on('did-finish-load', () => {
        win.webContents.print(options, async (success, failureReason) => {
            if (!success) console.log(failureReason);
            console.log('Print Initiated');
            await fs.unlinkSync('src/public/app/components/documentos/docdumento.html');
        });
    });
}

async function save(content) {
    try {
        console.log("before save")
        await fs.writeFileSync('src/public/app/components/documentos/docdumento.html', content);
        console.log("after save")

        return true;
    } catch (e) {
        console.log("Cannot write file ", e);
        return false;
    }
}
