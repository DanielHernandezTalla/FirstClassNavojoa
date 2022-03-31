'use strict';
import nav from './nav.js';
import home from './home.js';
import modalError from './modal.error.js';

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

document.addEventListener('submit', async e => {
    const $root = document.getElementById("root");
    if (e.target.matches("#form-login")) {
        e.preventDefault();

        const user = {
            name: e.target.user.value,
            password: e.target.password.value
        }

        let res = await loginFetch(user);

        // console.log(res)

        if (res.result === -1) {
            e.target.user.value = '';
            e.target.user.focus();
            e.target.password.value = '';
            const $password = e.target.password;

            if ($password.parentNode.querySelector('small')) return;

            const $small = document.createElement('small');
            $small.textContent = 'Usuario o contraseña incorrecto';

            $password.parentNode.appendChild($small);

        } else {
            let user = await getById(res.result)
            $root.innerHTML = ``
            $root.appendChild(nav(res.result, user));
            $root.appendChild(home());
        }
    }
});

document.addEventListener('click', e => {
    const $root = document.getElementById("root");
    if (e.target.matches('#btn-logout')) {
        $root.innerHTML = ``
        $root.appendChild(login());
    }
})

async function loginFetch(user) {
    try {
        let res = await fetch(`http://localhost:3000/usuarios/login?name=${user.name}&password=${user.password}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!res.ok)
            throw (res);

        let data = await res.json()
        // console.log(data);
        return data.body[0];

    } catch (e) {
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}

async function getById(id) {
    try {
        let res = await fetch('http://localhost:3000/personal/' + id);

        if (!res.ok)
            throw (res);

        let data = await res.json()
        return data.body[0];

    } catch (e) {
        // console.error(e);
        const $root = document.getElementById("root");
        $root.appendChild(await modalError(e));
        return null;
    }
}
