'use strict';

import nav from '../nav.js';
import home from '../home.js';

export default async function sectionDocument() {

    // -- Obtenemos los puestos que llevara por defecto
    let puestosSections = ["Admin", "Encargado", "Mesero"];

    // -- Obtener puestos y pagos
    const puestos = await getPuestos();

    // console.log(puestos)

    // -- Main
    const $main = document.createElement('main');


    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container');

    const $h2 = document.createElement('h2');
    $h2.innerText = 'Formato de Documento';
    $h2.classList.add('h2');

    // -- Creamos el contenedor del documento
    const $documentContainer = document.createElement('div');
    $documentContainer.classList.add('document__container');

    // -- Creamos el form del documento
    const $form = document.createElement('form');
    $form.classList.add('document-form');

    // -- Agregamos las secciones del form
    // -- Agregamos los input para el tipo de evento y la cantidad de personas
    let inputs = `
        <div class="form__group-grid">
            <label for="user">Tipo de Evento</label>
            <input type="text" name="documentTypeEvent" value="">
        </div>
        <div class="form__group-grid">
            <label for="user">No Personas</label>
            <input type="number" name="documentPeople" value="">
        </div>
    `;

    $form.innerHTML = inputs;

    let sectiosPuestos = ``;
    // -- Agregamos las secciones de los puestos
    puestosSections.forEach((item) => {

        const $select = document.createElement('select');
        $select.classList.add('select-puesto-document');

        let salario = 0;

        puestos.forEach(itemPuesto => {
            if (item == itemPuesto.Nombre) {
                $select.innerHTML += `<option value="${itemPuesto.Nombre}" selected>${itemPuesto.Nombre}</option>`;
                salario = itemPuesto.Salario;
            } else
                $select.innerHTML += `<option value="${itemPuesto.Nombre}">${itemPuesto.Nombre}</option>`;
        })

        const $formGroupDocument = document.createElement('div');
        $formGroupDocument.classList.add('form__group-document')
        $formGroupDocument.appendChild($select.cloneNode(true));

        $formGroupDocument.innerHTML += `
            <div class="form__group-row">
                <spam class="btn button-document button-document-new-row"><i class="bi bi-plus-lg"></i></spam>
                <input type="text" placeholder="Agregar empleado" data-type='nombreEmpleado'>
                <input type="number" placeholder="$ Pago" data-type='pago' value="${salario}">
            </div>
        `;

        $form.appendChild($formGroupDocument)
    })

    // -- Agregamos los botones y el area del total
    let buttons = `
        <div class="form__group-document">
            <button class="table__button button-add-puesto-document"><i
                    class="bi bi-plus-lg"></i>NUEVO</button>
        </div>
        <div class="form__group-document flex-right">
            <label for="form-total">Total</label>
            <input id="form-document-total" placeholder="$0.00" type="number">
        </div>
        <div class="form__group-document">
            <button class="btn btn-primary" type="submit">Generar Reporte</button>
            <button class="btn btn-cancel btn-document-cancel">Cancelar</button>
        </div>
    `;
    // $form.innerHTML = ;

    $form.innerHTML += buttons;

    $documentContainer.appendChild($form);

    // -- Agregamos los elementos al contenedor principal
    $divContainer.appendChild($h2);
    $divContainer.appendChild($documentContainer);

    // -- Agregamos el contenedor al main
    $main.appendChild($divContainer);

    return $main;
}

document.addEventListener('click', e => {
    if (e.target.matches('.btn-document-cancel') || e.target.matches('.btn-document-cancel *')) {
        e.preventDefault();

        // const $root = document.getElementById("root");
        // $root.innerHTML = ``;
        // $root.appendChild(nav());
        // $root.appendChild(home());
    }

    if (e.target.matches('.button-document') || e.target.matches('.button-document *')) {

        // console.log(e)

        // if (e.pointerType !== 'mouse') return;

        let classType = e.target.classList.contains('bi-plus-lg');
        let parentGroupRow;

        if (classType) {
            e.target.classList.replace('bi-plus-lg', 'bi-dash-lg')
            parentGroupRow = e.target.parentNode.parentNode;
        }

        if (!classType && e.target.querySelector('i')) {
            classType = e.target.querySelector('i').classList.contains('bi-plus-lg');

            if (classType) {
                e.target.querySelector('i').classList.replace('bi-plus-lg', 'bi-dash-lg')
                parentGroupRow = e.target.parentNode;
            }
        }

        if (classType) {
            addGroupRow(parentGroupRow);
            return;
        }

        // -- Quitando ROW
        classType = e.target.classList.contains('bi-dash-lg');

        if (classType)
            parentGroupRow = e.target.parentNode.parentNode;

        if (!classType && e.target.querySelector('i')) {
            classType = e.target.querySelector('i').classList.contains('bi-dash-lg');

            if (classType)
                parentGroupRow = e.target.parentNode;
        }

        if (classType)
            removeGroupRow(parentGroupRow);
    }

    if (e.target.matches('.button-add-puesto-document')) {
        e.preventDefault();
        let newPuestoDocument = `
            <div class="form__group-document">
                <select class="select-puesto-document">
                    <option value="Encargado">Encargado</option>
                    <option value="Mesero">Mesero</option>
                    <option value="Cristaleria">Cristaleria</option>
                    <option value="Comodin">Comodin</option>
                </select>
                <div class="form__group-row">
                    <button class="btn button-document"><i class="bi bi-plus-lg"></i></button>
                    <input type="text" data-type='nombreEmpleado' placeholder="Agregar empleado">
                    <input type="number" data-type='pago' placeholder="$ Pago" value="500">
                </div>
            </div>
        `

        e.target.parentNode.insertAdjacentHTML('beforebegin', newPuestoDocument);
        calcTotal()
    }
})

document.addEventListener('submit', e => {
    e.preventDefault();

    // if (!e.submitter) return;
    // console.log(e)

    // if (e.submitter.classList.contains('btn-primary')) {
    if (e.target.matches('.document-form')) {
        let tipoEvento = e.target.documentTypeEvent
        let cantidadPersonas = e.target.documentPeople
        let puestos = e.target.querySelectorAll('.form__group-document')

        // console.log(tipoEvento.value)
        // console.log(cantidadPersonas.value)

        let arrPuestoPeople = [];

        puestos.forEach(item => {
            let puesto = item.querySelector('select')
            if (puesto) {

                // console.log(puesto.value)

                let personasInputs = item.querySelectorAll('input[type="text"]');
                let pagosInputs = item.querySelectorAll('input[type="number"]');

                let personas = []

                personasInputs.forEach((item, index) => {
                    // console.log(!personasInputs[index].value)
                    if (personasInputs[index].value) {
                        let newPersona = {
                            persona: personasInputs[index].value,
                            pago: pagosInputs[index].value
                        }
                        personas.push(newPersona);
                    }
                })

                let newPuestoPersona = {
                    puesto: puesto.value,
                    personas: personas
                }

                arrPuestoPeople.push(newPuestoPersona);
            }

        })

        let newFormat = {
            tipoEvento: tipoEvento.value,
            cantidadPersonas: cantidadPersonas.value,
            puestos: arrPuestoPeople
        }

        console.log(newFormat)
    }
})

document.addEventListener('keydown', e => {

    if (e.key === 'Enter' && e.target.dataset.type)
        e.preventDefault()

    if (e.key === 'Enter' && e.target.dataset.type === 'pago') {
        addGroupRow(e.target.parentNode)
        let arr = e.target.parentNode.parentNode.querySelectorAll('spam');
        for (let i = 0; i < arr.length - 1; i++) {
            arr[i].querySelector('i').classList.replace('bi-plus-lg', "bi-dash-lg");
        }
    }
})

document.addEventListener('change', e => {
    if (e.target.dataset.type === 'nombreEmpleado')
        calcTotal()

    if (e.target.dataset.type === 'pago') {
        const input = document.getElementById('form-document-total');

        if (!input.value)
            input.value = parseInt(e.target.value);
        else
            input.value = parseInt(input.value) + parseInt(e.target.value);
    }

    if (e.target.matches('.select-puesto-document')) {
        // -- Obtenemos el pago de cada puesto para actualizar la tabla
        e.target.parentNode.querySelectorAll('input[type="number"]')
            .forEach(item => item.value = 800)
        calcTotal()
    }
})

function calcTotal() {
    const inputTotal = document.getElementById('form-document-total');
    let sum = 0;

    document.querySelectorAll('.form__group-document').forEach(input => {
        let inputText = input.querySelectorAll('input[type="text"]');
        let inputNumber = input.querySelectorAll('input[type="number"]');

        for (let i = 0; i < inputNumber.length; i++) {
            if (inputNumber[i].dataset.type === 'pago' && inputText[i].value)
                sum += parseInt(inputNumber[i].value)
        }
    })

    inputTotal.value = sum;
}

function addGroupRow(parentGroupRow) {

    // -- Para saber cuanto es la cantidad de pago
    let parent = parentGroupRow.parentNode;
    let val = parent.querySelector('select').value;

    // -- Dependiendo del tipo de empleado se agregara un valor
    console.log(val)
    let value = 500;

    let newFormRow = `
                <div class="form__group-row">
                    <spam class="btn button-document"><i class="bi bi-plus-lg"></i></spam>
                    <input type="text" placeholder="Agregar empleado" data-type='nombreEmpleado' >
                    <input type="number" placeholder="$ Pago" data-type='pago' value="${value}">
                </div>
            `
    parentGroupRow.insertAdjacentHTML('afterend', newFormRow);
}

function removeGroupRow(parentGroupRow) {
    parentGroupRow.parentNode.removeChild(parentGroupRow);
}

async function getPuestos() {

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
