'use strict';
import nav from "./nav";

export default async function sectionPuestos()
{
    //let puestos = await get();

    const $main = document.createElement('main');

    const $divContainer = document.createElement('div');
    $divContainer.classList.add('container');

    const $h2 = document.createElement('h2');
    $h2.innerText='Lista de puestos';
    $h2.classList.add('h2');

    const $divRow = document.createElement('div');
    $divRow.classList.add('table_row-first');
    $divRow.innerHTML= `
    <p><b>Id</b></p>
    <p><b>Nombre</b></p>
    <p><b>Salario</b></p>`;

    $sectionTable.appendChild($divRow.cloneNode(true));

    $divRow.classList.remove('table_row-first');
    $divRow.classList.add('table_row');

    /* */


}