'use strict';
import sectionDocument from './documentos.js';

export default async function sectionDocumentOptions() {

    let options = [{
            //icon: '<i class="bi bi-file-earmark"></i>',
            img: 'app/assets/icon_empty.png',
            value: 'Vacio'
        },
        {
            //icon: '<i class="bi bi-file-earmark-arrow-up"></i>',
            img: 'app/assets/icon_basic.png',
            value: 'Basico'
        },
        {
            //icon: '<i class="bi bi-file-earmark-excel"></i>',
            img: 'app/assets/icon_salon.png',
            value: 'Anterior salon'
        },
        {
            //icon: '<i class="bi bi-file-earmark-excel"></i>',
            img: 'app/assets/icon_garden.png',
            value: 'Anterior Jardin'
        },
        {
            //icon: '<i class="bi bi-file-earmark-lock"></i>',
            img: 'app/assets/icon_wedding.png',
            value: 'Boda'
        },
        {
            //icon: '<i class="bi bi-file-earmark-excel"></i>',
            img: 'app/assets/icon_xv.png',
            value: 'Quince años'
        },
        {
            //icon: '<i class="bi bi-file-earmark-easel"></i>',
            img: 'app/assets/icon_baptism.png',
            value: 'Bautizo'
        },
        {
            //icon: '<i class="bi bi-file-earmark-lock"></i>',
            img: 'app/assets/icon_shower.png',
            value: 'Shower'
        },
        {
            //icon: '<i class="bi bi-file-earmark-excel"></i>',
            img: 'app/assets/icon_party.png',
            value: 'Piñata'
        },
      
    ]

    // -- Main
    const $main = document.createElement('main');

    // -- Creamos el contenedor de los elementos HTML
    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container');

    // -- H2
    const $h2 = document.createElement('h2');
    $h2.innerText = 'Nuevo documento';
    $h2.classList.add('h2');

    // -- Container options
    const $containerOptions = document.createElement('div');
    $containerOptions.classList.add('container__options');

    options.forEach(item => {
        const $figure = document.createElement('figure');
        $figure.classList.add('btn-document-options');
        $figure.dataset.documentType = item.value;

        $figure.innerHTML = `
            <img src="${item.img}">
            <figcaption>${item.value}</figcaption>
        `
        $containerOptions.appendChild($figure);
    });

    // -- Botones de regresar y siguiente
    let buttonHtml = `
        <div class="mb-32">
            <button class="btn btn-primary btn-document-options" data-document-type="Basico" >Crear Basico</button>
            <button class="btn btn-cancel btn-cancel-home" type="submit">Cancelar</button>
        </div>
    `;

    // -- Agregamos todos los elementos creados al contenedor
    $divContainer.appendChild($h2);
    $divContainer.appendChild($containerOptions);
    $divContainer.innerHTML += buttonHtml;

    $main.appendChild($divContainer);
    return $main;
}

document.addEventListener('click', async e => {
    if (e.target.matches('.btn-document-options') || e.target.matches('.btn-document-options *')) {

        let option = e.target.dataset.documentType;
        if (!option)
            option = e.target.parentNode.dataset.documentType;

        const $root = document.getElementById("root");

        $root.querySelector('main').parentNode.removeChild($root.querySelector('main'));

        const $sectionDocument = await sectionDocument(option);

        $root.appendChild($sectionDocument);

        // -- Ponemos focus al form
        $root.querySelector('form').documentPeople.focus();
    }
})
