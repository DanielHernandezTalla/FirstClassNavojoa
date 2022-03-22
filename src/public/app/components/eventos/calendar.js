'use strict';

export default async function sectionEventos()
{
    let eventos = await get();
    const $main = document.createElement('main');

    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container');

    const $calendar_head = document.createElement('div');
    $calendar_head.classList.add('calendar__head');

    const $btn_addEvento = document.createElement('button'); 
    $btn_addEvento.innerHTML='Agregar';
    $btn_addEvento.classList.add('btn_add-event')
    const $input_mes = document.createElement('input');
    $input_mes.type = 'month';
    $input_mes.classList.add('calendar__input');

    const $img_lupa = document.createElement('figure');
    $img_lupa.innerHTML = `<img class='img__lupa' src='app/assets/Lupa.png'>`;
    $img_lupa.classList.add('figure__lupa')

    $calendar_head.appendChild($btn_addEvento);
    $calendar_head.appendChild($input_mes);
    $calendar_head.appendChild($img_lupa);

    const $calendar_control = document.createElement('div');
    $calendar_control.classList.add('calendar_control')

    const $leftarrow = document.createElement('figure');
    $leftarrow.innerHTML=`<i class="bi bi-chevron-left"></i>`
    $leftarrow.classList.add('btn-arrow');
    $calendar_control.appendChild($leftarrow);

    const $labelMonth = document.createElement('label')
    $labelMonth.innerHTML=`Marzo`
    $calendar_control.appendChild($labelMonth);

    const $rightarrow = document.createElement('figure');
    $rightarrow.innerHTML=`<i class="bi bi-chevron-right"></i>`
    $rightarrow.classList.add('btn-arrow');
    $calendar_control.appendChild($rightarrow);

    $divContainer.appendChild($calendar_head);
    $divContainer.appendChild($calendar_control);
    $divContainer.appendChild(CreateCalendar(eventos,new Date(Date.now())).cloneNode(true));
    
    $main.appendChild($divContainer);
    return $main;
}

function CreateCalendar(data,date)
{
    const $sectionCalendar = document.createElement('section');
    $sectionCalendar.classList.add('calendar');
    const $domingo = document.createElement('label');
    $domingo.innerHTML = 'Domingo';
    const $lunes = document.createElement('label');
    $lunes.innerHTML = 'Lunes';
    const $martes = document.createElement('label');
    $martes.innerHTML = 'Martes';
    const $miercoles = document.createElement('label');
    $miercoles.innerHTML = 'Miercoles';
    const $jueves = document.createElement('label');
    $jueves.innerHTML = 'Jueves';
    const $viernes = document.createElement('label');
    $viernes.innerHTML = 'Viernes';
    const $sabado = document.createElement('label');
    $sabado.innerHTML = 'Sabado';

    
    $sectionCalendar.appendChild($domingo.cloneNode(true));
    $sectionCalendar.appendChild($lunes.cloneNode(true));
    $sectionCalendar.appendChild($martes.cloneNode(true));
    $sectionCalendar.appendChild($miercoles.cloneNode(true));
    $sectionCalendar.appendChild($jueves.cloneNode(true));
    $sectionCalendar.appendChild($viernes.cloneNode(true));
    $sectionCalendar.appendChild($sabado.cloneNode(true));

   date = new Date("2022-4-1")
    let daysInMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    let dia1 = new Date(date.setDate(1));
    let dayAtWeek = dia1.getDay()<=7?dia1.getDay():0;
    console.log(dia1);
    let monthdays=1;
    for(let i=0;i<42;i++)
    {
        const $divday = document.createElement('div');
        if(i<dayAtWeek || i>daysInMonth+dayAtWeek-1){
            $divday.classList.add('emptyday');
        }else{
            $divday.classList.add('day');
            //monthdays+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
            $divday.innerHTML=`${monthdays} <br>`
            
            data.forEach(element => {
                let jdate = new Date(element.FechaEvento);
                jdate = jdate.getFullYear()+"/"+(jdate.getMonth()+1)+"/"+jdate.getDate();
                let sdate =date.getFullYear()+"/"+(date.getMonth()+1)+"/"+monthdays;
                if(jdate==sdate)
                {
                    // console.log(jdate+" same "+sdate);
                    const $evento = document.createElement("button");
                    $evento.classList.add('btn_evento');
                    $evento.classList.add('btn');
                    $evento.dataset.id=element.ID;
                    $evento.dataset.Fecha=element.FechaEvento;
                    $evento.innerHTML=`${element.TipoEvento} <br> ${element.Ubicacion}`;
                    $divday.appendChild($evento.cloneNode(true));
                    console.log(element)
                    data = data.filter((item)=>item!==element);
                }
            });
            monthdays++;
        }
        $sectionCalendar.appendChild($divday.cloneNode(true))
    }

    return $sectionCalendar;
}

async function get()
{
    try{
        let res = await fetch('http://localhost:3000/eventos')

        if(!res.ok)
            throw (res);
        
        let data = await res.json()

        return data.body;
      }
      catch(e)
      {
         const $root = document.getElementById("root");
         $root.appendChild(await modalError(e));
         return null;
      }
}