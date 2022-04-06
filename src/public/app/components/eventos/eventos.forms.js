'use strict';
const path = require('path');

import nav from '../nav.js';
import modalError from '../modal.error.js';
import modalConfirm from '../modal.confirm.js';
import sectionEventos from './calendar.js';

let $sectionEvent;
let $sectionGeneral;
let $sectionPagos;
let $sectionAddPagos;

export default async function eventAdd(id = -1, table = null, action = null, section = null) {

    $sectionEvent = null;
    $sectionGeneral = null;
    $sectionPagos = null;
    $sectionAddPagos = null;

    let selectClass = "";
    let nameH2 = "Agregar";
    let data = "";

    if (!action)
        selectClass = "btn-event-add"

    if (action === 'delete') {
        selectClass = "btn-event-delete";
        nameH2 = "Eliminar";
    }
    if (action === 'edit') {
        selectClass = "btn-event-edit";
        nameH2 = "Editar";
        data = await getById(id);
    }

    // -- Main
    const $main = document.createElement('main');

    // -- Creamos el contenedor de los elementos HTML
    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container-lg');
    $divContainer.classList.add('fixed');

    // -- Agregamos la imagen de fondo
    const $backImage = document.createElement('img');
    $backImage.classList.add('img-lg');
    $backImage.src = './app/assets/home.png';
    $backImage.alt = 'Imagen del first class';

    // -- H2
    const $h2 = document.createElement('h2');
    $h2.innerText = nameH2 + ' eventos';
    $h2.classList.add('h2');
    $h2.classList.add('h2-white');

    // -- Contenedor del form
    const $divContentForm = document.createElement('div');
    $divContentForm.classList.add('form-content-fixed');

    // -- Form
    const $form = document.createElement('form');
    $form.dataset.id = id;
    // $form.dataset.id = id;
    $form.classList.add('form');
    $form.setAttribute('id', 'form-event-add');
    $form.setAttribute('action', selectClass);

    $sectionEvent = createEvent(data);
    $sectionGeneral = createGeneral(data);
    $sectionPagos = await createPagos(data);
    $sectionAddPagos = agregarPagos(data);

    if (section === "pagos") $form.appendChild($sectionPagos);
    else $form.appendChild($sectionEvent);

    // Agregamos el form a su contenedor
    $divContentForm.appendChild($form);

    // -- Seccion del modal
    const $sectionModal = document.createElement('section');
    $sectionModal.classList.add('section-modal');
    $sectionModal.classList.add('none');

    const $ulModal = document.createElement('ul');

    $ulModal.innerHTML = `
        <li class="btn btn-modal-delete"><i class="bi bi-trash"></i>Eliminar</li>
    `;

    $sectionModal.appendChild($ulModal);

    // Agregamos todos los elementos al contenedor principal
    $divContainer.appendChild($backImage);
    $divContainer.appendChild($h2);
    $divContainer.appendChild($divContentForm);
    $divContainer.appendChild($sectionModal);

    $main.appendChild($divContainer)
    return $main;
}

document.addEventListener('submit', async e => {
    e.preventDefault()
})

document.addEventListener('click', async e => {

    // Botones de siguiente y anterior
    if (e.target.matches('#btn-event-evento')) {
        // Antes de pasar al siguiente form, validar
        if (!validateEvent()) {
            // Despues de validar pasar al siguiente o mostrar los errores
            $sectionEvent = document.querySelector('.form-section-event').cloneNode(true);
            document.querySelector('.form-section-event').outerHTML = '';

            document.querySelector('.form').appendChild($sectionGeneral);
            document.querySelector('input').focus();
        }
    }
    if (e.target.matches('#btn-event-general-before')) {
        // Antes de pasar al siguiente form, validar
        if (!validateEvent()) {
            $sectionGeneral = document.querySelector('.form-section-event').cloneNode(true);
            document.querySelector('.form-section-event').outerHTML = '';

            document.querySelector('.form').appendChild($sectionEvent);
            document.querySelector('input').focus();
        }
    }
    if (e.target.matches('#btn-event-general')) {
        // Antes de pasar al siguiente form, validar
        if (!validateEvent()) {
            $sectionGeneral = document.querySelector('.form-section-event').cloneNode(true);
            document.querySelector('.form-section-event').outerHTML = '';

            document.querySelector('.form').appendChild($sectionPagos);
        }
    }
    if (e.target.matches('#btn-event-pagos-before')) {
        // Antes de pasar al siguiente form, validar
        if (!validateEvent()) {
            $sectionPagos = document.querySelector('.form-section-event').cloneNode(true);
            document.querySelector('.form-section-event').outerHTML = '';

            document.querySelector('.form').appendChild($sectionGeneral);
            document.querySelector('input').focus();
        }
    }

    // Botones de opciones en evento
    if (e.target.matches('#btn-options-event')) {
        let section = getSectionEvent();
        if (section === "general")
            if (!validateEvent()) {
                $sectionGeneral = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';

                document.querySelector('.form').appendChild($sectionEvent);
            }

        if (section === "pagos")
            if (!validateEvent()) {
                $sectionPagos = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';

                document.querySelector('.form').appendChild($sectionEvent);
            }

        document.querySelector('input').focus();
    }
    if (e.target.matches('#btn-options-general')) {
        let section = getSectionEvent();

        if (section === "event")
            if (!validateEvent()) {
                $sectionEvent = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';

                document.querySelector('.form').appendChild($sectionGeneral);
            }

        if (section === "pagos")
            if (!validateEvent()) {
                $sectionPagos = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';

                document.querySelector('.form').appendChild($sectionGeneral);
            }

        document.querySelector('input').focus();
    }
    if (e.target.matches('#btn-options-pagos')) {
        let section = getSectionEvent();

        if (section === "event") {
            if (!validateEvent()) {
                $sectionEvent = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';

                if ($sectionGeneral)
                    if (!$sectionPagos) {
                        document.querySelector('.form').appendChild(createPagos());
                        calcularTotalAbono();
                    }
                else
                    document.querySelector('.form').appendChild($sectionPagos);
                else document.querySelector('.form').appendChild(createGeneral());
            }
        }
        if (section === "general") {
            if (!validateEvent()) {
                $sectionGeneral = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';

                document.querySelector('.form').appendChild($sectionPagos);
            }
        }
    }

    // Botones para guardar el evento
    if (e.target.matches('#btn-event-pagos') || e.target.matches('#btn-event-editar-event')) {
        saveEvent(e);
    }

    // Botones de para agregar pago
    if (e.target.matches('#btn-add-pago')) {
        // $sectionPagos = document.querySelector('.form-section-event');
        // console.log($sectionPagos)
        $sectionPagos = document.querySelector('.form-section-event').cloneNode(true);
        document.querySelector('.form-section-event').outerHTML = '';
        document.querySelector('.form').appendChild($sectionAddPagos);
    }
    if (e.target.matches('#btn-pagos-cancel')) {
        if (document.querySelector('#btn-pagos-create')) {

        }

        let idEvento = document.querySelector('.btn-primary').dataset.idevento

        console.log(idEvento)

        let data = await getById(idEvento);
        console.log(data)
        $sectionPagos = await createPagos(data);
        $sectionAddPagos = agregarPagos(data);
        document.querySelector('.form-section-event').outerHTML = '';
        document.querySelector('.form').appendChild($sectionPagos);
        calcularTotalAbono();
    }
    if (e.target.matches('#btn-pagos-create')) {
        if (!validateEvent()) {

            let idEvento = document.getElementById('btn-pagos-create').dataset.idevento;
            // console.log(idEvento);

            if (!idEvento)
                idEvento = await saveEvent(null, true);

            if (!idEvento) return

            const $pago = {
                IdEvento: idEvento,
                NoAbono: 2,
                FechaPago: document.querySelector('form').fechaPago.value,
                Monto: parseInt(document.querySelector('form').cantidad.value),
                MetodoPago: document.querySelector('form').tipoPago.value,
            }

            // Aqui agregamos el pago
            let result = await addPagos($pago)

            // console.log(result);

            if (result.isMayor === 0) {
                const $root = document.getElementById("root");
                $root.appendChild(await modalConfirm("La suma de los abonos es mayor al total del costo del evento ¿Quieres agregar el pago aun?", null, $pago));
            } else {
                // Quitamos el form y ponemos la tabla de abonos

                let data = await getById($pago.IdEvento);
                $sectionPagos = await createPagos(data);
                $sectionAddPagos = agregarPagos(data);
                document.querySelector('.form-section-event').outerHTML = '';
                document.querySelector('.form').appendChild($sectionPagos);
                calcularTotalAbono();
            }
        }
    }

    // Cancel
    if (e.target.matches('#btn-event-cancel')) {
        cancel();
    }
})

const stopReload = async e => {

    e.preventDefault();
    e.returnValue = '';
}

document.addEventListener('change', async e => {
    if (e.target.matches('#form-event-input-totalPago')) {
        calcularTotalAbono();
        validateEvent();
    }

    if (e.target.matches('#form-event-input-fecha')) {

        let fecha = e.target.value;

        let resultAvaliableDays = await getAvailableDays(fecha)

        if (resultAvaliableDays[0].QuantityOfDays == 2) {
            const $root = document.getElementById("root");
            $root.appendChild(await modalError("Dia ocupado."));
            e.target.value = null;
        }
    }

    if (e.target.matches('#form-event-input-croquis')) {

        // if (e.target.dataset.url) {
        //     let urlOld = e.target.dataset.url;
        //     console.log(urlOld)
        //     e.target.dataset.url = "";

        //     urlOld = urlOld.split(`\\`).pop();

        //     await removeImage(urlOld);
        // }

        if (e.target.files[0]) {
            let url = await addImage(e.target.files[0].path);
            e.target.dataset.url = url;
        }

        window.addEventListener('beforeunload', stopReload)


        setTimeout(() => {
            window.removeEventListener('beforeunload', stopReload);
        }, 400)
    }
})

function createEvent(data = null) {

    // console.log(data[0])
    let ID = "";
    let salon = false;
    let jardin = false;
    let fechaEvento = "";
    let sesion = "";
    let ceremonia = "";

    if (data) {

        ID = data[0].ID;

        if (data[0].Ubicacion.includes("Salon")) salon = true;

        if (data[0].Ubicacion.includes("Jardin")) jardin = true;

        if (data[0].FechaEvento)
            fechaEvento = `${data[0].FechaEvento.substring(0, 4)}-${data[0].FechaEvento.substring(5, 7)}-${data[0].FechaEvento.substring(8, 10)}`;

        if (data[0].Sesion)
            if (data[0].Sesion.substring(0, 4) !== "1999")
                sesion = `${data[0].Sesion.substring(0, 4)}-${data[0].Sesion.substring(5, 7)}-${data[0].Sesion.substring(8, 10)}T${data[0].Sesion.substring(11, 13)}:${data[0].Sesion.substring(14, 16)}`;

        if (data[0].CeremoniaCivil)
            ceremonia = `${data[0].CeremoniaCivil.substring(0, 2)}:${data[0].CeremoniaCivil.substring(3, 5)}:${data[0].CeremoniaCivil.substring(6, 8)}`;
    }

    const $formSection = document.createElement('div');
    $formSection.classList.add('form-section-event');

    const $sectionRowOptions = document.createElement('div');
    $sectionRowOptions.innerHTML = craeteSectionRowOptions();

    const $formContentGroup = document.createElement('div');
    $formContentGroup.classList.add('form-content-group-grid-2');

    $formContentGroup.innerHTML = `
        <div class="form__group-grid">
            <label for="form-event-input-fecha">Fecha</label>
            <input id="form-event-input-fecha" type="date" name="fecha" value="${fechaEvento}" title="Ingresa la fecha del evento." data-required>
            <small class="form-error opacity">Error: Ingresa la fecha del evento.</small>
        </div>
        <div class="form__group-grid">
            <label for="form-event-input-sesion">Sesión</label>
            <input id="form-event-input-sesion" type="datetime-local" name="sesion" value="${sesion}" title="Ingresa la fecha y hora de sesion.">
            <small class="form-error opacity">Error: Ingresa la fecha y hora de sesion.</small>
        </div>
        <div class="form__group-grid">
            <label>Lugar</label>
            <div class="flex">
                <div>
                    <input id="eventPlaceSalon" type="checkbox" name="eventPlaceSalon" ${salon? "checked": ""}>
                    <label for="eventPlaceSalon">Salón</label>
                </div>
                <div>
                    <input id="eventPlaceJardin" type="checkbox" name="eventPlaceJardin" ${jardin? "checked": ""}>
                    <label for="eventPlaceJardin">Jardín</label>
                </div>
            </div>
            <small id="eventPlaceError" class="form-error opacity">Error: Ingresa el lugar del evento.</small>
        </div>
        <div class="form__group-grid">
            <label for="form-event-input-evento">Evento</label>
            <input id="form-event-input-evento" type="text" name="evento" value="${data?data[0].TipoEvento:""}" title="Ingresa el tipo de evento." data-required>
            <small class="form-error opacity">Error: Ingresa el tipo de evento.</small>
        </div>
        <div class="form__group-grid form__group-grid-2">
            <label for="form-event-input-cliente">Cliente</label>
            <input id="form-event-input-cliente" type="text" name="cliente" value="${data?data[0].Cliente:""}" title="Ingresa el nombre del cliente." data-required>
            <small class="form-error opacity">Error: Ingresa el nombre del cliente.</small>
        </div>
        <div class="form__group-grid  form__group-grid-2">
            <label for="form-event-input-telefono">Teléfono</label>
            <input id="form-event-input-telefono" type="number" name="phone" value="${data?data[0].Telefono:""}">
            <small class="form-error opacity">Error: Agrega un teléfono correcto</small>
        </div>
        <div class="form__group-grid form__group-grid-2 form__group-grid-large">
            <label for="form-event-input-ceremonia">Ceremonia Civil</label>
            <input id="form-event-input-ceremonia" type="time" name="ceremonia" value="${ceremonia}" title="¿Habra ceremonia?">
            <small class="form-error opacity">Error: Agrega la hora y detalles de la ceremonia</small>
        </div>
    `;

    let buttons = `
        <button id="btn-event-evento" class="btn btn-primary">Siguiente</button>
        <button id="btn-event-cancel" class="btn btn-cancel">Cancelar</button>
    `;

    $formSection.appendChild($sectionRowOptions);
    $formSection.appendChild($formContentGroup);
    $formSection.innerHTML += buttons;

    return $formSection;
}

function createGeneral(data = null) {

    // console.log(data[0])

    let horaInicio = "";
    let horaCena = "";
    let croquis = "";

    if (data) {
        if (data[0].HoraInicio)
            horaInicio = `${data[0].HoraInicio.substring(0, 2)}:${data[0].HoraInicio.substring(3, 5)}:${data[0].HoraInicio.substring(6, 8)}`;
        if (data[0].HoraCena)
            horaCena = `${data[0].HoraCena.substring(0, 2)}:${data[0].HoraCena.substring(3, 5)}:${data[0].HoraCena.substring(6, 8)}`;
        if (data[0].Croquis)
            croquis = `${data[0].Croquis.split('\\').pop()}`;
    }

    croquis = path.join(__dirname, '../', 'uploads', croquis);

    const $formSection = document.createElement('div');
    $formSection.classList.add('form-section-event');

    const $sectionRowOptions = document.createElement('div');
    $sectionRowOptions.innerHTML = craeteSectionRowOptions();

    const $formContentGroup = document.createElement('div');
    $formContentGroup.classList.add('form-content-group-grid-2');

    $formContentGroup.innerHTML = `
        <div class="form__group-grid form__group-grid-middle">
            <label for="form-event-input-noPersonas">No. Personas</label>
            <input id="form-event-input-noPersonas" type="number" name="noPersonas" value="${data?data[0].NoPersonas:""}" title="Ingresa el numero de personas.">
            <small class="form-error opacity">Error: Ingresa el numero de personas.</small>
        </div>

        <div class="form__group-grid form__group-grid-middle">
            <label for="form-event-input-noMeseros">No. Meseros</label>
            <input id="form-event-input-noMeseros" type="number" name="noMeseros" value="${data?data[0].NoMeseros:""}" title="Ingresa el numero de meseros.">
            <small class="form-error opacity">Error: Ingresa el numero de meseros.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-hora">Hora</label>
            <input id="form-event-input-hora" type="time" name="hora" value="${horaInicio}" title="Ingresa la hora que inicia el evento.">
            <small class="form-error opacity">Error: Ingresa la hora que inicia el evento.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-horaCena">Hora Cena</label>
            <input id="form-event-input-horaCena" type="time" name="horaCena" value="${horaCena}" title="Ingresa la hora de la cena.">
            <small class="form-error opacity">Error: Ingresa la hora de la cena.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-platillo">Platillo</label>
            <input id="form-event-input-platillo" type="String" name="platillo" value="${data?data[0].Platillo:""}" title="Ingresa el platillo para el evento.">
            <small class="form-error opacity">Error: Ingresa el platillo para el evento.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-alcohol">Alcohol</label>
            <input id="form-event-input-alcohol" type="String" name="alcohol" value="${data?data[0].Alcohol:""}" title="Ingresa los datos para el alcohol.">
            <small class="form-error opacity">Error: Ingresa los datos para el alcohol.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-croquis">Croquis</label>
            <input id="form-event-input-croquis" type="file" name="croquis" title="Agrega la imagen del croquis." data-url="${croquis}">
            <small class="form-error opacity">Error: Agrega la imagen del croquis.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-mantel">Mantel</label>
            <input id="form-event-input-mantel" type="text" name="mantel" value="${data?data[0].Mantel:""}" title="Ingresa el tipo de mantel.">
            <small class="form-error opacity">Error: Ingresa el tipo de mantel.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-cristaleria">Cristaleria</label>
            <input id="form-event-input-cristaleria" type="text" name="cristaleria" value="${data?data[0].Cristaleria:""}" title="Ingresa el tipo de cristaleria.">
            <small class="form-error opacity">Error: Ingresa el tipo de cristaleria.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-servilleta">Servilleta</label>
            <input id="form-event-input-servilleta" type="text" name="servilleta" value="${data?data[0].Servilleta:""}" title="Ingresa el tipo de servilleta.">
            <small class="form-error opacity">Error: Ingresa el tipo de servilleta.</small>
        </div>

        <div class="form__group-grid form__group-grid-2 form__group-grid-middle">
            <label for="form-event-input-tipoMesas">Tipo de mesas</label>
            <input id="form-event-input-tipoMesas" type="String" name="tipoMesas" value="${data?data[0].TipoMesa:""}" title="Ingresa el tipo de mesas.">
            <small class="form-error opacity">Error: Ingresa el tipo de mesas.</small>
        </div>

        <div class="form__group-grid form__group-grid-2 form__group-grid-middle">
            <label for="form-event-input-tipoSillas">Tipo de sillas</label>
            <input id="form-event-input-tipoSillas" type="String" name="tipoSillas" value="${data?data[0].TipoSilla:""}" title="Ingresa el tipo de sillas.">
            <small class="form-error opacity">Error: Ingresa el tipo de sillas.</small>
        </div>

        <div class="form__group-grid form__group-grid-2 form__group-grid-large">
            <label for="form-event-input-casosEspeciales">Casos especiales</label>
            <textarea id="form-event-input-casosEspeciales" class="form__group-grid-2" rows="4" name="casosEspeciales" title="Agrega datos extras.">${data?data[0].CasoEspecial:""}</textarea>
            <small class="form-error opacity">Error: Agrega datos extras.</small>
        </div>
    `;

    let buttons = `
        <button id="btn-event-general" class="btn btn-primary">Siguiente</button>
        <button id="btn-event-general-before" class="btn btn-cancel">Anterior</button>
        <button id="btn-event-cancel" class="btn btn-cancel">Cancelar</button>
    `;

    $formSection.appendChild($sectionRowOptions);
    $formSection.appendChild($formContentGroup);
    $formSection.innerHTML += buttons;

    return $formSection;
}

async function createPagos(dataForm = null) {

    let data = null;


    if (dataForm)
        data = await getPagosById(dataForm[0].ID);

    const $formSection = document.createElement('div');
    $formSection.classList.add('form-section-event');

    const $sectionRowOptions = document.createElement('div');
    $sectionRowOptions.innerHTML = craeteSectionRowOptions();

    // Agregamos tabla de pagos
    const $sectionTable = document.createElement('div');


    $sectionTable.classList.add('table__pagos');

    $sectionTable.innerHTML += `

    <p>No Pago</p>
    <p>Método de pago</p>
    <p>Fecha</p>
    <p class="text-align-right">Cantidad</p>`;

    let suma = 0;
    let totalCosto = 0;

    if (data) {
        totalCosto = dataForm[0].CostoTotal;
        data.forEach(item => {
            let fechaPago = item.FechaPago.substring(8, 10) + " de " + GetTxtMonth(parseInt(item.FechaPago.substring(5, 7))) + " de " + item.FechaPago.substring(0, 4);
            suma += item.Monto;
            $sectionTable.innerHTML += `
                    <p data-table='pagos' class="table__row-clear" data-id="${item.ID}">${item.NoAbono}</p>
                    <p data-table='pagos' class="table__row-clear" data-id="${item.ID}">${item.MetodoPago}</p>
                    <p data-table='pagos' class="table__row-clear" data-id="${item.ID}">${fechaPago}</p>
                    <p data-table='pagos' class="table__row-clear text-align-right abono" data-id="${item.ID}">$${item.Monto}</p>
            `;
        });
    }

    let adeudoTotal = totalCosto - suma;

    $sectionTable.innerHTML += `
            <p></p>
            <p></p>
            <p class="text-align-right">Total</p>
            <p class="text-align-right abono-total">$${suma}</p>

            <p></p>
            <p></p>
            <p class="text-align-right">Total Evento</p>
            <input id="form-event-input-totalPago" class="text-align-right input-total-pago" type="number" step="0.01" value="${dataForm?totalCosto:""}">

            <p></p>
            <p></p>
            <p></p>
            <small></small>

            <p></p>
            <p></p>
            <p class="text-align-right">Adeudo</p>
            <p class="text-align-right adeudo-total">$${adeudoTotal}</p>

    `;

    let buttons = `
        <button id="${!dataForm?'btn-event-pagos': 'btn-event-editar-event'}" class="btn btn-primary" data-id=${dataForm?dataForm[0].ID:""}>Guardar</button>
        <button id="btn-event-pagos-before" class="btn btn-cancel">Anterior</button>
        <button id="btn-event-cancel" class="btn btn-cancel">Cancelar</button>
    `;

    $formSection.appendChild($sectionRowOptions);
    $formSection.innerHTML += `
    <button class="btn btn-right span-1-4"><b id="btn-add-pago">Agregar Pago</b></button>
    `;
    $formSection.appendChild($sectionTable);
    $formSection.innerHTML += buttons;

    return $formSection;
}

function agregarPagos(data) {
    const $formSection = document.createElement('div');
    $formSection.classList.add('form-section-event');

    const $sectionRowOptions = document.createElement('div');
    $sectionRowOptions.innerHTML = `<div class="form-div-hr"></div>`;

    const $formContentGroup = document.createElement('div');
    $formContentGroup.classList.add('form-content-group');

    $formContentGroup.innerHTML = `
        <div class="form__group-grid form__group-grid-middle">
            <label for="form-pago-input-fechaPago">Fecha pago</label>
            <input id="form-pago-input-fechaPago" type="date" name="fechaPago" value="" title="Ingresa la fecha de pago." data-required>
            <small class="form-error opacity">Error: Ingresa la fecha de pago.</small>
        </div>

        <div class="form__group-grid form__group-grid-middle">
            <label for="form-pago-input-cantidad">Cantidad</label>
            <input id="form-pago-input-cantidad" type="number" name="cantidad" value="" title="Ingresa la cantidad del pago." data-required>
            <small class="form-error opacity">Error: Ingresa la cantidad del pago.</small>
        </div>

        <div class="form__group-grid form__group-grid-large">

            <label for="form-pago-input-tipoPago">Método de pago</label>

            <select name="tipoPago" id="form-pago-input-tipoPago" title="Ingresa el tipo de pago." data-required>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
            </select>

            <small class="form-error opacity">Error: Ingresa el tipo de pago.</small>
        </div>
    `;

    let buttons = `
        <button id="btn-pagos-create" class="btn btn-primary" data-idevento="${data?data[0].ID:""}" >Guardar Pago</button>
        <button id="btn-pagos-cancel" class="btn btn-cancel">Cancelar</button>
    `;

    $formSection.appendChild($sectionRowOptions);
    $formSection.appendChild($formContentGroup);
    $formSection.innerHTML += buttons;

    return $formSection;
}

function craeteSectionRowOptions() {
    return `
        <div class="form-div-hr">
            <div><img id="btn-options-event" src="./app/assets/icon_star_whitout_border.png" alt="1"/><small><b>Evento</b></small></div>
            <div><img id="btn-options-general" src="./app/assets/icon_salon_whitout_border.png" alt="2"/><small><b>General</b></small></div>
            <div><img id="btn-options-pagos" src="./app/assets/icon_pagos_whitout_border.png" alt="3"/><small><b>Pagos</b></small></div>
        </div>
    `;
}

function validateEvent() {
    let validates = document.querySelectorAll('input[data-required]')

    let error = false;

    validates.forEach(item => {
        if (!item.value.trim().length) {
            item.parentNode.querySelector('small').textContent = item.getAttribute('title');
            item.parentNode.querySelector('small').classList.remove('opacity')
            if (!error) {
                item.focus();
                error = true;
            }

        } else
            item.parentNode.querySelector('small').classList.add('opacity')
        // error
    });

    // Validando Entrada de evento
    let Evento = document.querySelector('#form-event-input-evento');
    if (Evento)
        if (Evento.value.trim().length < 2 || Evento.value.trim().length > 50) {
            Evento.parentNode.querySelector('small').textContent = "El evento debe tener entre 2 y 50 caracteres.";
            Evento.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                Evento.focus();
            error = true;
        }

    // Validando Entrada de Cliente
    let Cliente = document.querySelector('#form-event-input-cliente');
    if (Cliente)
        if (Cliente.value.trim().length < 3 || Cliente.value.trim().length > 50) {
            Cliente.parentNode.querySelector('small').textContent = "El nombre del cliente debe tener entre 3 y 100 caracteres.";
            Cliente.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                Cliente.focus();
            error = true;
        }

    // Validando Entrada del telefono
    let Telefono = document.querySelector('#form-event-input-telefono');
    if (Telefono) {
        if (Telefono.value !== "")
            if (Telefono.value.trim().length !== 10) {
                Telefono.parentNode.querySelector('small').textContent = "El telefono debe tener 10 caracteres.";
                Telefono.parentNode.querySelector('small').classList.remove('opacity');
                if (!error)
                    Telefono.focus();
                error = true;
            }
        if (Telefono.value === "") Telefono.parentNode.querySelector('small').classList.add('opacity');
    }

    // Validando numero de personas
    let NoPersonas = document.querySelector('#form-event-input-noPersonas');
    if (NoPersonas)
        if (NoPersonas.value > 65535) {
            NoPersonas.parentNode.querySelector('small').textContent = "No puedes agregar mas de 65,535 personas.";
            NoPersonas.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                NoPersonas.focus();
            error = true;
        } else {
            NoPersonas.parentNode.querySelector('small').classList.add('opacity');
        }

    // Validando numero de meseros
    let NoMeseros = document.querySelector('#form-event-input-noMeseros');
    if (NoMeseros)
        if (NoMeseros.value > 250) {
            NoMeseros.parentNode.querySelector('small').textContent = "No puedes agregar mas de 255 meseros.";
            NoMeseros.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                NoMeseros.focus();
            error = true;
        } else {
            NoMeseros.parentNode.querySelector('small').classList.add('opacity');
        }

    // Validando platillo
    let Platillo = document.querySelector('#form-event-input-platillo');
    if (Platillo)
        // if (Platillo.value.trim() !== "") {
        if (Platillo.value.trim() !== "" && (Platillo.value.trim().length < 3 || Platillo.value.trim().length > 200)) {
            Platillo.parentNode.querySelector('small').textContent = "El platillo debe tener entre 3 y 200 caracteres.";
            Platillo.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                Platillo.focus();
            error = true;
        } else
            Platillo.parentNode.querySelector('small').classList.add('opacity');


    // Validando alcohol
    let Alcohol = document.querySelector('#form-event-input-alcohol');
    if (Alcohol)
        if (Alcohol.value.trim() !== "" && (Alcohol.value.trim().length < 2 || Alcohol.value.trim().length > 150)) {
            Alcohol.parentNode.querySelector('small').textContent = "El alcohol debe tener entre 2 y 150 caracteres.";
            Alcohol.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                Alcohol.focus();
            error = true;
        } else
            Alcohol.parentNode.querySelector('small').classList.add('opacity');

    // Validando mantel
    let Mantel = document.querySelector('#form-event-input-mantel');
    if (Mantel)
        if (Mantel.value.trim() !== "" && (Mantel.value.trim().length < 3 || Mantel.value.trim().length > 150)) {
            Mantel.parentNode.querySelector('small').textContent = "El mantel debe tener entre 3 y 150 caracteres.";
            Mantel.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                Mantel.focus();
            error = true;
        } else
            Mantel.parentNode.querySelector('small').classList.add('opacity');

    // Validando cristaleria
    let Cristaleria = document.querySelector('#form-event-input-cristaleria');
    if (Cristaleria)
        if (Cristaleria.value.trim() !== "" && (Cristaleria.value.trim().length < 3 || Cristaleria.value.trim().length > 150)) {
            Cristaleria.parentNode.querySelector('small').textContent = "La cristaleria debe tener entre 3 y 150 caracteres.";
            Cristaleria.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                Cristaleria.focus();
            error = true;
        } else
            Cristaleria.parentNode.querySelector('small').classList.add('opacity');

    // Validando servilleta
    let Servilleta = document.querySelector('#form-event-input-servilleta');
    if (Servilleta)
        if (Servilleta.value.trim() !== "" && (Servilleta.value.trim().length < 3 || Servilleta.value.trim().length > 150)) {
            Servilleta.parentNode.querySelector('small').textContent = "La servillet a debe tener entre 3 y 45 caracteres.";
            Servilleta.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                Servilleta.focus();
            error = true;
        } else
            Servilleta.parentNode.querySelector('small').classList.add('opacity');

    // Validando Tipo mesa
    let TipoMesas = document.querySelector('#form-event-input-tipoMesas');
    if (TipoMesas)
        if (TipoMesas.value.trim() !== "" && (TipoMesas.value.trim().length < 3 || TipoMesas.value.trim().length > 150)) {
            TipoMesas.parentNode.querySelector('small').textContent = "El tipo de mesa debe tener entre 3 y 150 caracteres.";
            TipoMesas.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                TipoMesas.focus();
            error = true;
        } else
            TipoMesas.parentNode.querySelector('small').classList.add('opacity');

    // Validando Tipo sillas
    let TipoSillas = document.querySelector('#form-event-input-tipoSillas');
    if (TipoSillas)
        if (TipoSillas.value.trim() !== "" && (TipoSillas.value.trim().length < 3 || TipoSillas.value.trim().length > 150)) {
            TipoSillas.parentNode.querySelector('small').textContent = "El tipo de silas debe tener entre 3 y 150 caracteres.";
            TipoSillas.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                TipoSillas.focus();
            error = true;
        } else
            TipoSillas.parentNode.querySelector('small').classList.add('opacity');

    // Validando casos especiales
    let CasosEspeciales = document.querySelector('#form-event-input-casosEspeciales');
    if (CasosEspeciales)
        if (CasosEspeciales.value.trim() !== "" && (CasosEspeciales.value.trim().length < 3 || CasosEspeciales.value.trim().length > 250)) {
            CasosEspeciales.parentNode.querySelector('small').textContent = "Los detalles de casos especiales deben tener entre 3 y 250 caracteres.";
            CasosEspeciales.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                CasosEspeciales.focus();
            error = true;
        } else
            CasosEspeciales.parentNode.querySelector('small').classList.add('opacity');


    // Validando maximo de evento
    let CostoMaximo = document.querySelector('#form-event-input-totalPago');
    if (CostoMaximo)
        if (parseInt(CostoMaximo.value) > 9999999.99) {
            // const $root = document.getElementById("root");
            // $root.appendChild(await modalError(e));
            CostoMaximo.parentNode.querySelector('small').textContent = "No puedes agregar un costo mayor a 9999999.99";
            CostoMaximo.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                CostoMaximo.focus();
            error = true;
        } else {
            CostoMaximo.parentNode.querySelector('small').classList.add('opacity');
            CostoMaximo.parentNode.querySelector('small').textContent = "";
        }

    // Validando maximo de pago
    let cantidadPago = document.querySelector('#form-pago-input-cantidad');
    if (cantidadPago)
        if (parseInt(cantidadPago.value) > 9999999.99) {
            // const $root = document.getElementById("root");
            // $root.appendChild(await modalError(e));
            cantidadPago.parentNode.querySelector('small').textContent = "No puedes agregar un pago mayor a 9999999.99";
            cantidadPago.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                cantidadPago.focus();
            error = true;
        } else {
            if (parseInt(cantidadPago.value)) {
                cantidadPago.parentNode.querySelector('small').classList.add('opacity');
                // cantidadPago.parentNode.querySelector('small').textContent = " ";
            }
        }


    if (validateLugar() || error)
        return true;
}

function validateLugar() {
    let salon = document.getElementById('eventPlaceSalon');
    let jardin = document.getElementById('eventPlaceJardin');

    if (!salon) return false;

    if (!salon.checked && !jardin.checked) {
        document.getElementById('eventPlaceError').classList.remove('opacity')
        return true;
    }

    document.getElementById('eventPlaceError').classList.add('opacity')
    return false;
}

function getSectionEvent() {
    if (document.getElementById('btn-event-evento'))
        return 'event';
    if (document.getElementById('btn-event-general'))
        return 'general';
    if (document.getElementById('btn-event-pagos') || document.getElementById('btn-event-editar-event'))
        return 'pagos';
}

function calcularTotalAbono() {

    let total = 0;
    document.querySelectorAll('.abono').forEach(item => {
        total += parseInt(item.textContent.substring(1, item.textContent.length));
    })

    let totalEvento = document.getElementById('form-event-input-totalPago').value;

    document.querySelector('.abono-total').textContent = `$${total}.00`;
    document.querySelector('.adeudo-total').textContent = `$${totalEvento-total}.00`;

    // console.log(total)
}

function GetTxtMonth(mes) {
    switch (mes) {
        case 1:
            return "Enero";
        case 2:
            return "Febrero";
        case 3:
            return "Marzo";
        case 4:
            return "Abril";
        case 5:
            return "Mayo";
        case 6:
            return "Junio";
        case 7:
            return "Julio";
        case 8:
            return "Agosto";
        case 9:
            return "Septiembre";
        case 10:
            return "Octubre";
        case 11:
            return "Noviembre";
        case 12:
            return "Diciembre";
    }
}

async function cancel() {

    // console.log(document.querySelector('form'))

    if (document.querySelector('form').dataset.action === 'btn-event-add') {
        let url = document.querySelector('#form-event-input-croquis').dataset.url;
        if (url) {
            urlOld = urlOld.split(`\\`).pop();

            await removeImage(urlOld);
        }
    }


    $sectionEvent = "";
    $sectionGeneral = "";
    $sectionPagos = "";
    $sectionAddPagos = "";
    setTimeout(async () => {
        const $root = document.getElementById("root");
        $root.innerHTML = ``;
        $root.appendChild(nav());
        let $sectionEventos = await sectionEventos();
        $root.appendChild($sectionEventos)
    }, 100)
}

async function saveEvent(e, saveOnpagos = false) {
    if (validateEvent()) return;

    // $sectionPagos = document.querySelector('.form-section-event').cloneNode(true);

    let ubicacion = "";
    if ($sectionEvent.querySelector('#eventPlaceSalon').checked &&
        $sectionEvent.querySelector('#eventPlaceJardin').checked) {
        ubicacion = "Salon/Jardin"
    } else if ($sectionEvent.querySelector('#eventPlaceSalon').checked) {
        ubicacion = "Salon"
    } else if ($sectionEvent.querySelector('#eventPlaceJardin').checked) {
        ubicacion = "Jardin"
    }

    let sesion = $sectionEvent.querySelector('#form-event-input-sesion').value;
    let costoTotal = $sectionPagos.querySelector('#form-event-input-totalPago').value;

    const $event = {
        FechaEvento: $sectionEvent.querySelector('#form-event-input-fecha').value,
        Sesion: !sesion ? '1999-01-01' : sesion,
        Ubicacion: ubicacion,
        TipoEvento: $sectionEvent.querySelector('#form-event-input-evento').value,
        Cliente: $sectionEvent.querySelector('#form-event-input-cliente').value,
        Telefono: $sectionEvent.querySelector('#form-event-input-telefono').value,
        CeremoniaCivil: $sectionEvent.querySelector('#form-event-input-ceremonia').value,
        NoPersonas: parseInt($sectionGeneral.querySelector('#form-event-input-noPersonas').value),
        NoMeseros: parseInt($sectionGeneral.querySelector('#form-event-input-noMeseros').value),
        HoraInicio: $sectionGeneral.querySelector('#form-event-input-hora').value,
        HoraCena: $sectionGeneral.querySelector('#form-event-input-horaCena').value,
        Platillo: $sectionGeneral.querySelector('#form-event-input-platillo').value,
        Alcohol: $sectionGeneral.querySelector('#form-event-input-alcohol').value,
        Croquis: $sectionGeneral.querySelector('#form-event-input-croquis').dataset.url,
        Mantel: $sectionGeneral.querySelector('#form-event-input-mantel').value,
        Servilleta: $sectionGeneral.querySelector('#form-event-input-servilleta').value,
        Cristaleria: $sectionGeneral.querySelector('#form-event-input-cristaleria').value,
        TipoMesa: $sectionGeneral.querySelector('#form-event-input-tipoMesas').value,
        TipoSilla: $sectionGeneral.querySelector('#form-event-input-tipoSillas').value,
        CasoEspecial: $sectionGeneral.querySelector('#form-event-input-casosEspeciales').value,
        CostoTotal: parseInt(!costoTotal ? 0 : costoTotal),
        AbonoTotal: parseInt(0),
    }

    if (saveOnpagos) {
        let result = await fetchAddEvent($event);
        if (result.ID) return result.ID;

        return false;
    }

    if (e.target.matches('#btn-event-pagos')) {
        let result = await fetchAddEvent($event);
        if (result)
            cancel();
    }

    if (e.target.matches('#btn-event-editar-event')) {
        let result = await fetchUpdateEvent($event);

        if (result)
            cancel();
    }
}

// Funciones Fetch
async function fetchAddEvent(event) {
    // console.log(event);
    try {
        let res = await fetch('http://localhost:3000/eventos', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!res.ok)
            throw (res);

        let data = await res.json();

        return data.body;

    } catch (e) {
        // console.log(e)
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return false;
    }
}

async function fetchUpdateEvent(event) {

    let id = document.querySelector('.btn-primary').dataset.id;

    try {
        let res = await fetch('http://localhost:3000/eventos/' + id, {
            method: 'PATCH',
            body: JSON.stringify(event),
            headers: {
                'Content-type': 'application/json'
            }
        })

        // console.log('=========================');

        if (!res.ok)
            throw (res);

        return true;

    } catch (e) {
        // console.log(e)
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return false;
    }
}

async function getById(id) {
    if (!id) return;
    try {
        let res = await fetch('http://localhost:3000/eventos/' + id + '/');

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

async function getPagosById(id) {
    try {
        let res = await fetch('http://localhost:3000/pagos/' + id + '/');

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

async function addPagos(pago) {
    try {
        let res = await fetch('http://localhost:3000/pagos', {
            method: 'POST',
            body: JSON.stringify(pago),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!res.ok)
            throw (res);
        let data = await res.json();

        console.log(data);

        return data.body;
    } catch (e) {
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}

async function addImage(URL) {
    try {
        // const formData = new FormData()
        // formData.set('file', file)

        let res = await fetch('http://localhost:3000/eventos/savaImage', {
            method: 'POST',
            body: JSON.stringify({
                url: URL
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!res.ok)
            throw (res);
        let data = await res.json();

        console.log(data);

        return data.body;
    } catch (e) {
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}

async function removeImage(name) {

    console.log(name)

    try {
        let res = await fetch('http://localhost:3000/eventos/removeImage/' + name, {
            method: 'DELETE'
        })

        if (!res.ok)
            throw (res);
        let data = await res.json();

        console.log(data);

        return data.body;
    } catch (e) {
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}

async function getAvailableDays(day) {
    try {
        let res = await fetch('http://localhost:3000/eventos/getAvailableDays/' + day, {
            method: 'GET'
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
