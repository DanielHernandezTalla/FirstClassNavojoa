const electron = require('electron')
import contenido from './documentos.pdf.js';
// Importing BrowserWindow from Main

export default async function imprimir(data){
const BrowserWindow = electron.remote.BrowserWindow;
  
//var url = document.getElementById('pdf');
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

    let win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // win.webContents.on('dom-ready',()=>{
    //     win.webContents.executeJavaScript(`
    //     require('electron').ipcRenderer.send('contenido', document.body.innerHTML);
    //     `);
    // })
    // ipc.on('contenido',(_,contenido)=>{console.log(contenido)})
    win.loadFile('src/public/app/components/documentos/documento.html');
    win.once('ready-to-show', () => {
        win.show()
      })
      
    win.webContents.on('did-finish-load',() => {
        win.webContents.print(options, (success, failureReason) => {
            if (!success) console.log(failureReason);
            console.log('Print Initiated');
        });
    });

    console.log("a continuacion win:")
    console.log(win);
}