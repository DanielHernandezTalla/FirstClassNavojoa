'use strict';
import documentPDF from './documentos.pdf.js';

export default async function sectionDocument(option) {

    console.log(option);

    // -- Obtenemos los puestos que llevara por defecto
    let puestosSections = getOptions(option);

    // -- Obtener puestos y pagos
    const puestos = await getPuestos();
    const personal = await getPersonal();

    // console.log(puestos)
    // console.log(personal)

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
            <input type="text" name="documentTypeEvent" value="${option}">
        </div>
        <div class="form__group-grid">
            <label for="user">No Personas</label>
            <input type="number" name="documentPeople" value="">
        </div>
    `;

    $form.innerHTML = inputs;

    const $containerDatalist = getDatalist(personal);

    let sectiosPuestos = ``;
    // -- Agregamos las secciones de los puestos
    puestosSections.forEach((item) => {

        const $select = document.createElement('select');
        $select.classList.add('select-puesto-document');

        let salario = 0;

        puestos.forEach(itemPuesto => {
            if (item == itemPuesto.Nombre) {
                $select.innerHTML += `<option value="${itemPuesto.Nombre}" data-salario="${itemPuesto.Salario}" selected>${itemPuesto.Nombre}</option>`;
                salario = itemPuesto.Salario;
            } else
                $select.innerHTML += `<option value="${itemPuesto.Nombre}" data-salario="${itemPuesto.Salario}">${itemPuesto.Nombre}</option>`;
        })

        const $formGroupDocument = document.createElement('div');
        $formGroupDocument.classList.add('form__group-document')
        $formGroupDocument.appendChild($select.cloneNode(true));

        $formGroupDocument.innerHTML += `<spam class="btn btn-close-group-puesto"><i class="bi bi-x-lg"></i></spam>`;

        // if(option.personal){
        //     option.personal
        // }

        const $formRow = document.createElement('div');
        $formRow.classList.add('form__group-row')

        $formRow.innerHTML += '<spam class="btn button-document button-document-new-row"><i class="bi bi-plus-lg"></i></spam>';

        $formRow.appendChild($containerDatalist.cloneNode(true));

        $formRow.innerHTML += `<input type="number" placeholder="$ Pago" data-type='pago' value="${salario}">`;

        $formGroupDocument.appendChild($formRow);

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
            <input id="form-document-total" name="total" placeholder="$0.00" type="number">
        </div>
        <div class="form__group-document flex-right">
            <button class="btn btn-cancel btn-document-cancel">Cancelar</button>
            <button class="btn btn-primary" type="submit">Generar Reporte</button>
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

document.addEventListener('click', async e => {
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
            await addGroupRow(parentGroupRow);
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
        if (e.screenY !== 0)
            addGroupPuesto(e.target.parentNode);
    }

    if (e.target.matches('.btn-close-group-puesto') || e.target.matches('.btn-close-group-puesto *')) {
        let node;
        if (e.target.matches('i'))
            node = e.target.parentNode.parentNode;
        else node = e.target.parentNode

        node.parentNode.removeChild(node);
        calcTotal();
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
        let total = e.target.total
        let puestos = e.target.querySelectorAll('.form__group-document')

        // console.log(tipoEvento.value)
        // console.log(cantidadPersonas.value)

        let arrPuestoPeople = [];

        puestos.forEach(item => {
            let puesto = item.querySelector('select')
            if (puesto) {

                // console.log(puesto.value)

                let personasInputs = item.querySelectorAll('.document__input-datalist');
                let pagosInputs = item.querySelectorAll('input[type="number"]');

                let personas = []

                personasInputs.forEach((item, index) => {
                    // console.log(!personasInputs[index].value)
                    if (personasInputs[index].value) {
                        let newPersona = {
                            Nombre: personasInputs[index].value,
                            Salario: pagosInputs[index].value
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
            lugar: "Salon",
            total: total.value,
            puestos: arrPuestoPeople
        }

        console.log(newFormat)

        const $root = document.getElementById("root");
        const $main = $root.querySelector('main');

        $root.innerHTML = ``;

        $root.appendChild(documentPDF(newFormat, $main));

    }
})

document.addEventListener('keydown', async e => {

    if (e.key === 'Enter' && e.target.dataset.type)
        e.preventDefault()

    if (e.key === 'Enter' && e.target.matches('.document__input-datalist')) {
        e.preventDefault();
        await addGroupRow(e.target.parentNode.parentNode)
        let arr = e.target.parentNode.parentNode.parentNode.querySelectorAll('spam');
        for (let i = 0; i < arr.length - 1; i++) {
            arr[i].querySelector('i').classList.replace('bi-plus-lg', "bi-dash-lg");
        }
    }

    // if (e.key === 'Enter' && (e.target.dataset.type === 'pago' || e.target.dataset.type === 'nombreEmpleado')) {
    if (e.key === 'Enter' && (e.target.dataset.type === 'pago')) {
        await addGroupRow(e.target.parentNode)
        let arr = e.target.parentNode.parentNode.querySelectorAll('spam');
        for (let i = 0; i < arr.length - 1; i++) {
            arr[i].querySelector('i').classList.replace('bi-plus-lg', "bi-dash-lg");
        }
    }
})

document.addEventListener('change', e => {
    if (e.target.matches('.document__input-datalist'))
        calcTotal()

    if (e.target.dataset.type === 'pago')
        calcTotal()

    if (e.target.matches('.select-puesto-document')) {
        // -- Obtenemos el pago de cada puesto para actualizar la tabla
        let salary = 0;

        e.target.querySelectorAll('option').forEach(option => {
            if (option.value === e.target.value) salary = option.dataset.salario
        })

        e.target.parentNode.querySelectorAll('input[type="number"]')
            .forEach(item => item.value = salary)
        calcTotal()
    }
})

function calcTotal() {
    const inputTotal = document.getElementById('form-document-total');
    let sum = 0;

    document.querySelectorAll('.form__group-document').forEach(input => {
        let inputText = input.querySelectorAll('.document__input-datalist');
        let inputNumber = input.querySelectorAll('input[type="number"]');

        for (let i = 0; i < inputNumber.length; i++) {
            if (inputNumber[i].dataset.type === 'pago' && inputText[i].value)
                sum += parseInt(inputNumber[i].value)
        }
    })

    inputTotal.value = sum;
}

function getDatalist(personal) {
    const $containerDatalist = document.createElement('div')

    const $inputList = document.createElement('input');
    $inputList.setAttribute('class', 'document__input-datalist');
    $inputList.setAttribute('list', 'personal');
    $inputList.setAttribute('placeholder', 'Agregar empleado');

    const $datalist = document.createElement('datalist')
    $datalist.setAttribute('id', 'personal');

    personal.forEach(item => {
        $datalist.innerHTML += `
            <option value='${item.Nombre}'></option>
        `;
    })

    $containerDatalist.appendChild($inputList);
    $containerDatalist.appendChild($datalist);

    return $containerDatalist
}

function getOptions(option) {
    if (option === 'Basico') return ['Encargado', 'Mesero', 'Cristaleria', 'Baños'];
    if (option === 'Boda') return ['Encargado', 'Capitan', 'Mesero', 'Cristaleria', 'Puerta', 'Barrista', 'Baños'];
    if (option === 'VX') return ['Encargado', 'Capitan', 'Mesero', 'Cristaleria', 'Puerta', 'Barrista', 'Baños'];
    if (option === 'Bautizo') return ['Encargado', 'Mesero', 'Cristaleria', 'Baños'];
    else return [];
}

async function addGroupRow(node) {

    const personal = await getPersonal();

    const $containerDatalist = getDatalist(personal);

    // -- Para saber cuanto es la cantidad de pago
    let parent = node.parentNode;
    let val = parent.querySelector('select').value;

    let salary = 0;

    parent.querySelector('select').querySelectorAll('option').forEach(option => {
        if (option.value === val) salary = option.dataset.salario
    })

    const $newRow = document.createElement('div')
    $newRow.classList.add('form__group-row');

    $newRow.innerHTML += '<spam class="btn button-document"><i class="bi bi-plus-lg"></i></spam>';
    $newRow.appendChild($containerDatalist.cloneNode(true));
    $newRow.innerHTML += `<input type="number" placeholder="$ Pago" data-type='pago' value="${salary}">`;

    // $newRow.innerHTML = `
    //             <spam class="btn button-document"><i class="bi bi-plus-lg"></i></spam>
    //             <input type="text" placeholder="Agregar empleado" data-type='nombreEmpleado' >
    //             <input type="number" placeholder="$ Pago" data-type='pago' value="${salary}">
    //         `
    node.parentNode.insertBefore($newRow, node.nextSibling);
    $newRow.querySelector('input').focus();
}

async function addGroupPuesto(node) {

    const puestos = await getPuestos();
    const personal = await getPersonal();

    const $containerDatalist = getDatalist(personal);

    const {
        $select,
        salario
    } = createSelected(puestos)

    const $formGroupDocument = document.createElement('div');
    $formGroupDocument.classList.add('form__group-document')

    $formGroupDocument.appendChild($select.cloneNode(true));

    $formGroupDocument.innerHTML += `<spam class="btn btn-close-group-puesto"><i class="bi bi-x-lg"></i></spam>`;

    const $formRow = document.createElement('div');
    $formRow.classList.add('form__group-row')

    $formRow.innerHTML += '<spam class="btn button-document button-document-new-row"><i class="bi bi-plus-lg"></i></spam>';

    $formRow.appendChild($containerDatalist.cloneNode(true));

    $formRow.innerHTML += `<input type="number" placeholder="$ Pago" data-type='pago' value="${salario}">`;

    $formGroupDocument.appendChild($formRow);


    node.parentNode.insertBefore($formGroupDocument, node)
    calcTotal()
}

function createSelected(puestos, item = 'Encargado') {

    const $select = document.createElement('select');
    $select.classList.add('select-puesto-document');

    let salario;
    puestos.forEach(itemPuesto => {
        if (item == itemPuesto.Nombre) {
            $select.innerHTML += `<option value="${itemPuesto.Nombre}" data-salario="${itemPuesto.Salario}" selected>${itemPuesto.Nombre}</option>`;
            salario = itemPuesto.Salario;
        } else
            $select.innerHTML += `<option value="${itemPuesto.Nombre}" data-salario="${itemPuesto.Salario}">${itemPuesto.Nombre}</option>`;
    })
    return {
        $select,
        salario
    }
}

function removeGroupRow(parentGroupRow) {
    parentGroupRow.parentNode.removeChild(parentGroupRow);
    calcTotal()
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

async function getPersonal() {
    try {
        let res = await fetch('http://localhost:3000/personal');

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
