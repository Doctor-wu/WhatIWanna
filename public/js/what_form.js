import { Drag } from './drag.js';

(function() {
    let formWrap = document.querySelector(".what-form-wrap");
    let close = document.querySelector('.close-what-form');
    let whatList = document.querySelector('.what-list');
    let popDrag = new Drag('.add-schedule', {
        limitYT: 10,
        limitYB: 17,
        snapX: ".25rem"
    });
    let submit = document.querySelector(".what-submit");
    let popOut = popDrag.el;

    popOut.addEventListener('click', () => {
        formWrap.classList.remove("hide");
        whatList.classList.add("hide");
    })
    close.addEventListener('click', () => {
        formWrap.classList.add("hide");
        whatList.classList.remove("hide");
    });



    submit.addEventListener("click", (ev) => {
        ev.preventDefault();
    })
})()