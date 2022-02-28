'use strict';

export default function home() {
    const $main = document.createElement('main');

    $main.innerHTML = `
        <section class="section-header">
            <img class="header__img" src="app/assets/home.png" alt="Imagen first class">
            <div class="header__container">
                <p class="header__text"><span>First</span><br> <span>Class</span></p>
            </div>
        </section>

        <section class="section-home container">
            <button id="btn-home-formato" class="btn btn__home"><img class="btn__home-img" src="app/assets/formato2.1.png"
                    alt="icono del boton"><br> Formato</button>
            <button id="btn-home-evento" class="btn btn__home"><img class="btn__home-img" src="app/assets/evento.png" alt="icono del boton"><br>
                Eventos</button>
            <button id="btn-home-personal" class="btn btn__home"><img class="btn__home-img" src="app/assets/personal2.png"
                    alt="icono del boton"><br> Personal</button>
            <button id="btn-home-puestos" class="btn btn__home"><img class="btn__home-img" src="app/assets/mesero3.png" alt="icono del boton"><br>
                Puestos</button>
        </section>
    `;

    return $main;
}
