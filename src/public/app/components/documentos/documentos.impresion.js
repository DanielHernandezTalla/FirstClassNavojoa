const electron = require('electron')

// const path = require('path');

// const {
//     BrowserWindow
// } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')


const {
    remote
} = require('electron')

const main = remote.require('./main')

// const fs = require('fs')

import contenido from './documentos.pdf.js';
import modalConfirm from '../modal.confirm.js';
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

    htmlPDF.querySelectorAll('.pdf-table').forEach(el => {
        el.classList.add('pdf-table-mt-0');
        let elemento = el.querySelector('b');
        console.log(elemento);

        if (elemento) {
            let texto = el.querySelector('b').textContent;
            console.log(texto);
            if (texto === "Mesero") {
                el.classList.add('pdf-table-break');
            }
        }

    })
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

    // var options = {
    //     silent: false,
    //     printBackground: true,
    //     color: false,
    //     margin: {
    //         marginType: 'printableArea'
    //     },
    //     landscape: false,
    //     pagesPerSheet: 1,
    //     collate: false,
    //     copies: 1,
    //     header: 'Header of the Page',
    //     footer: 'Footer of the Page',
    //     printBackground: true
    // }
    var options = {
        //     marginsType: 2,
        //     printBackground: true,
        //     printSelectionOnly: false,
        //     landscape: true,
        //     pageSize: 'A4',
        //     scaleFactor: 80
    }

    // const options = {
    //     silent: true,
    //     deviceName: 'My-Printer',
    //     pageRanges: [{
    //         from: 0,
    //         to: 1
    //     }]
    // }

    // console.log('window creadop ')
    // win = new BrowserWindow({
    //     show: false,
    // webPreferences: {
    //     nodeIntegration: true
    // }
    // });

    let URL = path.join(__dirname, '../../../', 'docdumento.html');

    // win.loadFile(URL);
    // win.once('ready-to-show', () => {
    //     // win.show()
    // })

    // win.webContents.on('did-finish-load', () => {
    //     win.webContents.print(options, async (success, failureReason) => {
    //         if (!success) console.log(failureReason);
    //         // console.log('Print Initiated');
    //         await fs.unlinkSync(URL);
    //     });
    // });
    const win = new BrowserWindow({
        show: false,
        width: 800,
        height: 600
    })
    win.loadURL(URL)

    win.webContents.on('did-finish-load', () => {
        // Use default printing options
        const pdfPath = path.join(os.homedir(), 'Desktop', 'formatoPersonal.pdf')
        win.webContents.print({
            marginsType: 2,
            printBackground: true,
            printSelectionOnly: false,
            landscape: false,
            pageSize: 'A4',
            scaleFactor: 100
        }).then(data => {
            fs.writeFile(pdfPath, data, (error) => {
                if (error) throw error
                console.log(`Wrote PDF successfully to ${pdfPath}`)
                fs.unlinkSync(URL);
            })
        }).catch(error => {
            console.log(`Failed to write PDF to ${pdfPath}: `, error)
        })
    })
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
