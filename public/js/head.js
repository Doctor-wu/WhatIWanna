(function() {
    let date = document.querySelector('.date'),
        picker = document.querySelector('.head-date');

    date.firstElementChild.innerText = (new Date()).toLocaleDateString().replace(/\//g, "-");

    date.addEventListener("click", () => {
        // date.classList.toggle("slideDown");
        picker.classList.toggle("slideDown");
        setTimeout(() => {
            document.body.addEventListener("click", hideDate)
        }, 0);
    });

    function changeDate() {
        picker.classList.toggle("slideDown");
        date.innerText = this.value || (new Date()).toLocaleDateString().replace(/\//g, "-");
    }

    function hideDate(ev) {
        if (!picker.contains(ev.target)) {
            picker.classList.toggle("slideDown");
            document.body.removeEventListener("click", hideDate);
        }
    }

    picker.addEventListener("change", changeDate)

    picker.addEventListener("blur", changeDate)
})()