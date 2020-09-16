import View from "../view.js";

let head = {
    name: "head",
    template: `<!-- head -->
    <header id="main-header">
        <section class="head">
            <img style="width: 2rem;height:2rem;" src="./source/img/avatar.jpg" alt="avatar" class="head-avatar">
            <div class="head-info">
                <h3 class="head-title">What I Wanna</h3>
                <span class="username">Doctorwu</span>
            </div>
        </section>
        <input type="date" class="head-date" style="display: block;">
        <section class="date">
            <span class="head-date-span"></span>
        </section>
    </header>`,
    scripts: [
        "./js/head.js"
    ]
};
head = new View(head);

export default head;