'use strict';

const {
    remote
} = require('electron');

const main = remote.require('./components/personal/personal.window.js');

document.addEventListener('DOMContentLoaded', async e => {
    let res = await main.getPersonal()
    console.log(res)
})
