
const $root = document.getElementById("root");
const $main = $root.querySelector('main');

$root.innerHTML = ``;

const $divContainer = document.createElement('div');
$divContainer.classList.add('container-pdf');

const $pdfHeader = document.createElement('div');
$pdfHeader.classList.add('pdf-header');

// console.log(__dirname);

let date = new Date();
let dateFormatted = String(date.getDate()).padStart(2, '0') + ' de ' + String(date.getMonth() + 1).padStart(2, '0') + ' del ' + date.getFullYear();

$pdfHeader.innerHTML += `
    <div>
    </div>
    <div>
        <p><b>FIRST CLASS</b></p>
        <p>Tipo Evento: Carreta </p>
        <p>Fecha: ${dateFormatted}</p>
        <p>Lugar: Lopez</p>
        <p>Catidad Personas: toronjas</p>
    </div>
`;

$divContainer.appendChild($pdfHeader)

$root.appendChild($divContainer);