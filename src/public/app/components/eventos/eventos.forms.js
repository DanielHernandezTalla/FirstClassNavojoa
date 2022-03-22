'use strict';
import nav from '../nav.js';
// import sectionPersonal from './personal.js'
import modalError from '../modal.error.js';
import sectionEventos from './calendar.js';

export default async function eventAdd(id = -1, table = null, action = null) {

    let selectClass = "";
    let nameH2 = "Agregar";
    let data = null;

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

    $form.appendChild(createEvent());
    // $form.appendChild(createGeneral());
    // $form.appendChild(createPagos());

    // $form.appendChild(agregarPagos());

    // Agregamos el form a su contenedor
    $divContentForm.appendChild($form);

    // Agregamos todos los elementos al contenedor principal
    $divContainer.appendChild($backImage);
    $divContainer.appendChild($h2);
    $divContainer.appendChild($divContentForm);

    $main.appendChild($divContainer)
    return $main;
}

let $sectionEvent;
let $sectionGeneral;
let $sectionPagos;
let $sectionAddPagos;

document.addEventListener('click', async e => {

    // Botones de siguiente y anterior
    if (e.target.matches('#btn-event-evento')) {
        // Antes de pasar al siguiente form, validar
        if (!validateEvent()) {
            // Despues de validar pasar al siguiente o mostrar los errores
            $sectionEvent = document.querySelector('.form-section-event').cloneNode(true);
            document.querySelector('.form-section-event').outerHTML = '';

            if (!$sectionGeneral)
                document.querySelector('.form').appendChild(createGeneral());
            else
                document.querySelector('.form').appendChild($sectionGeneral);
            document.querySelector('input').focus();
        }
    }
    if (e.target.matches('#btn-event-general-before')) {
        // Antes de pasar al siguiente form, validar
        if (!validateEvent()) {
            $sectionGeneral = document.querySelector('.form-section-event').cloneNode(true);
            document.querySelector('.form-section-event').outerHTML = '';

            // console.log($sectionEvent)
            if (!$sectionEvent)
                document.querySelector('.form').appendChild(createEvent());
            else
                document.querySelector('.form').appendChild($sectionEvent);
            document.querySelector('input').focus();
        }
    }
    if (e.target.matches('#btn-event-general')) {
        // Antes de pasar al siguiente form, validar
        if (!validateEvent()) {
            $sectionGeneral = document.querySelector('.form-section-event').cloneNode(true);
            document.querySelector('.form-section-event').outerHTML = '';

            if (!$sectionPagos)
                document.querySelector('.form').appendChild(createPagos());
            else
                document.querySelector('.form').appendChild($sectionPagos);
        }
    }
    if (e.target.matches('#btn-event-pagos-before')) {
        // Antes de pasar al siguiente form, validar
        if (!validateEvent()) {
            $sectionPagos = document.querySelector('.form-section-event').cloneNode(true);
            document.querySelector('.form-section-event').outerHTML = '';
            if (!$sectionGeneral)
                document.querySelector('.form').appendChild(createGeneral());
            else
                document.querySelector('.form').appendChild($sectionGeneral);
            document.querySelector('input').focus();
        }
    }

    // Botones de opciones en evento
    if (e.target.matches('#btn-options-event')) {
        let section = getSectionEvent();
        if (section === "general") {
            if (!validateEvent()) {
                $sectionGeneral = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';

                // console.log($sectionEvent)
                if (!$sectionEvent)
                    document.querySelector('.form').appendChild(createEvent());
                else
                    document.querySelector('.form').appendChild($sectionEvent);
            }
        }
        if (section === "pagos") {
            if (!validateEvent()) {
                $sectionPagos = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';
                if (!$sectionGeneral)
                    document.querySelector('.form').appendChild(createGeneral());
                else
                    document.querySelector('.form').appendChild($sectionEvent);
            }
        }
        document.querySelector('input').focus();
    }
    if (e.target.matches('#btn-options-general')) {
        let section = getSectionEvent();

        if (section === "event") {
            if (!validateEvent()) {
                // Despues de validar pasar al siguiente o mostrar los errores
                $sectionEvent = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';

                if (!$sectionGeneral)
                    document.querySelector('.form').appendChild(createGeneral());
                else
                    document.querySelector('.form').appendChild($sectionGeneral);
            }
        }
        if (section === "pagos") {
            if (!validateEvent()) {
                $sectionPagos = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';
                if (!$sectionGeneral)
                    document.querySelector('.form').appendChild(createGeneral());
                else
                    document.querySelector('.form').appendChild($sectionGeneral);
            }
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
                    if (!$sectionPagos)
                        document.querySelector('.form').appendChild(createPagos());
                    else
                        document.querySelector('.form').appendChild($sectionPagos);
                else document.querySelector('.form').appendChild(createGeneral());
            }
        }
        if (section === "general") {
            if (!validateEvent()) {
                $sectionGeneral = document.querySelector('.form-section-event').cloneNode(true);
                document.querySelector('.form-section-event').outerHTML = '';

                if (!$sectionPagos)
                    document.querySelector('.form').appendChild(createPagos());
                else
                    document.querySelector('.form').appendChild($sectionPagos);
            }
        }
    }

    // Botones para guardar el evento
    if (e.target.matches('#btn-event-pagos')) {

        console.log("Pagos")

        let ubicacion = "";
        if ($sectionEvent.querySelector('#eventPlaceSalon').checked &&
            $sectionEvent.querySelector('#eventPlaceJardin').checked) {
            ubicacion = "Salon/Jardin"
        } else if ($sectionEvent.querySelector('#eventPlaceSalon').checked) {
            ubicacion = "Salon"
        } else if ($sectionEvent.querySelector('#eventPlaceJardin').checked) {
            ubicacion = "Jardin"
        }

        let adeudoTotal = document.querySelector('.adeudo-total').textContent;
        let sesion = $sectionEvent.querySelector('#form-event-input-sesion').value;

        const $event = {
            FechaEvento: $sectionEvent.querySelector('#form-event-input-fecha').value,
            Sesion: !sesion ? '1999-01-01' : sesion,
            // Sesion: '2022-05-03',
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
            Croquis: $sectionGeneral.querySelector('#form-event-input-croquis').value,
            Mantel: $sectionGeneral.querySelector('#form-event-input-mantel').value,
            Servilleta: $sectionGeneral.querySelector('#form-event-input-servilleta').value,
            Cristaleria: $sectionGeneral.querySelector('#form-event-input-cristaleria').value,
            TipoMesa: $sectionGeneral.querySelector('#form-event-input-tipoMesas').value,
            TipoSilla: $sectionGeneral.querySelector('#form-event-input-tipoSillas').value,
            CasoEspecial: $sectionGeneral.querySelector('#form-event-input-casosEspeciales').value,
            CostoTotal: parseInt(document.querySelector('#form-event-input-totalPago').value),
            AbonoTotal: parseInt(adeudoTotal.substring(1, adeudoTotal.length)),
        }

        if (fetchAddEvent($event)) {
            $sectionEvent = "";
            $sectionGeneral = "";
            $sectionPagos = "";
            $sectionAddPagos = "";
            cancel();
        } else
            console.log("Error al agregar")

        // Aqui Enviamos la informacion
        console.log($event)
    }

    // Botones de para agregar pago
    if (e.target.matches('#btn-add-pago')) {
        document.querySelector('.form-section-event').outerHTML = '';
        document.querySelector('.form').appendChild(agregarPagos());
    }
    if (e.target.matches('#btn-pagos-cancel')) {
        document.querySelector('.form-section-event').outerHTML = '';
        document.querySelector('.form').appendChild(createPagos());
    }
    if (e.target.matches('#btn-pagos-create')) {
        if (!validateEvent()) {
            const $pago = {
                fechaPago: document.querySelector('form').fechaPago.value,
                cantidad: document.querySelector('form').cantidad.value,
                tipoPago: document.querySelector('form').tipoPago.value,
            }
            // Aqui Enviamos la informacion
            console.log($pago)
        }
    }

    // Cancel
    if (e.target.matches('#btn-event-cancel')) {
        cancel();
    }
})

document.addEventListener('change', e => {
    if (e.target.matches('#form-event-input-totalPago')) {
        calcularTotalAbono();
    }
})

function createEvent() {

    const $formSection = document.createElement('div');
    $formSection.classList.add('form-section-event');

    const $sectionRowOptions = document.createElement('div');
    $sectionRowOptions.innerHTML = craeteSectionRowOptions();

    const $formContentGroup = document.createElement('div');
    $formContentGroup.classList.add('form-content-group-grid-2');

    $formContentGroup.innerHTML = `
        <div class="form__group-grid">
            <label for="form-event-input-fecha">Fecha</label>
            <input id="form-event-input-fecha" type="date" name="fecha" value="" title="Ingresa la fecha del evento." data-required>
            <small class="form-error opacity">Error: Ingresa la fecha del evento.</small>
        </div>
        <div class="form__group-grid">
            <label for="form-event-input-sesion">Sesion</label>
            <input id="form-event-input-sesion" type="datetime-local" name="sesion" title="Ingresa la fecha y hora de sesion.">
            <small class="form-error opacity">Error: Ingresa la fecha y hora de sesion.</small>
        </div>
        <div class="form__group-grid">
            <label>Lugar</label>
            <div class="flex">
                <div>
                    <input id="eventPlaceSalon" type="checkbox" name="eventPlaceSalon">
                    <label for="eventPlaceSalon">Salon</label>
                </div>
                <div>
                    <input id="eventPlaceJardin" type="checkbox" name="eventPlaceJardin">
                    <label for="eventPlaceJardin">Jardin</label>
                </div>
            </div>
            <small id="eventPlaceError" class="form-error opacity">Error: Ingresa el lugar del evento.</small>
        </div>
        <div class="form__group-grid">
            <label for="form-event-input-evento">Evento</label>
            <input id="form-event-input-evento" type="String" name="evento" value="" title="Ingresa el tipo de evento." data-required>
            <small class="form-error opacity">Error: Ingresa el tipo de evento.</small>
        </div>
        <div class="form__group-grid form__group-grid-2">
            <label for="form-event-input-cliente">Cliente</label>
            <input id="form-event-input-cliente" type="String" name="cliente" value="" title="Ingresa el nombre del cliente." data-required>
            <small class="form-error opacity">Error: Ingresa el nombre del cliente.</small>
        </div>
        <div class="form__group-grid  form__group-grid-2">
            <label for="form-event-input-telefono">Telefono</label>
            <input id="form-event-input-telefono" type="number" name="phone">
            <small class="form-error opacity">Error: Agrega un telefono correcto</small>
        </div>
        <div class="form__group-grid form__group-grid-2 form__group-grid-large">
            <label for="form-event-input-ceremonia">Ceremonia Civil</label>
            <input id="form-event-input-ceremonia" type="String" name="ceremonia" value="" title="¿Habra ceremonia?">
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

function createGeneral() {

    const $formSection = document.createElement('div');
    $formSection.classList.add('form-section-event');

    const $sectionRowOptions = document.createElement('div');
    $sectionRowOptions.innerHTML = craeteSectionRowOptions();

    const $formContentGroup = document.createElement('div');
    $formContentGroup.classList.add('form-content-group-grid-2');

    $formContentGroup.innerHTML = `
        <div class="form__group-grid form__group-grid-middle">
            <label for="form-event-input-noPersonas">No. Personas</label>
            <input id="form-event-input-noPersonas" type="number" name="noPersonas" value="" title="Ingresa el numero de personas." data-required>
            <small class="form-error opacity">Error: Ingresa el numero de personas.</small>
        </div>

        <div class="form__group-grid form__group-grid-middle">
            <label for="form-event-input-noMeseros">No. Meseros</label>
            <input id="form-event-input-noMeseros" type="number" name="noMeseros" value="" title="Ingresa el numero de meseros." data-required>
            <small class="form-error opacity">Error: Ingresa el numero de meseros.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-hora">Hora</label>
            <input id="form-event-input-hora" type="time" name="hora" title="Ingresa la hora que inicia el evento.">
            <small class="form-error opacity">Error: Ingresa la hora que inicia el evento.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-horaCena">Hora Cena</label>
            <input id="form-event-input-horaCena" type="time" name="horaCena" title="Ingresa la hora de la cena.">
            <small class="form-error opacity">Error: Ingresa la hora de la cena.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-platillo">Platillo</label>
            <input id="form-event-input-platillo" type="String" name="platillo" value="" title="Ingresa el platillo para el evento.">
            <small class="form-error opacity">Error: Ingresa el platillo para el evento.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-alcohol">Alcohol</label>
            <input id="form-event-input-alcohol" type="String" name="alcohol" value="" title="Ingresa los datos para el alcohol.">
            <small class="form-error opacity">Error: Ingresa los datos para el alcohol.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-croquis">Croquis</label>
            <input id="form-event-input-croquis" type="file" name="croquis" title="Agrega la imagen del croquis.">
            <small class="form-error opacity">Error: Agrega la imagen del croquis.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-mantel">Mantel</label>
            <input id="form-event-input-mantel" type="text" name="mantel" title="Ingresa el tipo de mantel.">
            <small class="form-error opacity">Error: Ingresa el tipo de mantel.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-cristaleria">Cristaleria</label>
            <input id="form-event-input-cristaleria" type="text" name="cristaleria" title="Ingresa el tipo de cristaleria.">
            <small class="form-error opacity">Error: Ingresa el tipo de cristaleria.</small>
        </div>

        <div class="form__group-grid">
            <label for="form-event-input-servilleta">Servilleta</label>
            <input id="form-event-input-servilleta" type="text" name="servilleta" title="Ingresa el tipo de servilleta.">
            <small class="form-error opacity">Error: Ingresa el tipo de servilleta.</small>
        </div>

        <div class="form__group-grid form__group-grid-2 form__group-grid-middle">
            <label for="form-event-input-tipoMesas">Tipo de mesas</label>
            <input id="form-event-input-tipoMesas" type="String" name="tipoMesas" value="" title="Ingresa el tipo de mesas.">
            <small class="form-error opacity">Error: Ingresa el tipo de mesas.</small>
        </div>

        <div class="form__group-grid form__group-grid-2 form__group-grid-middle">
            <label for="form-event-input-tipoSillas">Tipo de sillas</label>
            <input id="form-event-input-tipoSillas" type="String" name="tipoSillas" value="" title="Ingresa el tipo de sillas.">
            <small class="form-error opacity">Error: Ingresa el tipo de sillas.</small>
        </div>

        <div class="form__group-grid form__group-grid-2 form__group-grid-large">
            <label for="form-event-input-casosEspeciales">Casos especiales</label>
            <textarea id="form-event-input-casosEspeciales" class="form__group-grid-2" rows="4" name="casosEspeciales" title="Agrega datos extras."></textarea>
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

function createPagos(data) {

    // data = [{
    //     id: 1,
    //     metodoPago: "Tarjeta",
    //     fecha: "12/12/2022",
    //     cantidad: "$40000.00"
    // }, {
    //     id: 1,
    //     metodoPago: "Tarjeta",
    //     fecha: "10/10/2022",
    //     cantidad: "$60000.00"
    // }]

    const $formSection = document.createElement('div');
    $formSection.classList.add('form-section-event');

    const $sectionRowOptions = document.createElement('div');
    $sectionRowOptions.innerHTML = craeteSectionRowOptions();

    // Agregamos tabla de pagos
    const $sectionTable = document.createElement('div');
    $sectionTable.classList.add('table__pagos');

    $sectionTable.innerHTML = `
        <button class="btn btn-right span-1-4"><b id="btn-add-pago">Agregar Pago</b></button>
    `;

    $sectionTable.innerHTML += `

    <p>No Pago</p>
    <p>Metodo de pago</p>
    <p>Fecha</p>
    <p class="text-align-right">Cantidad</p>`;

    if (data) {

        data.forEach(item => {
            $sectionTable.innerHTML += `

                    <p>${item.id}</p>
                    <p>${item.metodoPago}</p>
                    <p>${item.fecha}</p>
                    <p class="text-align-right abono">${item.cantidad}</p>
            `;
        });
    }

    $sectionTable.innerHTML += `
            <p></p>
            <p></p>
            <p class="text-align-right">Total</p>
            <p class="text-align-right abono-total"></p>

            <p></p>
            <p></p>
            <p class="text-align-right">Total Evento</p>
            <input id="form-event-input-totalPago" class="text-align-right input-total-pago" type="number" step="0.01" value="">

            <p></p>
            <p></p>
            <p class="text-align-right">Adeudo</p>
            <p class="text-align-right adeudo-total"></p>

    `;

    let buttons = `
        <button id="btn-event-pagos" class="btn btn-primary">Siguiente</button>
        <button id="btn-event-pagos-before" class="btn btn-cancel">Anterior</button>
        <button id="btn-event-cancel" class="btn btn-cancel">Cancelar</button>
    `;

    $formSection.appendChild($sectionRowOptions);
    $formSection.appendChild($sectionTable);
    $formSection.innerHTML += buttons;

    setTimeout(() => {
        calcularTotalAbono();
    }, 10)

    return $formSection;
}

function agregarPagos() {
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

        <div class="form__group-grid form__group-grid-middle">
            <label for="form-pago-input-tipoPago">Metodo de pago</label>
            <input id="form-pago-input-tipoPago" type="text" name="tipoPago" title="Ingresa el tipo de pago." data-required>
            <small class="form-error opacity">Error: Ingresa el tipo de pago.</small>
        </div>
    `;

    let buttons = `
        <button id="btn-pagos-create" class="btn btn-primary">Guardar Pago</button>
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
            <div><img id="btn-options-event" src="./app/assets/icon_salon_whitout_border.png" alt="1"/><small><b>Evento</b></small></div>
            <div><img id="btn-options-general" src="./app/assets/icon_salon_whitout_border.png" alt="2"/><small><b>General</b></small></div>
            <div><img id="btn-options-pagos" src="./app/assets/icon_salon_whitout_border.png" alt="3"/><small><b>Pagos</b></small></div>
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
            if (!error)
                item.focus();

            error = true;
        } else
            item.parentNode.querySelector('small').classList.add('opacity')
        // error
    });

    // Validando Entrada de evento
    let Evento = document.querySelector('#form-event-input-evento');
    if (Evento)
        if (Evento.value.trim().length < 3 || Evento.value.trim().length > 50) {
            Evento.parentNode.querySelector('small').textContent = "El evento debe tener entre 3 y 50 caracteres.";
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

    // Validando numero de meseros
    let NoMeseros = document.querySelector('#form-event-input-noMeseros');
    if (NoMeseros)
        if (NoMeseros.value > 250) {
            NoMeseros.parentNode.querySelector('small').textContent = "No puedes agregar mas de 255 meseros.";
            NoMeseros.parentNode.querySelector('small').classList.remove('opacity');
            if (!error)
                NoMeseros.focus();
            error = true;
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
    if (document.getElementById('btn-event-pagos'))
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

    console.log(total)
}

async function fetchAddEvent(event) {
    // console.log('Agregar');
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

        return true;

    } catch (e) {
        // console.log(e)
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}

async function cancel() {
    $sectionEvent = "";
    $sectionGeneral = "";
    $sectionPagos = "";
    $sectionAddPagos = "";

    const $root = document.getElementById("root");
    $root.innerHTML = ``;
    $root.appendChild(nav());
    let $sectionEventos = await sectionEventos();
    $root.appendChild($sectionEventos)
}
