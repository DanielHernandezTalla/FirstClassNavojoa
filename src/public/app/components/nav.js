export default function nav() {
    const $nav = document.createElement('nav');

    $nav.innerHTML = `
        <div class="nav__container">
            <div class="nav__logo">
                <span>First</span> Class
            </div>
            <div class="nav__details">
                <button id="button-nav" class="btn nav__btn">Daniel <i class="bi bi-gear-fill"></i></button>
                <ul id="nav-list" class="nav__list opacity">
                    <li id="btn-home-usuario">Usuarios</li>
                    <li>Ver Perfil</li>
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
        if ($navList.classList.contains('opacity'))
            $navList.classList.remove('opacity');
        else
            $navList.classList.add('opacity');
    }
});
