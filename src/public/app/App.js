'use strict';

import login from './components/login.js';
import nav from './components/nav.js';
import home from './components/home.js';
import Router from './components/router.js';
import modalConfirm from './components/modal.confirm.js';
import personalAdd from './components/personal/personal.add.js';
import puestosAdd from './components/puestos/puestos.add.js';
import usuarioAdd from './components/usuarios/usuarios.add.js';
import sectionDocument from './components/documentos/documentos.js';
import documentPDF from './components/documentos/documentos.pdf.js';
import sectionEventos from './components/eventos/calendar.js';

export async function App() {

    const $root = document.getElementById("root");

    $root.innerHTML = ``;

    // $root.appendChild(login());

    let newFormat = {
        tipoEvento: "XV",
        cantidadPersonas: "500",
        lugar: "Salon",
        total: 2400,
        puestos: [{
            puesto: 'Encargado',
            personas: [{
                Nombre: 'Daniel',
                Salario: '400'
            }, {
                Nombre: 'Juan',
                Salario: '400'
            }, {
                Nombre: 'Ramon',
                Salario: '400'
            }]
        }, {
            puesto: 'Baños',
            personas: [{
                Nombre: 'Daniel',
                Salario: '500'
            }, {
                Nombre: 'Juan',
                Salario: '500'
            }, {
                Nombre: 'Ramon',
                Salario: '500'
            }]
        }, {
            puesto: 'Puerta',
            personas: [{
                Nombre: 'Daniel',
                Salario: '600'
            }, {
                Nombre: 'Juan',
                Salario: '600'
            }, {
                Nombre: 'Ramon',
                Salario: '600'
            }]
        }, {
            puesto: 'Meseros',
            personas: [{
                Nombre: 'Daniel',
                Salario: '700'
            }, {
                Nombre: 'Juan',
                Salario: '700'
            }, {
                Nombre: 'Ramon',
                Salario: '700'
            }]
        }, {
            puesto: 'Estacionamiento',
            personas: [{
                Nombre: 'Daniel',
                Salario: '800'
            }, {
                Nombre: 'Juan',
                Salario: '800'
            }, {
                Nombre: 'Ramon',
                Salario: '800'
            }]
        }, ]
    }

    // $root.appendChild(documentPDF(newFormat, ''));

    // Cargamos section Directamente
    // $root.appendChild(nav());
    // const $sectionDocument = await sectionDocument('Basico');

    $root.appendChild(nav());
    const $sectionEventos = await sectionEventos();
    $root.appendChild($sectionEventos);

    // $root.appendChild($sectionDocument);
    // $root.appendChild(home());

    Router();
}

// -- Agregando eventos generales
document.addEventListener('click', async e => {
    const $root = document.getElementById("root");

    // -- Para hacer que desaparesca el menu de la opciones de las tablas
    const $modal = document.querySelector('.section-modal');
    if ($modal) {
        if (!$modal.classList.contains('none')) {
            $modal.classList.add('none');
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

        if (table === 'usuarios')
            $root.appendChild(await usuarioAdd(id, table, "edit"));

        // -- Ponemos focus en el primer input
        $root.querySelector('input').focus();
        // =================================================
        // =================================================
    }

    // -- Evento para pasar a la pantalla de agregar
    if (e.target.matches('#btn-add-view')) {
        let table = e.target.dataset.table;
        // console.log(e.target);
        // console.log("====================================");
        // console.log(table);
        $root.innerHTML = ``;

        // -- Agregar aqui las nuevas secciones para agregar recursos
        // =================================================
        // =================================================
        if (table === 'personal')
            $root.appendChild(await personalAdd());

        if (table === 'puestos')
            $root.appendChild(await puestosAdd());

        if (table === 'usuarios')
            $root.appendChild(await usuarioAdd());

        // -- Ponemos focus en el primer input
        $root.querySelector('input').focus();
        // =================================================
        // =================================================
    }

    // -- Evento para hacer aparecer el modal de confirmacion eliminar
    if (e.target.matches('.btn-modal-delete') || e.target.matches('.btn-modal-delete *')) {
        $root.appendChild(modalConfirm());
    }

    // console.log(e.target)

    if (e.target.matches('.btn-cancel-home') || e.target.matches('.btn-document-cancel') || e.target.matches('.btn-document-cancel *')) {
        $root.innerHTML = ``;
        $root.appendChild(nav());
        $root.appendChild(home());
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
        $modal.classList.remove('none');
    }
})
