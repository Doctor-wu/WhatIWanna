(function() {
    let span = document.querySelector('.head-date-span'),
        date = document.querySelector('.head-date');

    span.addEventListener("click", () => {
        let ev = document.createEvent('MouseEvents')
        ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        date.dispatchEvent(ev);
    });
    date.addEventListener("click", () => {
        console.dir(date);
    })
})()