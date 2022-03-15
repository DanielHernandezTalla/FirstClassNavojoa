import nav from '../nav.js';
import imprimir from './documentos.impresion.js';
const fs = require('fs')

export default function documentPDF(data, $mainDocument) {
    // -- Main
    const $main = document.createElement('main');

    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container-pdf');

    const $pdfHeader = document.createElement('div');
    $pdfHeader.classList.add('pdf-header');

    // console.log(__dirname);
    let date;
    if (data.fecha) {
        date = new Date(data.fecha);
        date.setDate(date.getDate() + 1);
    } else
        date = new Date();

    let mes = "";

    switch (String(date.getMonth() + 1).padStart(2, '0')) {
        case '01':
            mes = "Enero";
            break;
        case '02':
            mes = "Febrero";
            break;
        case '03':
            mes = "Marzo";
            break;
        case '04':
            mes = "Abril";
            break;
        case '05':
            mes = "Mayo";
            break;
        case '06':
            mes = "Junio";
            break;
        case '07':
            mes = "Julio";
            break;
        case '08':
            mes = "Agosto";
            break;
        case '09':
            mes = "Septiembre";
            break;
        case '10':
            mes = "Octubre";
            break;
        case '11':
            mes = "Noviembre";
            break;
        default:
            mes = "Diciembre";
            break;
    }

    let dateFormatted = String(date.getDate()).padStart(2, '0') + ' de ' + mes + ' del ' + date.getFullYear();
    // let dateFormatted = "";

    $pdfHeader.innerHTML += `
        <div>
            <img class="pdf__logo" src="${__dirname+'/app/assets/logo-pdf.jpg'}" alt="Logo First Class">
        </div>
        <div>
            <p><b>FIRST CLASS</b></p>
            <p>Tipo Evento: ${data.tipoEvento}</p>
            <p>Fecha: ${dateFormatted}</p>
            <p>Lugar: ${data.lugar.salon && data.lugar.jardin?"Salon/Jardin": data.lugar.salon?"Salon":data.lugar.jardin?"Jardin":""}</p>
            <p>Catidad Personas: ${data.cantidadPersonas}</p>
        </div>
    `;

    $divContainer.appendChild($pdfHeader)

    const $pdfTable = document.createElement('div');
    $pdfTable.classList.add('pdf-table');

    const $persona = document.createElement('div');

    data.puestos.forEach(item => {

        const $pdfTableName = document.createElement('p');
        $pdfTableName.innerHTML = `<b>${item.puesto}</b>`;

        $pdfTable.innerHTML = ``;
        $pdfTable.appendChild($pdfTableName);

        if (item.personas.length > 0)
            item.personas.forEach(persona => {

                $persona.innerHTML = `
                <p>${persona.Nombre}</p>
                <p>$ ${persona.Salario}</p>
                <hr>
            `;
                $pdfTable.appendChild($persona.cloneNode(true));
            })

        if (item.personas.length > 0)
            $divContainer.appendChild($pdfTable.cloneNode(true));
    })

    $pdfTable.innerHTML = ``
    $persona.innerHTML = `
        <p class="pdf-total">Total</p>
        <p>$ ${data.total}</p>
    `;

    $pdfTable.appendChild($persona);
    $divContainer.appendChild($pdfTable.cloneNode(true));

    $pdfTable.innerHTML = `
        <button class="btn btn-primary btn-document-pdf-print">Imprimir</button>
        <button class="btn btn-cancel btn-document-pdf-cancel">Cancelar</button>
    `;

    $divContainer.appendChild($pdfTable);

    $main.appendChild($divContainer);

    document.addEventListener('click', async e => {
        if (e.target.matches('.btn-document-pdf-cancel')) {
            const $root = document.getElementById("root");
            const $main = $root.querySelector('main');

            $main.parentNode.removeChild($main);

            $root.appendChild(nav());
            $root.appendChild($mainDocument);
            // try {
            //     await fs.unlinkSync('src/public/app/components/documentos/docdumento.html');
            // } catch (e) {

            // }

        }
    })
    return $main;
}

document.addEventListener('click', async e => {
    if (e.target.matches('.btn-document-pdf-print')) {
        await imprimir(document.querySelector('html'));
    }
});
