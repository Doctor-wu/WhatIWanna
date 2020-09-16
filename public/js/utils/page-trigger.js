export function Trigger(options = {}) {
    this.options = options;
    this.init();
    watchHash.call(this);
    console.log(this);
}

Trigger.prototype.init = function() {
    this.pages = this.options.pages || [];
    this.matcher = matcher(this.pages);
}

function matcher(pages) {

    function match(hash) {}


    return {
        match
    }
}


function watchHash() {
    window.addEventListener("hashchange", (ev) => {
        console.log(ev, this);
    })
}