'use strict';
import nav from './nav.js';
import sectionPersonal from './personal.js'
import errorNotification from './notification.error.js'

export default function personalAdd(id = -1, table = null, action = null) {

    // console.log("id --> ", id);
    // console.log("table --> ", table);
    // console.log("action --> ", action);

    let selectClass = "";
    let nameH2 = "Agregar";
    if (action === 'delete') {
        selectClass = "btn-personal-delete";
        nameH2 = "Eliminar";
    }
    if (action === 'edit') {
        selectClass = "btn-personal-edit";
        nameH2 = "Editar";
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
    $h2.innerText = nameH2 + ' personal';
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
    $form.setAttribute('id', 'form-personal-add');

    $form.innerHTML = `
        <hr class="form-hr">
        <!-- <hr class="form-"> -->
        <div class="form__group-grid">
            <label for="user">Nombre</label>
            <input type="text" name="name">
            <small class="form-error">Error: Agrega un usuario correcto</small>
        </div>
        <div class="form__group-grid">
            <label for="password">Telefono</label>
            <input type="number" name="phone">
            <small class="form-error">Error: Agrega una contraseña correcta</small>
        </div>
        <button id="${selectClass}" class="btn btn-primary" type="submit">Ingresar</button>
        <button id="btn-personal-cancel" class="btn btn-primary" type="submit">Cancelar</button>
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
    if (e.target.matches('#btn-personal-cancel') || e.target.matches('#btn-personal-cancel *')) {
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
    if (e.target.matches('#form-personal-add')) {
        e.preventDefault();

        let id = e.target.dataset.id;

        let $form = e.target;
        const persona = {
            Nombre: $form.name.value,
            Telefono: $form.phone.value
        }

        if (document.getElementById('btn-personal-add')) {
            addPersonal(persona)
        }
        if (document.getElementById('btn-personal-delete')) {
            deletePersonal(id, persona)
        }
        if (document.getElementById('btn-personal-edit')) {
            editPersonal(id, persona)
        }

        // -- Hacemos aparecer el la siguiente pantalla si todo sale bien
        // const $root = document.getElementById("root");

        // $root.innerHTML = ``;

        // $root.appendChild(nav());
        // let $sectionPersonal = await sectionPersonal();
        // $root.appendChild($sectionPersonal);
    }
})

async function addPersonal(persona) {
    console.log('Agregar');

    errorNotification("Internal error");

    // try {
    //     let res = await fetch('localhost:3000/personal', {
    //         method: 'POST',
    //         body: JSON.stringify(persona),
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     })

    //     if (res.status !== 200)
    //         throw new Error({
    //             Error: res.error
    //         })

    // } catch (e) {
    //     console.log(e)
    // }
}

function editPersonal(id, persona) {
    console.log(id, "Edit")
}

function deletePersonal(id, persona) {
    console.log(id, "Delete")
}
