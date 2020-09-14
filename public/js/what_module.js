(function() {
    let whatList = document.querySelector('.what-list');
    whatList.addEventListener('click', function(ev) {
        let listItem = ev.path.find(p => p.className && p.className.includes("what-list-item"));
        if (listItem) {
            if (!listItem.className.includes("active")) {
                listItem.classList.add("active");
            } else {
                if (ev.target.classList.contains("collapse")) {
                    listItem.classList.remove("active");
                }
            }
        }
    })
})()