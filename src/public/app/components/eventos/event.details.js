'use strict';
import nav from '../nav.js';
import sectionEventos from './calendar.js';
import eventAdd from './eventos.forms.js';
import modalError from '../modal.error.js';
import modalConfirm from '../modal.confirm.js'
import {
    GetTxtMonth
} from './calendar.js';
import imprimirEvent from './event.pdf.js';


export default async function sectionDetailsEvent(id) {

    let data = await getById(id);
    data = data[0];
    // console.log(data);
    let pagos = await getPagosById(id);
    // console.log(pagos);

    const $main = document.createElement('main');

    const $divContainer = document.createElement('div');

    $divContainer.classList.add('container');

    const $details = document.createElement('div');
    $details.appendChild(drawDetails(data));
    $details.id="IdDetallesEvento";
    const $pays = document.createElement('div');
    $pays.appendChild(drawPayments(data,pagos));

    $divContainer.appendChild($details);
    $divContainer.appendChild($pays);

    $divContainer.innerHTML += `
    <button id="btn-event-editar" data-id=${id} class="btn btn-primary">Editar</button>
    <button id="btn-event-remover" data-id=${id} class="btn btn-danger">Eliminar</button>
    <button class="btn btn-cancel btn-cancel-event" type="submit">Cancelar</button>
`;
    $main.appendChild($divContainer);
    return $main;
}

async function getById(id) {
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

document.addEventListener('click', async e => {
    if (e.target.matches('.btn-cancel-event')) {

        const $root = document.getElementById("root");
        $root.innerHTML = ``;
        $root.appendChild(nav());
        let $sectionEventos = await sectionEventos();
        $root.appendChild($sectionEventos)
    }
    if (e.target.matches('#btn-event-editar')) {
        // console.log(e.target.dataset.id);
        const $root = document.getElementById("root");
        $root.innerHTML = ``;

        $root.appendChild(await eventAdd(e.target.dataset.id, null, 'edit'));

    }
    if (e.target.matches('#btn-event-remover')) {

        document.getElementById('root').appendChild(modalConfirm('¿Estas seguro de eliminar?', e.target.dataset.id));

    }
    if(e.target.matches('#btn-print-Details'))
    {
        console.log("click details")
        const $conteiner = document.createElement('div');
        $conteiner.appendChild(document.getElementById('IdDetallesEvento'));
        imprimirEvent($conteiner);
    }
})

async function fetchRemoveEvent(id) {
    try {
        let res = await fetch('http://localhost:3000/eventos/' + id, {
            method: 'DELETE',
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

function drawDetails(data)
{
    const $content = document.createElement('div');
    $content.classList.add('container');
    
    const $h2 = document.createElement('h2');
    $h2.innerHTML = 'DETALLES EVENTO';
    $h2.classList.add('h2');
    $content.appendChild($h2);

    const $event_details_head = document.createElement('div');
    $event_details_head.classList.add('details_head');

    const $btn_printAll = document.createElement('button');
    $btn_printAll.innerHTML = 'Imprimir completo';
    $btn_printAll.classList.add('btn_add-event')

    const $btn_printDetails = document.createElement('button');
    $btn_printDetails.innerHTML = 'Imprimir Detalles';
    $btn_printDetails.classList.add('btn_add-event')
    $btn_printDetails.id="btn-print-Details"

    $event_details_head.appendChild($btn_printAll);
    $event_details_head.appendChild($btn_printDetails);
    $content.appendChild($event_details_head);

    const $detailSection = document.createElement('section');
    $detailSection.classList.add('details_section');

    const $tipoEvento = document.createElement('h3');
    $tipoEvento.innerHTML = `${data.TipoEvento}`;
    $tipoEvento.classList.add('typeEvent');
    $detailSection.appendChild($tipoEvento);

    const $details1 = document.createElement('div');
    $details1.classList.add('details');

        /*Dando formato a los campos*/
        let fechaEvento = new Date(data.FechaEvento);
        fechaEvento = fechaEvento.getDate() + " de " + GetTxtMonth(fechaEvento.getMonth() + 1) + " de " + fechaEvento.getFullYear();
    
        let sesion = new Date(data.Sesion);
        sesion = sesion.getDate() + " de " + GetTxtMonth(sesion.getMonth() + 1) +
            " de " + sesion.getFullYear() + " a las " + sesion.getHours() + ":" + sesion.getMinutes();
    
        let hora = data.HoraInicio.substring(0, 5);
        let horacena = data.HoraCena.substring(0, 5);
        /*Fin de los formatos*/
        $details1.innerHTML = `
        <label class="lbldetail" >Fecha</label>
        <p class="eventdata">${fechaEvento}</p>
        <label class="lbldetail" >Ubicacion</label>
        <p class="eventdata">${data.Ubicacion}</p>
        <label class="lbldetail" >Cliente</label>
        <p class="eventdata">${data.Cliente}</p>
        <label class="lbldetail" >Telefono</label>
        <p class="eventdata">${data.Telefono}</p>
        <label class="lbldetail" >Hora</label>
        <p class="eventdata">${hora}</p>
        <label class="lbldetail" >Platillo</label>
        <p class="eventdata">${data.Platillo}</p>
        <label class="lbldetail" >NoPersonas</label>
        <p class="eventdata">${data.NoPersonas}</p>
        <label class="lbldetail" >Tipo de mesa</label>
        <p class="eventdata">${data.TipoMesa}</p>
        <label class="lbldetail" >Mantel</label>
        <p class="eventdata">${data.Mantel}</p>
        `
        const $details2 = document.createElement('div');
        $details2.classList.add('details');
    
        $details2.innerHTML = `
        <label class="lbldetail" >Sesion</label>
        <p class="eventdata">${sesion}</p>
        <label class="lbldetail" >Evento</label>
        <p class="eventdata">${data.TipoEvento}</p>
        <label class="lbldetail" >Ceremonia civil</label>
        <p class="eventdata">${data.CeremoniaCivil}</p>
        <label class="lbldetail" >Hora cena</label>
        <p class="eventdata">${horacena}</p>
        <label class="lbldetail" >Alcohol</label>
        <p class="eventdata">${data.Alcohol}</p>
        <label class="lbldetail" >NoMeseros</label>
        <p class="eventdata">${data.NoMeseros}</p>
        <label class="lbldetail" >Tipo silla</label>
        <p class="eventdata">${data.TipoSilla}</p>
        <label class="lbldetail" >Cristaleria</label>
        <p class="eventdata">${data.Cristaleria}</p>
        <label class="lbldetail" >Servilleta</label>
        <p class="eventdata">${data.Servilleta}</p>
        `
        const $croquis = document.createElement('div');
        $croquis.classList.add('croquis');
        $croquis.innerHTML = `
        <label class="lbldetail" >Croquis </label>
        <p class="eventdata">21-05-2022</p>
        <img class="img_croquis">
        `
        const $casosEspeciales = document.createElement('div');
        $casosEspeciales.classList.add('casosEspeciales');
        $casosEspeciales.innerHTML = `
        <label class="lbldetail" >Casos especiales </label>
        <p class="eventdata">${data.CasoEspecial}</p>
        `
    $detailSection.appendChild($details1);
    $detailSection.appendChild($details2);
    $detailSection.appendChild($croquis);
    $detailSection.appendChild($casosEspeciales);
    $content.appendChild($detailSection);

    return $content;
}

function drawPayments(data,pagos)
{
    const $content = document.createElement('div');
    const $PagosH3 = document.createElement('h3');
    $PagosH3.innerHTML = `Pagos`;
    $PagosH3.classList.add('typeEvent');

    const $sectionTable = document.createElement('div');
    $sectionTable.classList.add('table__pagos');

    $sectionTable.innerHTML = `
        <p>No Pago</p>
        <p>Metodo de pago</p>
        <p>Fecha</p>
        <p class="text-align-right">Cantidad</p>
    `;

    if (pagos) {

        let sumaAbonos = 0;
        pagos.forEach(item => {

            let fechaPago = new Date(item.FechaPago);
            fechaPago = fechaPago.getDate() + "/" + GetTxtMonth(fechaPago.getMonth() + 1) + "/" + fechaPago.getFullYear();

            $sectionTable.innerHTML += `
                <p>${item.NoAbono}</p>
                <p>${item.MetodoPago}</p>
                <p>${fechaPago}</p>
                <p class="text-align-right abono">$${item.Monto}</p>
            `
            sumaAbonos += parseInt(item.Monto);
        })
        let adeudototal = parseInt(data.CostoTotal) - sumaAbonos;
        $sectionTable.innerHTML += `
        <p></p>
        <p></p>
        <p class="text-align-right">Abono total</p>
        <p class="text-align-right abono-total">$${sumaAbonos}</p>

        <p></p>
        <p></p>
        <p class="text-align-right">Total Evento</p>
        <p class="text-align-right">$${data.CostoTotal}</p>

        <p></p>
        <p></p>
        <p class="text-align-right">Adeudo restante</p>
        <p class="text-align-right adeudo-total">$${adeudototal}</p>

`;
    }

    $content.appendChild($PagosH3);
    $content.appendChild($sectionTable);

    return $content;
}