'use strict';

import sectionPersonal from './personal/personal.js';
import sectionPuestos from './puestos/puestos.js';
import sectionUsuarios from './usuarios/usuarios.js';
import sectionEventos from './eventos/calendar.js';
import eventAdd from './eventos/eventos.forms.js';
import modalError from './modal.error.js';

export default function modalConfirm(text = null, id = null, data = null) {

    // console.log(data)

    if (text === null)
        text = '¿Estas seguro de eliminar?';

    let $container = document.createElement('div');
    $container.classList.add('container-section-confirm');
    // $container.classList.add('none');

    let $section = document.createElement('section');
    $section.classList.add('section-confirm');

    $section.innerHTML = `
        <h3>${data?'Confirmar':'Eliminar'}</h3>
        <p>${text}</p>
        <button class="btn btn-primary btn-confirm-ok" data-id="${id}" data-pagoidevento=${data?data.IdEvento:""} data-pagofecha=${data?data.FechaPago:""} data-pagomonto=${data?data.Monto:""} data-pagometodo=${data?data.MetodoPago:""} type="submit">Aceptar</button>
        <button class="btn btn-cancel btn-confirm-cancel" type="submit">Cancelar</button>
        <div class="clearfix"></div>
    `;

    $container.appendChild($section);

    return $container;
}

document.addEventListener('click', async e => {

    const $root = document.getElementById("root");

    // -- Quitar el modal de confirmar
    if (e.target.matches('.btn-confirm-cancel') || e.target.matches('.container-section-confirm')) {
        const $modalConfirm = document.querySelector('.container-section-confirm');
        $root.removeChild($modalConfirm);
    }

    // -- Eliminar el recurso
    if (e.target.matches('.btn-confirm-ok')) {
        const $modal = document.querySelector('.section-modal');

        let id;
        let table;

        if ($modal) {
            // Para cuando confirmas eliminar desde una tabla
            id = $modal.dataset.id;
            table = $modal.dataset.table;
        } else {
            // Para cuando confirmas eliminar desde eventos
            id = e.target.dataset.id;
            table = 'eventos';
        }

        try {

            // -- Primero obtenemos los datos de la nueva tabla, para evitar que demore en cargar por la consulta
            let $section = null;

            // Para confirmar que quieres agregar un pago
            if (!id) {
                const $pago = {
                    IdEvento: e.target.dataset.pagoidevento,
                    NoAbono: 0,
                    FechaPago: e.target.dataset.pagofecha,
                    Monto: e.target.dataset.pagomonto,
                    MetodoPago: e.target.dataset.pagometodo,
                }

                let res = await addPagos($pago);

                $section = await eventAdd($pago.IdEvento, null, "edit", "pagos");
                table = "";
                hideThisWindow($section);
                return;
            }

            let ressult = await dlt(id, table);
            if (!ressult) return;

            if (table === 'personal')
                $section = await sectionPersonal();

            if (table === 'puestos')
                $section = await sectionPuestos();

            if (table === 'usuarios')
                $section = await sectionUsuarios();

            if (table === 'eventos')
                $section = await sectionEventos();

            if (table === 'pagos') {
                let btnPrimary = document.querySelector('.btn-primary');
                $section = await eventAdd(btnPrimary.dataset.id, null, "edit", "pagos");
            }

            hideThisWindow($section);

        } catch (e) {
            // -- Desaparecemos el modal de confirmacion
            const $modalConfirm = document.querySelector('.container-section-confirm');
            $root.removeChild($modalConfirm);

            // -- Aparecemos el modal de error
            $root.appendChild(await modalError(e));
        }
    }
})

function hideThisWindow($section) {

    const $root = document.getElementById("root");

    // -- Desapareciendo la tabla anterior
    const $oldMain = document.querySelector('main');
    $root.removeChild($oldMain)

    // -- Creando la nueva tabla con los datos actualizados
    $root.appendChild($section);

    // -- Desapareciendo el modal de confirmacion
    const $modalConfirm = document.querySelector('.container-section-confirm');
    $root.removeChild($modalConfirm);
}

// -- Eliminando los datos de la base de datos
async function dlt(id, table) {
    try {
        let res = await fetch('http://localhost:3000/' + table + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        // console.log(res);

        if (!res.ok)
            throw (res);

        let data = await res.json()

        // console.log(data);

        return data;
    } catch (e) {
        console.error(e);
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return false;
    }
}

async function addPagos(pago) {
    try {
        let res = await fetch('http://localhost:3000/pagos/pagoConfirm', {
            method: 'POST',
            body: JSON.stringify(pago),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!res.ok)
            throw (res);
        let data = await res.json();

        return data.body;
    } catch (e) {
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}
