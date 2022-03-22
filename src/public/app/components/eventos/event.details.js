'use strict';
import eventAdd from './eventos.forms.js';
import modalError from '../modal.error.js';

export default async function sectionDetailsEvent(id){

    let evento = await getById();

    const main = document.createElement('main');
    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container');

    const $h2 = document.createElement('h2');
    $h2.innerHTML='DETALLES EVENTO';
    $h2.classList.add('h2');

    const event_details_head = document.createElement('div');

    const $btn_printAll = document.createElement('button');
    $btn_printAll.innerHTML = 'Imprimir completo';
    $btn_printAll.classList.add('btn_add-event')

    const $btn_printDetails = document.createElement('button');
    $btn_printDetails.innerHTML = 'Imprimir Detalles';
    $btn_printDetails.classList.add('btn_add-event')

    event_details_head.appendChild($btn_printAll);
    event_details_head.appendChild($btn_printDetails);
    $divContainer.appendChild(event_details_head);

    $main.appendChild($divContainer);
    return main;
}

async function getById()
{
    try{
        let res = await fetch('http://localhost:3000/eventos/'+ id+'/');

        if(!res.ok)
            throw (res);
        let data = await res.json();

        return data.body;

    }catch(e){
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
} 