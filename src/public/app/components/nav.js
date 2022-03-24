let navPerfil;
export default function nav(id = null) {

    if (!navPerfil)
        navPerfil = createNav(id)

    return navPerfil;
}

function createNav(id = null) {
    const $nav = document.createElement('nav');

    $nav.innerHTML = `
        <div class="nav__container">
            <div class="nav__logo">
                <span>First</span> Class
            </div>
            <div class="nav__details">
                <button id="button-nav" class="btn nav__btn">Daniel <i class="bi bi-gear-fill"></i></button>
                <ul id="nav-list" class="nav__list none">
                    <li id="btn-home-usuario">Usuarios</li>
                    <li id="btn-home-perfil" data-idPerfil="${id}">Ver Perfil</li>
                    <li id="btn-logout">Cerrar Sesion</li>
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
