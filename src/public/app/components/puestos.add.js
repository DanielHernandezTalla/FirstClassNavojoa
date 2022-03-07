'use strict';
import nav from './nav.js';
import sectionPuestos from './puestos.js';
import modalError from './modal.error.js';

export default async function puestosAdd(id=-1, table= null,action= null){

    //  console.log("id --> ", id);
    //  console.log("table --> ", table);
    //  console.log("action --> ", action);

    let selectClass="";
    let nameH2="Agregar";
    let data = null;

    if(!action)
        selectClass ="btn-puestos-add"
    if(action==='delete'){
        selectClass = "btn-puestos-delete";
        nameH2="Eliminar";
    }
    if(action=== 'edit'){
        selectClass= "btn-puestos-edit";
        nameH2 = "Editar";
        data= await getById(id);
    }

    const $main = document.createElement('main');

    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container-lg');

    const $backImage= document.createElement('img');
    $backImage.classList.add('img-lg');
    $backImage.src = 'app/assets/home.png';
    $backImage.alt ='Imagen del first class';

    const $h2 = document.createElement('h2');
    $h2.innerHTML= nameH2 + ' puestos';
    $h2.classList.add('h2');
    $h2.classList.add('h2-white');

    const $divContentForm = document.createElement('div');
    $divContentForm.classList.add('form-content');

    const $form = document.createElement('form');
    $form.dataset.id=id;

    $form.classList.add('form');
    $form.setAttribute('id','form-puestos-add');

    $form.innerHTML = `
    <hr class="form-hr">
    <!-- <hr class="form-"> -->
    <div class="form__group-grid">
        <label for="form-persanal-input-user">Nombre</label>
        <input id="form-persanal-input-user" type="text" name="name" value="${data? data.Nombre: ""}" required>
        <small class="form-error opacity">Error: Agrega un nombre correcto para el puesto</small>
    </div>
    <div class="form__group-grid">
        <label for="form-persanal-input-password">Salario</label>
        <input id="form-persanal-input-password" type="number" name="salary" value="${data? data.Salario: ""}" required>
        <small class="form-error opacity">Error: Agrega un salario correcto</small>
    </div>
    <button id="${selectClass}" class="btn btn-primary" type="submit">${action === 'edit'? "Editar": "Ingresar"}</button>
    <button id="btn-puestos-cancel" class="btn btn-cancel" type="submit">Cancelar</button>
    `;

    $divContentForm.appendChild($form);

    $divContainer.appendChild($backImage);
    $divContainer.appendChild($h2);
    $divContainer.appendChild($divContentForm);

    $main.appendChild($divContainer)

    return $main;
}

document.addEventListener('click', async e => {
    if (e.target.matches('#btn-puestos-cancel') || e.target.matches('#btn-puestos-cancel *')) {
        e.preventDefault();
        const $root = document.getElementById("root");

        $root.innerHTML = ``;

        $root.appendChild(nav());
        let $sectionPuestos = await sectionPuestos();
        $root.appendChild($sectionPuestos);
    }
})

// -- Evento para agregar, editar y eliminar
document.addEventListener('submit', async e => {
    if (e.target.matches('#form-puestos-add')) {
        e.preventDefault();

        let id = e.target.dataset.id;

        let $form = e.target;

        let puesto;

        if ($form.salary.value !== '')
            puesto = {
                Nombre: $form.name.value,
                Salario: $form.salary.value
            }
        else
            puesto = {
                Nombre: $form.name.value
            }

        let res = null;

        if (document.getElementById('btn-puestos-add')) {
            res = await addPuesto(puesto)
        }
        if (document.getElementById('btn-puestos-delete')) {
            res = deletePuesto(id, puesto)
        }
        if (document.getElementById('btn-puestos-edit')) {
            res = await editPuesto(id, puesto)
        }

        if (res) {
            const $root = document.getElementById("root");
            // -- Limpiamos el root
            $root.innerHTML = ``;
            // -- Agregamos el nav y la tabla que le pertenece
            $root.appendChild(nav());
            let $section = await sectionPuestos();
            $root.appendChild($section);
        }
    }
})

async function getById(id) {
    try {
        let res = await fetch('http://localhost:3000/puestos/' + id);

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

async function addPuesto(puesto) {
    // console.log('Agregar');
    try {
        let res = await fetch('http://localhost:3000/puestos', {
            method: 'POST',
            body: JSON.stringify(puesto),
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

async function editPuesto(id, puesto) {
    console.log(puesto);
    try {
        let res = await fetch('http://localhost:3000/puestos/' + id, {
            method: 'PATCH',
            body: JSON.stringify(puesto),
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
