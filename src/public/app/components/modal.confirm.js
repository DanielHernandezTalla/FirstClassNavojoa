'use strict';

import sectionPersonal from './personal.js';
import sectionPuestos from './puestos.js';
import modalError from './modal.error.js';

export default function modalConfirm(text = null) {

    if (text === null)
        text = '¿Estas seguro de eliminar?';

    let $container = document.createElement('div');
    $container.classList.add('container-section-confirm');
    // $container.classList.add('none');

    let $section = document.createElement('section');
    $section.classList.add('section-confirm');

    $section.innerHTML = `
        <h3>Eliminar Personal</h3>
        <p>${text}</p>
        <button class="btn btn-primary btn-confirm-ok" type="submit">Aceptar</button>
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
        let id = $modal.dataset.id;
        let table = $modal.dataset.table;

        try {

            await dlt(id, table);

            // -- Primero obtenemos los datos de la nueva tabla, para evitar que demore en cargar por la consulta
            let $section = null;
            if (table === 'personal')
                $section = await sectionPersonal();

            if (table === 'puestos')
                $section = await sectionPuestos();
            //let $section = await sectionPuestos();

            // -- Desapareciendo la tabla anterior
            let $oldMain = document.querySelector('main');
            $root.removeChild($oldMain)

            // -- Creando la nueva tabla con los datos actualizados
            $root.appendChild($section);

            // -- Desapareciendo el modal de confirmacion
            const $modalConfirm = document.querySelector('.container-section-confirm');
            $root.removeChild($modalConfirm);

        } catch (e) {
            // -- Desaparecemos el modal de confirmacion
            const $modalConfirm = document.querySelector('.container-section-confirm');
            $root.removeChild($modalConfirm);

            // -- Aparecemos el modal de error
            $root.appendChild(await modalError(e));
        }
    }
})

// -- Eliminando los datos de la base de datos
async function dlt(id, table) {
    try {
        let res = await fetch('http://localhost:3000/' + table + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (!res.ok)
            throw (res);

        let data = await res.json()

        return data;
    } catch (e) {
        // console.error(e);
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}
