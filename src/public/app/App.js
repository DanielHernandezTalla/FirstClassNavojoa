'use strict';

import login from './components/login.js';
import Router from './components/router.js';
import modalConfirm from './components/modal.confirm.js';
import personalAdd from './components/personal.add.js';
import puestosAdd from './components/puestos.add.js';

export async function App() {

    const $root = document.getElementById("root");

    $root.innerHTML = ``;

    $root.appendChild(login());

    Router();
}


// -- Agregando eventos generales
document.addEventListener('click', async e => {
    const $root = document.getElementById("root");

    // -- Para hacer que desaparesca el menu de la opciones de las tablas
    const $modal = document.querySelector('.section-modal');
    if ($modal) {
        if (!$modal.classList.contains('opacity')) {
            $modal.classList.add('opacity');
            $modal.style.top = null;
            $modal.style.left = null;
        }
    }

    // -- Para cuando das click en editar, en el menu de opciones
    if (e.target.matches('.btn-modal-edit') || e.target.matches('.btn-modal-edit *')) {
        const $modal = document.querySelector('.section-modal');
        let id = $modal.dataset.id;
        let table = $modal.dataset.table;

        const $main = document.querySelector('main');
        $root.removeChild($main);

        $root.innerHTML = ``;
        // -- Agregar aqui las nuevas secciones para editar recursos
        // =================================================
        // =================================================
        if (table === 'personal')
            $root.appendChild(await personalAdd(id, table, "edit"));

        if (table === 'puestos')
            $root.appendChild(await puestosAdd(id, table, "edit"));
        // =================================================
        // =================================================
    }

    // -- Evento para pasar a la pantalla de agregar
    if (e.target.matches('#btn-personal-add-view')) {
        let table = e.target.dataset.table;
        console.log(e.target);
        console.log(table);
        $root.innerHTML = ``;

        // -- Agregar aqui las nuevas secciones para agregar recursos
        // =================================================
        // =================================================
        if (table === 'personal')
            $root.appendChild(await personalAdd());

        if (table === 'puestos')
            $root.appendChild(await puestosAdd());
        // =================================================
        // =================================================
    }

    // -- Evento para hacer aparecer el modal de confirmacion eliminar
    if (e.target.matches('.btn-modal-delete') || e.target.matches('.btn-modal-delete *')) {
        $root.appendChild(modalConfirm());
    }
})

// -- Eventos de click derecho
document.addEventListener('contextmenu', e => {
    e.preventDefault();

    // -- Evento que aparece las opciones
    // -- para cuando se da click derecho en las filas de las tablas
    if (e.target.matches('.table__row') || e.target.matches('.table__row *')) {
        let id = e.target.dataset.id;
        let table = e.target.dataset.table;

        if (!id) {
            id = e.target.parentNode.dataset.id;
            table = e.target.parentNode.dataset.table;
        }

        const $modal = document.querySelector(".section-modal");
        $modal.dataset.id = id;
        $modal.dataset.table = table;
        $modal.style.top = e.clientY + "px";
        $modal.style.left = e.clientX + "px";
        $modal.classList.remove('opacity');
    }
})
