let navPerfil;

export function clearNav() {
    navPerfil = null;
}

export default function nav(id = null, data = null) {

    if (!navPerfil)
        navPerfil = createNav(id, data);

    return navPerfil;
}

function createNav(id = null, data = null) {

    // console.log('+++++++++++++++++++');
    // console.log(data);

    const $nav = document.createElement('nav');

    $nav.innerHTML = `
        <div class="nav__container">
            <div class="nav__logo">
                <span>First</span> Class
            </div>
            <div class="nav__details">
                <button id="button-nav" class="btn nav__btn">${data?data.Nombre:""} <i class="bi bi-gear-fill"></i></button>
                <ul id="nav-list" class="nav__list none">
                    <li id="btn-home-usuario">Usuarios</li>
                    <li id="btn-home-perfil" data-idPerfil="${id}">Ver Perfil</li>
                    <li id="btn-logout">Cerrar Sesión</li>
                </ul>
            </div>
        </div>
    `;
    return $nav;
}

document.addEventListener('click', e => {
    if (e.target.matches('#button-nav') || e.target.matches('#button-nav *')) {
        const $navList = document.getElementById('nav-list');
        if ($navList.classList.contains('none'))
            $navList.classList.remove('none');
        else
            $navList.classList.add('none');
    }
    if (!(e.target.matches('#button-nav') || e.target.matches('#button-nav *'))) {
        const $navList = document.getElementById('nav-list');
        if ($navList)
            $navList.classList.add('none');
    }
});
