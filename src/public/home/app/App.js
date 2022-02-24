'use strict';

import {
    Nav
} from './components/nav.js'

import sectionPersonal from './components/personal.js'

export function App() {

    const $root = document.getElementById("root");

    $root.innerHTML = ``

    $root.appendChild(Nav())
    $root.appendChild(sectionPersonal())
}
