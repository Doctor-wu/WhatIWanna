import { Drag } from './drag.js';

(function() {
    let formWrap = document.querySelector(".what-form-wrap");
    let close = document.querySelector('.close-what-form');
    let popOut = document.querySelector(".add-schedule");
    popOut.addEventListener('click', () => {
        formWrap.classList.remove("hide");
    })
    close.addEventListener('click', () => {
        formWrap.classList.add("hide");
    });
})()