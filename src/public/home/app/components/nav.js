export function Nav() {
    const $nav = document.createElement('nav');

    $nav.innerHTML = `
        <div class="nav__container">
            <div class="nav__logo">
                <span>First</span> Class
            </div>
            <div class="nav__date">
                Fecha: 25 Diciembre 2021
            </div>
        </div>
    `;

    return $nav;
}
