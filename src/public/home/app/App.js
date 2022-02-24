'use strict';

import {
    Nav
} from './components/nav.js'

export function App() {

    const $root = document.getElementById("root");

    $root.innerHTML = ``

    $root.appendChild(Nav())


    $root.innerHTML += `
    <h1>Hola mundo desde la casita 🏘!!</h1>

    <button id="personal">Personal</button>
    <button id="puestos">Puestos</button>
    `;
}
