'use strict';

import login from './components/login.js';
import Router from './components/router.js';

export async function App() {

    const $root = document.getElementById("root");

    $root.innerHTML = ``;

    $root.appendChild(login());

    Router();
    // $root.appendChild(Nav())
    // $root.appendChild(home())
    // $root.appendChild(sectionPersonal())
}
