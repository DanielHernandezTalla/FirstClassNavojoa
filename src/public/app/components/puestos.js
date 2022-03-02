'use strict';
import modalConfirm from './modal.confirm.js';
import modalError from './modal.error.js';

export default async function sectionPuestos()
{
    let puestos = await get();

    const $main = document.createElement('main');
    //console.log("Conectado");

    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container');

    const $h2 = document.createElement('h2');
    $h2.innerText='Lista de puestos';
    $h2.classList.add('h2');

    const $sectionTable = document.createElement('section');
    $sectionTable.classList.add("table");

    const $divRow = document.createElement('div');
    $divRow.classList.add('table_row-first');
    $divRow.innerHTML= `
    <p><b>Id</b></p>
    <p><b>Nombre</b></p>
    <p><b>Salario</b></p>`;

    $sectionTable.appendChild($divRow.cloneNode(true));
/*
    $divRow.classList.remove('table_row-first');
    $divRow.classList.add('table_row');

    if (puestos)
    personal.forEach(element => {
        $divRow.dataset.id = element.ID;
        $divRow.dataset.table = "puestos";
        $divRow.innerHTML = `
        <p>${element.ID}</p>
        <p>${element.Nombre}</p>
        <p>${element.salario}</p>
    `;
        $sectionTable.appendChild($divRow.cloneNode(true));
    });

        $divRow.classList.remove('table__row')
        $divRow.innerHTML = `
        <button id="btn-personal-add-view" class="table__button"><i class="bi bi-plus-lg"></i>NUEVO</button>
        `
        $sectionTable.appendChild($divRow.cloneNode(true));

        const $sectionModal = document.createElement('section');
        $sectionModal.classList.add('section-modal');
        $sectionModal.classList.add('opacity');

        const $ulModal = document.createElement('ul');

        $ulModal.innerHTML=`
        <li class="btn btn-modal-edit"><i class="bi bi-pencil-square"></i>Editar</li>
        <li class="btn btn-modal-delete"><i class="bi bi-trash"></i>Eliminar</li>
    `;

    $sectionModal.appendChild($ulModal);
*/
    $divContainer.appendChild($h2);
    $divContainer.appendChild($sectionTable);
   // $divContainer.appendChild($sectionModal);

    $main.appendChild($divContainer);
    
    return $main;
}
/*
document.addEventListener("click",async e=>{
    const $root = document.getElementById("root");

    if(e.target.matches('#brn-puesto-add-view')){
        $root.innerHTML='';
        $root.appendChild(await puestosAdd());
    }

    if(e.target.matches('btn-modal-edit')||e.target.matches('.btn-modal-edit *')){
        const $modal = document.querySelector('.section-modal');
        let id = $modal.dataset.id;
        let table = $modal.dataset.table;

        $root.innerHTML=``;
        $root.appendChild(await personalAdd(id,table,"edit"));
    }

    if(e.target.matches('.btn-modal-delete')||e.target.matches('.btn-modal-delete *')){
        $root.appendChild(modalConfirm());
    }
    
    const $modal =document.querySelector('.section-modal');
    if($modal){
        if(!$modal.classList.contains('opacity')){
            $modal.classList.add('opacity');
            $modal.style.top= null;
            $modal.style.let=null;
        }
    }
});*/

document.addEventListener('contextmenu',e=>{
    e.preventDefault();
    if (e.target.matches('.table__row') || e.target.matches('.table__row *')) {
        let id = e.target.dataset.id;
        let table = e.target.dataset.table;

        if (!id) {
            id = e.target.parentNode.dataset.id;
            table = e.target.parentNode.dataset.table;
        }

        const $modal = document.querySelector(".section-modal");
        $modal.dataset.id = id;
        $modal.dataset.table = table;
        $modal.style.top = e.clientY + "px";
        $modal.style.left = e.clientX + "px";
        $modal.classList.remove('opacity');
    }
})
    /* */

    async function get() {
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


