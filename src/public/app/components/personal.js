'use strict';
import personalAdd from './personal.add.js';

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

    personal.forEach(element => {
        $divRow.dataset.id = element.ID;
        $divRow.dataset.table = "personal";
        $divRow.innerHTML = `
            <p>${element.ID}</p>
            <p>${element.Nombre}</p>
            <p>${element.Telefono}</p>
        `;
        $sectionTable.appendChild($divRow.cloneNode(true));
    });

    $divRow.classList.remove('table__row')
    $divRow.innerHTML = `
            <button id="btn-personal-add-view" class="table__button"><i class="bi bi-plus-lg"></i>NUEVO</button>
    `

    $sectionTable.appendChild($divRow.cloneNode(true));

    // -- Seccion del modal
    const $sectionModal = document.createElement('section');
    $sectionModal.classList.add('section-modal');
    $sectionModal.classList.add('opacity');

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
        return await res.json();
    } catch (e) {
        console.error(e);
    }
}

document.addEventListener("click", e => {
    const $root = document.getElementById("root");
    // -- evento para pasar a la pantalla de agregar
    if (e.target.matches('#btn-personal-add-view')) {
        // console.log("Aquise va a agregar el personal");

        $root.innerHTML = ``;

        $root.appendChild(personalAdd());
    }

    // -- Editar personal
    if (e.target.matches('.btn-modal-edit') || e.target.matches('.btn-modal-edit *')) {
        // console.log("Aqui se va a editar el personal");
        const $modal = document.querySelector('.section-modal');
        let id = $modal.dataset.id;
        let table = $modal.dataset.table;

        // console.log(id);
        // console.log(table);

        $root.innerHTML = ``;

        $root.appendChild(personalAdd(id, table, "edit"));
    }

    // -- Eliminar personal
    if (e.target.matches('.btn-modal-delete') || e.target.matches('.btn-modal-delete *')) {
        // console.log("Aqui se va a eliminar el personal");
        const $modal = document.querySelector('.section-modal');
        let id = $modal.dataset.id;
        let table = $modal.dataset.table;

        // console.log(id)
        // console.log(table)

        $root.innerHTML = ``;

        $root.appendChild(personalAdd(id, table, "delete"));
    }

    // -- Para hacer que desaparesca el modal de la opciones
    const $modal = document.querySelector('.section-modal');
    if ($modal) {
        if (!$modal.classList.contains('opacity')) {
            $modal.classList.add('opacity');
            $modal.style.top = null;
            $modal.style.left = null;
        }
    }
});

document.addEventListener('contextmenu', e => {
    e.preventDefault();
    if (e.target.matches('.table__row') || e.target.matches('.table__row *')) {
        let id = e.target.dataset.id;
        let table = e.target.dataset.table;

        if (!id) {
            id = e.target.parentNode.dataset.id;
            table = e.target.parentNode.dataset.table;
        }

        // console.log(id)
        // console.log(table)

        const $modal = document.querySelector(".section-modal");
        $modal.dataset.id = id;
        $modal.dataset.table = table;
        $modal.style.top = e.clientY + "px";
        $modal.style.left = e.clientX + "px";
        $modal.classList.remove('opacity');
    }
})
