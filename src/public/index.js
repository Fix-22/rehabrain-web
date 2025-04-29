import { generatePubSub } from "/scripts/pubsub/pubsub.js";
import { generateNavigator } from "/scripts/navigator/navigator.js";
import { generateMiddleware } from "/scripts/middleware/middleware.js";
import { generateActivitiesList } from "/scripts/GUI/activitiesList/activitiesList.js";

const pubsub = generatePubSub();

generateNavigator(document.getElementById("pages"));

const middleware = generateMiddleware();

const activitiesListContainer = document.getElementById("activtiesListContainer");

const activitiesList = generateActivitiesList(activitiesListContainer, pubsub);
activitiesList.build("activitiesList", [{title: "prova", hasDifficulty: true}, {title: "prov2a", hasDifficulty: false}]);
activitiesList.render();
pubsub.subscribe("activitiesListaddButton-pressed", activity => {
    console.log(activity);
});

const ps = await middleware.getAllPatients("prova@gmail.com", "2006");
console.log(ps);
ps[2].Surname = "a"

console.log(await middleware.editPatient(ps[2], "prova@gmail.com", "2006"))

// gestione eventi per Bulma
document.addEventListener("DOMContentLoaded", () => {
    // Functions to open and close a modal
    function openModal(el) {
        el.classList.add("is-active");
    }

    function closeModal(el) {
        el.classList.remove("is-active");
    }

    function closeAllModals() {
        (document.querySelectorAll(".modal") || []).forEach((modal) => {
            closeModal(modal);
        });
    }

    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            // Get the target from the "data-target" attribute
            const target = document.getElementById(el.dataset.target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            target.classList.toggle('is-active');
        });
    });

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".js-modal-trigger") || []).forEach((trigger) => {
        const modal = trigger.dataset.target;
        const target = document.getElementById(modal);

        trigger.addEventListener("click", () => {
            openModal(target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll(".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .modal-card-body .button") || []).forEach((close) => {
        const target = close.closest(".modal");

        close.addEventListener("click", () => {
            closeModal(target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});

// gestione testo footer
document.getElementById("footerText").innerHTML = '© ' + new Date().getFullYear() + ' Simone Cecire. Il codice sorgente è protetto da licenza <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache-2.0</a>. I contenuti del sito sono protetti da licenza <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>.';