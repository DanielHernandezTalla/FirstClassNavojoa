'use strict';
import nav from './nav.js';
import home from './home.js';
export default function login() {
    const $main = document.createElement('main');

    $main.innerHTML = `
        <div class="container-lg">
            <img class="img-lg" src="app/assets/login.png" alt="Imagen bonita del first class">
            <!-- <h2 class="page-header"></h2> -->
            <div class="form-content">
                <form id="form-login" class="form">
                    <div class="form__group">
                        <label for="user">Usuario</label>
                        <input type="text" name="user">
                    </div>
                    <div class="form__group">
                        <label for="password">Contraseña</label>
                        <input type="password" name="password">
                    </div>
                    <button class="btn btn-primary-lg" type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    `;
    return $main;
}

document.addEventListener('submit', e => {
    const $root = document.getElementById("root");
    if (e.target.matches("#form-login")) {
        e.preventDefault();
        $root.innerHTML = ``
        $root.appendChild(nav());
        $root.appendChild(home());
    }
});

document.addEventListener('click', e => {
    const $root = document.getElementById("root");
    if (e.target.matches('#btn-logout')) {
        $root.innerHTML = ``
        $root.appendChild(login());
    }
})
