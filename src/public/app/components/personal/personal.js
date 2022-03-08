'use strict';
import personalAdd from './personal.add.js';
import modalConfirm from '../modal.confirm.js';
import modalError from '../modal.error.js';

export default async function sectionPersonal() {

    // -- Obtenemos los datos
    let personal = await get()

    // -- Main
    const $main = document.createElement('main');

    // -- Creamos el contenedor de los elementos HTML
    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container');

    // -- H2
    const $h2 = document.createElement('h2');
    $h2.innerText = 'Lista de personal';
    $h2.classList.add('h2');

    // -- Seccion de la tabla
    const $sectionTable = document.createElement('section');
    $sectionTable.classList.add("table");

    const $divRow = document.createElement('div');
    $divRow.classList.add('table__row-first');
    $divRow.innerHTML = `
        <p><b>Id</b></p>
        <p><b>Nombre</b></p>
        <p><b>Telefono</b></p>
    `;

    $sectionTable.appendChild($divRow.cloneNode(true));

    $divRow.classList.remove('table__row-first');
    $divRow.classList.add('table__row');

    if (personal)
        personal.forEach(element => {
            $divRow.dataset.id = element.ID;
            $divRow.dataset.table = "personal";
            $divRow.innerHTML = `
            <p>${element.ID}</p>
            <p>${element.Nombre}</p>
            <p>${element.Telefono === "undefined" ? "": element.Telefono}</p>
        `;
            $sectionTable.appendChild($divRow.cloneNode(true));
        });

    $divRow.classList.remove('table__row')
    $divRow.innerHTML = `
            <button id="btn-add-view" class="table__button" data-table="personal"><i class="bi bi-plus-lg"></i>NUEVO</button>
    `
    $sectionTable.appendChild($divRow.cloneNode(true));

    $divRow.innerHTML = `
    <button class="btn btn-cancel btn-cancel-home" type="submit">Regresar</button>
    `
    $sectionTable.appendChild($divRow.cloneNode(true));

    // -- Seccion del modal
    const $sectionModal = document.createElement('section');
    $sectionModal.classList.add('section-modal');
    $sectionModal.classList.add('none');

    const $ulModal = document.createElement('ul');

    $ulModal.innerHTML = `
        <li class="btn btn-modal-edit"><i class="bi bi-pencil-square"></i>Editar</li>
        <li class="btn btn-modal-delete"><i class="bi bi-trash"></i>Eliminar</li>
    `;

    $sectionModal.appendChild($ulModal);

    // -- Agregamos todos los elementos creados al contenedor
    $divContainer.appendChild($h2);
    $divContainer.appendChild($sectionTable);
    $divContainer.appendChild($sectionModal);

    $main.appendChild($divContainer);
    return $main;
}

// -- Obteniendo los datos de la base de datos
async function get() {
    try {
        let res = await fetch('http://localhost:3000/personal');

        if (!res.ok)
            throw (res);

        let data = await res.json()

        return data.body;
    } catch (e) {
        // console.error(e);
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}
