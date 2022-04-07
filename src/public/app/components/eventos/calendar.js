'use strict';
// import { func } from './joi';
import eventAdd from './eventos.forms.js';
import eventDetails from './event.details.js';
import nav from '../nav.js';
import modalError from '../modal.error.js';

let FocusDate = new Date(Date.now());

export default async function sectionEventos() {

    let eventos = await get();

    const $main = document.createElement('main');
    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container');

    const $calendar_head = document.createElement('div');
    $calendar_head.classList.add('calendar__head');

    const $btn_addEvento = document.createElement('button');
    $btn_addEvento.innerHTML = 'Agregar Evento';
    $btn_addEvento.classList.add('btn_add-event')
    $btn_addEvento.setAttribute('id', 'btn_add-event');
    const $input_mes = document.createElement('input');
    $input_mes.id = "search_month";
    $input_mes.type = 'month';
    $input_mes.classList.add('calendar__input');

    const $img_lupa = document.createElement('figure');
    $img_lupa.innerHTML = `<img class='img__lupa' id="search" src='app/assets/Lupa.png'>`;
    $img_lupa.classList.add('figure__lupa')

    $calendar_head.appendChild($btn_addEvento);
    $calendar_head.appendChild($input_mes);
    $calendar_head.appendChild($img_lupa);

    const $calendar_control = document.createElement('div');
    $calendar_control.classList.add('calendar_control')

    const $leftarrow = document.createElement('figure');
    $leftarrow.innerHTML = `<i class="bi bi-chevron-left" id="btn-back"></i>`;
    $leftarrow.classList.add('btn-arrow');
    $calendar_control.appendChild($leftarrow);

    const $labelMonth = document.createElement('label')
    $labelMonth.classList.add('calendar-month');
    $labelMonth.id = 'lblMonth';
    $labelMonth.innerHTML = `${GetTxtMonth(FocusDate.getMonth()+1)} ${FocusDate.getFullYear()}`;
    $calendar_control.appendChild($labelMonth);

    const $rightarrow = document.createElement('figure');
    $rightarrow.innerHTML = `<i class="bi bi-chevron-right" id="btn-next"></i>`
    $rightarrow.classList.add('btn-arrow');
    $calendar_control.appendChild($rightarrow);

    $divContainer.appendChild($calendar_head);
    $divContainer.appendChild($calendar_control);
    $divContainer.appendChild(CreateCalendar(eventos, FocusDate).cloneNode(true));

    $divContainer.innerHTML += `
        <button class="btn btn-cancel btn-cancel-home" type="submit">Regresar</button>
    `;

    $main.appendChild($divContainer);
    return $main;
}

function CreateCalendar(data, date) {
    const $sectionCalendar = document.createElement('section');
    $sectionCalendar.id = 'calendar';

    $sectionCalendar.classList.add('calendar');
    const $domingo = document.createElement('label');
    $domingo.innerHTML = 'Domingo';
    const $lunes = document.createElement('label');
    $lunes.innerHTML = 'Lunes';
    const $martes = document.createElement('label');
    $martes.innerHTML = 'Martes';
    const $miercoles = document.createElement('label');
    $miercoles.innerHTML = 'Miércoles';
    const $jueves = document.createElement('label');
    $jueves.innerHTML = 'Jueves';
    const $viernes = document.createElement('label');
    $viernes.innerHTML = 'Viernes';
    const $sabado = document.createElement('label');
    $sabado.innerHTML = 'Sábado';

    $sectionCalendar.appendChild($domingo.cloneNode(true));
    $sectionCalendar.appendChild($lunes.cloneNode(true));
    $sectionCalendar.appendChild($martes.cloneNode(true));
    $sectionCalendar.appendChild($miercoles.cloneNode(true));
    $sectionCalendar.appendChild($jueves.cloneNode(true));
    $sectionCalendar.appendChild($viernes.cloneNode(true));
    $sectionCalendar.appendChild($sabado.cloneNode(true));

    // date = new Date("2022-7-1")
    let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let dia1 = new Date(date.setDate(1));
    let dayAtWeek = dia1.getDay() <= 7 ? dia1.getDay() : 0;
    //console.log(dia1);
    let monthdays = 1;
    for (let i = 0; i < 42; i++) {
        const $divday = document.createElement('div');
        if (i < dayAtWeek || i > daysInMonth + dayAtWeek - 1) {
            $divday.classList.add('emptyday');
        } else {
            $divday.classList.add('day');
            //monthdays+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
            $divday.innerHTML = `${monthdays} <br>`

            if (data)
                data.forEach(element => {
                    let jdate = new Date(element.FechaEvento);
                    jdate = jdate.getFullYear() + "/" + (jdate.getMonth() + 1) + "/" + jdate.getDate();
                    let sdate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + monthdays;
                    if (jdate == sdate) {
                        // console.log(jdate+" same "+sdate);
                        const $evento = document.createElement("button");
                        $evento.id = 'evento';
                        $evento.classList.add('btn_evento');
                        $evento.classList.add('btn');
                        $evento.dataset.id = element.ID;
                        $evento.dataset.Fecha = element.FechaEvento;
                        $evento.innerHTML = `${element.TipoEvento} <br> ${element.Ubicacion}`;
                        $divday.appendChild($evento.cloneNode(true));
                        // console.log(element)
                        data = data.filter((item) => item !== element);
                    }
                });
            monthdays++;
        }
        $sectionCalendar.appendChild($divday.cloneNode(true))
    }

    return $sectionCalendar;
}

async function get() {

    let month = FocusDate.getFullYear() + "-" + (FocusDate.getMonth() + 1) + "-01";
    try {
        let res = await fetch('http://localhost:3000/eventos/getMonth/' + month)

        if (!res.ok)
            throw (res);

        let data = await res.json()
        console.log(data.body);
        return data.body;
    } catch (e) {
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}

document.addEventListener('click', async e => {
    if (e.target.matches('#btn_add-event')) {
        // console.log('andosan')
        const $root = document.getElementById("root");
        $root.innerHTML = ``;

        $root.appendChild(await eventAdd());
    }
    if (e.target.matches('#btn-next')) {
        let $sectionCalendar = document.getElementById("calendar");
        FocusDate = UpdateDate(FocusDate.getDate(), (FocusDate.getMonth() + 2), FocusDate.getFullYear());
        //FocusDate = new Date(FocusDate.getFullYear()+"/"+(FocusDate.getMonth() + 1)+"/"+FocusDate.getDate());
        console.log(FocusDate);
        let eventos = await get();
        $sectionCalendar.innerHTML = CreateCalendar(eventos, FocusDate).innerHTML;
        let $date = document.getElementById("lblMonth");
        $date.innerHTML = `${GetTxtMonth(FocusDate.getMonth()+1)} ${FocusDate.getFullYear()}`
    }
    if (e.target.matches('#btn-back')) {
        let $sectionCalendar = document.getElementById("calendar");
        FocusDate = UpdateDate(FocusDate.getDate(), FocusDate.getMonth(), FocusDate.getFullYear());
        //FocusDate = new Date(FocusDate.getFullYear()+"/"+(FocusDate.getMonth()+1)+"/"+FocusDate.getDate());
        let eventos = await get();
        $sectionCalendar.innerHTML = CreateCalendar(eventos, FocusDate).innerHTML;
        let $date = document.getElementById("lblMonth");
        $date.innerHTML = `${GetTxtMonth(FocusDate.getMonth()+1)} ${FocusDate.getFullYear()}`
    }
    if (e.target.matches('#search')) {
        let input_mes = document.getElementById("search_month")
        let $sectionCalendar = document.getElementById("calendar");
        if (input_mes.value != '') {
            console.log(input_mes.value);
            FocusDate = new Date(input_mes.value);
            FocusDate.setDate(FocusDate.getDate() + 1);
        } else {
            FocusDate = new Date(Date.now());
        }
        let eventos = await get();
        $sectionCalendar.innerHTML = CreateCalendar(eventos, FocusDate).innerHTML;
        let $date = document.getElementById("lblMonth");
        $date.innerHTML = `${GetTxtMonth(FocusDate.getMonth()+1)} ${FocusDate.getFullYear()}`
    }
    if (e.target.matches('#evento')) {
        let id = e.target.dataset.id;
        const $root = document.getElementById("root");
        $root.innerHTML = ``;
        $root.appendChild(nav());

        $root.appendChild(await eventDetails(id));
    }
})

function UpdateDate(dia, mes, año) {
    if (mes == 0) {
        mes = 12;
        año -= 1;
    } else if (mes > 12) {
        mes = 1;
        año += 1;
    }

    return new Date(año + "/" + mes + "/" + dia)
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

export {
    GetTxtMonth
};
