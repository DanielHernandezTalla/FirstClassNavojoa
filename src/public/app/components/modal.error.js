'use strict';

// -- Haciendo modal dependiendo del error que venga
export default async function modalError(e) {

    let errorMessage = "";
    let details = null;

    // -- Vemos el status del error, y si es 400, sabemos que biene un objeto con los detalles
    if (e.status !== 400) {
        errorMessage = e.statusText;
    } else {
        errorMessage = e.statusText;
        let detailsError = await e.json();
        details = [];
        // console.log(detailsError)
        detailsError.error.details.forEach(item => {
            details.push(item.message);
        })
    }

    // -- Creamos el modal
    const $container = document.createElement('div');
    $container.classList.add('container-section-confirm');
    $container.setAttribute('id', 'container-section-error');
    // $container.classList.add('none');

    const $section = document.createElement('section');
    $section.classList.add('section-confirm');

    const $h3 = document.createElement('h3');
    $h3.textContent = 'Error';

    const $ul = document.createElement('ul');

    const $li = document.createElement('li');
    $li.innerHTML = `<b>${errorMessage}</b>`;

    $ul.appendChild($li.cloneNode(true));

    // -- Aqui agregamos dinamicamente la lista de error
    if (details)
        details.forEach(item => {
            $li.innerHTML = `${item}`
            $ul.appendChild($li.cloneNode(true));
        })

    $section.appendChild($h3);
    $section.appendChild($ul);
    $section.innerHTML += `
        <button id="btn-modal-error-ok" class="btn btn-primary" type="submit">Aceptar</button>
        <div class="clearfix"></div>
    `;

    $container.appendChild($section);

    return $container;
}

// -- Click para cerrar el modal
document.addEventListener('click', e => {
    const $root = document.getElementById("root");

    if (e.target.matches('#btn-modal-error-ok')) {
        const $modalError = document.querySelector('#container-section-error');
        $root.removeChild($modalError);
    }
})
