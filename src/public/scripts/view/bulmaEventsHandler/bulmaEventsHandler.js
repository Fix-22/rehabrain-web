export const generateBulmaEventsHandler = (pubsub) => {
    const bulmaEventsHandler = {
        build: () => {
            pubsub.subscribe("modal-render", () => { // ogni volta che viene generata una modale viene rifatto il mapping per gestire i pulsanti per fare il toggole delle modali
                bulmaEventsHandler.mapModals();
            });
        },
        mapNavbar: () => {
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
        },
        mapModals: () => {
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

            // Add a click event on buttons to open a specific modal
            (document.querySelectorAll(".js-modal-trigger") || []).forEach((trigger) => {
                const modal = trigger.dataset.target;
                const target = document.getElementById(modal);
                
                trigger.addEventListener("click", () => {
                    openModal(target);
                    pubsub.publish(target.id + "-onopen");
                });
            });

            // Add a click event on various child elements to close the parent modal
            (document.querySelectorAll(".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .close, .deletePatient") || []).forEach((close) => {
                const target = close.closest(".modal");

                close.addEventListener("click", () => {
                    closeModal(target);
                    bulmaEventsHandler.mapModals();
                    pubsub.publish(target.id + "-onclose");
                });
            });

            // Add a keyboard event to close all modals
            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    closeAllModals();
                }
            });
        }
    }

    return bulmaEventsHandler;
};