'use strict';
import nav from '../nav.js';
import sectionPersonal from './usuarios.js'
// import errorNotification from './notification.error.js'
import modalError from '../modal.error.js';

export default async function usuarioAdd(id = -1, table = null, action = null) {

    // console.log("id --> ", id);
    // console.log("table --> ", table);
    // console.log("action --> ", action);

    let selectClass = "";
    let nameH2 = "Agregar";
    let data = null;

    if (!action)
        selectClass = "btn-usuario-add"
    if (action === 'delete') {
        selectClass = "btn-usuario-delete";
        nameH2 = "Eliminar";
    }
    if (action === 'edit') {
        selectClass = "btn-usuario-edit";
        nameH2 = "Editar";
        data = await getById(id);
        // console.log(data);
        // console.log(data[0]);
        // console.log(data[0][0]);
    }

    // -- Main
    const $main = document.createElement('main');

    // -- Creamos el contenedor de los elementos HTML
    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container-lg');

    // -- Agregamos la imagen de fondo
    const $backImage = document.createElement('img');
    $backImage.classList.add('img-lg');
    $backImage.src = 'app/assets/home.png';
    $backImage.alt = 'Imagen del first class';

    // -- H2
    const $h2 = document.createElement('h2');
    $h2.innerText = nameH2 + ' usuario';
    $h2.classList.add('h2');
    $h2.classList.add('h2-white');

    // -- Contenedor del form
    const $divContentForm = document.createElement('div');
    $divContentForm.classList.add('form-content');

    // -- Form
    const $form = document.createElement('form');
    $form.dataset.id = id;
    // $form.dataset.id = id;
    $form.classList.add('form');
    $form.setAttribute('id', 'form-usuario-add');

    $form.innerHTML = `
        <hr class="form-hr">
        <!-- <hr class="form-"> -->
        <div class="form__group-grid">
            <label for="form-usuario-input-user">Nombre</label>
            <input id="form-usuario-input-user" type="text" name="name" value="${data? data.Nombre: ""}" required>
            <small class="form-error opacity">Error: Agrega un usuario correcto</small>
        </div>
        <div class="form__group-grid">
            <label for="form-usuario-input-telefono">Telefono</label>
            <input id="form-usuario-input-telefono" type="number" name="phone" value="${data? data.Telefono: ""}">
            <small class="form-error opacity">Error: Agrega una contraseña correcta</small>
        </div>
        <div class="form__group-grid">
            <label for="form-usuario-input-password">Contraseña</label>
            <input id="form-usuario-input-password" type="password" name="password" value="${data? data.Nombre: ""}" required>
            <small class="form-error opacity">Error: Agrega un usuario correcto</small>
        </div>
        <div class="form__group-grid form__group-grid-large">
            <label for="form-usuario-input-password-com">Confirmar Contraseña</label>
            <input id="form-usuario-input-password-com" type="password" name="passwordConfirm" value="${data? data.Telefono: ""}">
            <small class="form-error opacity">Error: Agrega una contraseña correcta</small>
        </div>
        <button id="${selectClass}" class="btn btn-primary" type="submit">${action === 'edit'? "Editar": "Ingresar"}</button>
        <button id="btn-usuario-cancel" class="btn btn-cancel" type="submit">Cancelar</button>
    `;

    // Agregamos el form a su contenedor
    $divContentForm.appendChild($form);

    // Agregamos todos los elementos al contenedor principal
    $divContainer.appendChild($backImage);
    $divContainer.appendChild($h2);
    $divContainer.appendChild($divContentForm);

    $main.appendChild($divContainer)

    return $main;
}

// -- Evento para cancelar
document.addEventListener('click', async e => {
    if (e.target.matches('#btn-usuario-cancel') || e.target.matches('#btn-usuario-cancel *')) {
        e.preventDefault();
        const $root = document.getElementById("root");

        $root.innerHTML = ``;

        $root.appendChild(nav());
        let $sectionPersonal = await sectionPersonal();
        $root.appendChild($sectionPersonal);
    }
})

// -- Evento para agregar, editar y eliminar
document.addEventListener('submit', async e => {
    if (e.target.matches('#form-usuario-add')) {
        e.preventDefault();

        let id = e.target.dataset.id;

        let $form = e.target;

        let persona;

        // if ($form.phone.value !== '')
        persona = {
            Nombre: $form.name.value,
            Telefono: $form.phone.value,
            Contraseña: $form.password.value,
            passwordConfirm: $form.passwordConfirm.value
        }
        // else
        //     persona = {
        //         Nombre: $form.name.value
        //     }

        if (persona.Contraseña !== persona.passwordConfirm) {
            const $root = document.getElementById("root");
            $root.appendChild(await modalError("La contraseña y confirmar contraseña deben ser iguales."));
            $form.password.value = '';
            $form.passwordConfirm.value = '';
            return;
        }

        let res = null;

        if (document.getElementById('btn-usuario-add')) {
            res = await addPersonal(persona)
        }
        if (document.getElementById('btn-usuario-delete')) {
            res = deletePersonal(id, persona)
        }
        if (document.getElementById('btn-usuario-edit')) {
            res = await editPersonal(id, persona)
        }

        if (res) {
            const $root = document.getElementById("root");
            // -- Limpiamos el root
            $root.innerHTML = ``;
            // -- Agregamos el nav y la tabla que le pertenece
            $root.appendChild(nav());
            let $section = await sectionPersonal();
            $root.appendChild($section);
        }
    }
})

async function getById(id) {
    try {
        let res = await fetch('http://localhost:3000/personal/' + id);

        if (!res.ok)
            throw (res);

        let data = await res.json()
        return data.body[0];

    } catch (e) {
        // console.error(e);
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}

async function addPersonal(persona) {
    // console.log('Agregar');
    try {
        let res = await fetch('http://localhost:3000/personal', {
            method: 'POST',
            body: JSON.stringify(persona),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!res.ok)
            throw (res);

        return true;

    } catch (e) {
        // console.log(e)
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}

async function editPersonal(id, persona) {
    try {
        let res = await fetch('http://localhost:3000/personal/' + id, {
            method: 'PATCH',
            body: JSON.stringify(persona),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!res.ok)
            throw (res);

        return true;

    } catch (e) {
        // console.log(e)
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}
