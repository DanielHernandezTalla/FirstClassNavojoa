//import evento from './event.details.js';
const electron = require('electron')
const {
    remote
} = require('electron')

const main = remote.require('./main')

const fs = require('fs')

//import contenido from './documentos.pdf.js';
// Importing BrowserWindow from Main

export default async function imprimirEvent($content) {

    const htmlPDF = $content.cloneNode(true);

    console.log(htmlPDF);

    htmlPDF.querySelector('.container').style.margin = "0px";
    htmlPDF.querySelectorAll('.container')[1].style.margin = "0px";
    htmlPDF.querySelector('.container').style.padding = "0px";
    htmlPDF.querySelectorAll('.container')[1].style.padding = "0px";

    htmlPDF.querySelectorAll('label').forEach(label => {
        label.style.color = "black";
    })

    htmlPDF.querySelectorAll('p').forEach(p => {
        p.style.color = "black";
    })

    htmlPDF.querySelectorAll('link')[5].setAttribute('href', '../../../css/main.css');

    htmlPDF.querySelector('nav').outerHTML = ''

    htmlPDF.querySelectorAll('button').forEach(btn => {
        btn.outerHTML = ''
    })

    htmlPDF.querySelector('.pays-cheese').outerHTML = "";

    // // Editamos los links css
    // htmlPDF.querySelectorAll('link')[5].setAttribute('href', '../../../../css/main.css');
    //htmlPDF.querySelectorAll('link')[5].setAttribute('href', './css/main.css');
    // htmlPDF.querySelectorAll('link').outerHTML = ''
    // htmlPDF.querySelectorAll('link').outerHTML = ''

    //htmlPDF.querySelector('.btn-document-pdf-print').outerHTML = '';
    //htmlPDF.querySelector('.btn-document-pdf-cancel').outerHTML = '';
    //htmlPDF.querySelector('script').outerHTML = '';


    let content = htmlPDF.innerHTML;
    // console.log(content)

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

    // console.log('window creadop ')
    win = new BrowserWindow({
        show: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('src/public/app/components/eventos/docevento.html');
    win.once('ready-to-show', () => {
        // win.show()
    })

    win.webContents.on('did-finish-load', () => {
        win.webContents.print(options, async (success, failureReason) => {
            if (!success) console.log(failureReason);
            // console.log('Print Initiated');
            await fs.unlinkSync('src/public/app/components/eventos/docevento.html');
        });
    });
}

async function save(content) {
    try {
        // console.log("before save")
        await fs.writeFileSync('src/public/app/components/eventos/docevento.html', content);
        // console.log("after save")

        return true;
    } catch (e) {
        console.log("Cannot write file ", e);
        return false;
    }
}



// export default function eventPdf($Eventdoc)
// {
//     const $main = document.createElement('main');

//     const $divContainer = document.createElement('div');
//     $divContainer.classList.add('container-pdf');

//     divContainer.appendChild($Eventdoc);
//     $main.appendChild($divContainer);
// }
