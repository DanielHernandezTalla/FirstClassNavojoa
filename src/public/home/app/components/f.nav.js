'use strict'

// const $buttonNav = document.getElementById('button-nav');

document.addEventListener('click', e => {
    if (e.target.matches('#button-nav')) {
        const $navList = document.getElementById('nav-list');
        if ($navList.classList.contains('nav__list-opacity'))
            $navList.classList.remove('nav__list-opacity');
        else
            $navList.classList.add('nav__list-opacity');
    }
});
