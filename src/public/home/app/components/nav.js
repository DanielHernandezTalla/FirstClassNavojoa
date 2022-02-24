export function Nav() {
    const $nav = document.createElement('nav');

    $nav.innerHTML = `
        <nav>
            <div class="nav__container">
                <div class="nav__logo">
                    <span>First</span> Class
                </div>
                <div class="nav__details">
                    <!-- <i class="bi bi-gear-fill"></i> -->
                    <!-- <i class="bi bi-gear"></i> -->
                    <button id="button-nav" class="btn nav__btn">Daniel <i class="bi bi-gear-fill"></i></button>
                    <ul id="nav-list" class="nav__list nav__list-opacity">
                        <li>Usuarios</li>
                        <li>Ver Perfil</li>
                        <li>Cerrar Sesion</li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    return $nav;
}
