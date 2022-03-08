'use strict';
import puestosAdd from './puestos.add.js';
import modalConfirm from '../modal.confirm.js';
import modalError from '../modal.error.js';

export default async function sectionPuestos() {
    let puestos = await get()

    const $main = document.createElement('main');
    //console.log("Conectado");

    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container');

    const $h2 = document.createElement('h2');
    $h2.innerText = 'Lista de puestos';
    $h2.classList.add('h2');

    const $sectionTable = document.createElement('section');
    $sectionTable.classList.add("table");

    const $divRow = document.createElement('div');
    $divRow.classList.add('table__row-first');
    $divRow.innerHTML = `
    <p><b>Id</b></p>
    <p><b>Nombre</b></p>
    <p><b>Salario</b></p>`;

    $sectionTable.appendChild($divRow.cloneNode(true));

    $divRow.classList.remove('table__row-first');
    $divRow.classList.add('table__row');

    if (puestos)
        puestos.forEach(element => {
            $divRow.dataset.id = element.ID;
            $divRow.dataset.table = "puestos";
            $divRow.innerHTML = `
        <p>${element.ID}</p>
        <p>${element.Nombre}</p>
        <p>${element.Salario}</p>
    `;
            $sectionTable.appendChild($divRow.cloneNode(true));
        });

    $divRow.classList.remove('table__row')
    $divRow.innerHTML = `
        <button id="btn-add-view" class="table__button" data-table="puestos"><i class="bi bi-plus-lg"></i>NUEVO</button>
        `
    $sectionTable.appendChild($divRow.cloneNode(true));

    $divRow.innerHTML = `
    <button class="btn btn-cancel btn-cancel-home" type="submit">Regresar</button>
    `
    $sectionTable.appendChild($divRow.cloneNode(true));

    const $sectionModal = document.createElement('section');
    $sectionModal.classList.add('section-modal');
    $sectionModal.classList.add('none');

    const $ulModal = document.createElement('ul');

    $ulModal.innerHTML = `
        <li class="btn btn-modal-edit"><i class="bi bi-pencil-square"></i>Editar</li>
        <li class="btn btn-modal-delete"><i class="bi bi-trash"></i>Eliminar</li>
    `;

    $sectionModal.appendChild($ulModal);

    $divContainer.appendChild($h2);
    $divContainer.appendChild($sectionTable);
    $divContainer.appendChild($sectionModal);

    $main.appendChild($divContainer);

    return $main;
}

async function get() {

    try {
        let res = await fetch('http://localhost:3000/puestos');

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
