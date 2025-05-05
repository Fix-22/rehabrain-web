export const generatePersonalInfoModal = (presenter, parentElement, pubsub) => {
    let id, name, surname, email;

    const personalInfoModal = {
        build: async (inputId) => {
            id = inputId;

            if (sessionStorage.getItem("credentials")) {
                const user = await presenter.getAccount();
                name = user.name;
                surname = user.surname;
                email = user.email;
                personalInfoModal.render();
            }

            pubsub.subscribe("view-login-success", async credentials => {
                const user = await presenter.getAccount();
                name = user.name;
                surname = user.surname;
                email = user.email;
                personalInfoModal.render();
            });
        },
        render: () => {
            let html = (`<div class="modal" id="$ID">
                            <div class="modal-background close"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Informazioni personali</p>
                                    <button class="delete close" aria-label="close"></button>
                                </header>
                                <section class="modal-card-body">
                                    <div class="field">
                                        <p class="control has-icons-left">
                                            <input class="input" type="email" placeholder="Nome" id="$IDName" value="` + name + `">
                                            <span class="icon is-small is-left">
                                                <i class="fa-solid fa-address-card"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <p class="control has-icons-left">
                                            <input class="input" type="email" placeholder="Cognome" id="$IDSurname" value="` + surname + `">
                                            <span class="icon is-small is-left">
                                                <i class="fa-solid fa-address-card"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <p class="control has-icons-left">
                                            <input class="input" type="email" placeholder="Email" id="$IDEmail" disabled value="` + email + `">
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-envelope"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="field has-text-centered">
                                        <p class="control">
                                            <button type="button" class="button is-danger" id="$IDDeleteAccount">
                                                <span class="icon">
                                                    <i class="fa-solid fa-user-xmark"></i>
                                                </span>
                                                <span>Elimina account</span>
                                            </button>
                                        </p>
                                    </div>
                                    <div class="notification is-danger is-hidden" id="$IDError"></div>
                                    <div class="notification is-success is-hidden" id="$IDSuccess"></div>
                                </section>
                                <footer class="modal-card-foot">
                                    <div class="buttons">
                                        <button type="button" class="button is-success" id="$IDSave">
                                            <span class="icon">
                                                <i class="fa-solid fa-floppy-disk"></i>
                                            </span>
                                            <span>Salva</span>
                                        </button>
                                        <button type="button" class="button close" id="$IDClose">
                                            <span class="icon">
                                                <i class="fa-solid fa-xmark"></i>
                                            </span>
                                            <span>Chiudi</span>
                                        </button>
                                    </div>
                                </footer>
                            </div>
                        </div>`).replaceAll("$ID", id);
            
            parentElement.innerHTML = html;

            pubsub.publish("modal-render");
            
            document.getElementById(id + "DeleteAccount").onclick = async () => {
                const result = await presenter.deleteAccount();
                
                if (result) {
                    name = null;
                    surname = null;
                    email = null;
                    pubsub.publish("view-logout-success");
                }
                else {
                    personalInfoModal.displayError("Eliminazione account fallita, i dati sono errati.");
                    personalInfoModal.displaySuccess("");
                }
            };

            document.getElementById(id + "Save").onclick = async () => {
                const name = document.getElementById(id + "Name").value;
                const surname = document.getElementById(id + "Surname").value;

                if (name && surname) {
                    const result = await presenter.editAccount(name, surname);

                    if (result) {
                        personalInfoModal.displayError("");
                        personalInfoModal.displaySuccess("Account aggiornato.");
                    }
                    else {
                        personalInfoModal.displayError("Aggiornamento account fallito, i dati sono errati.");
                        personalInfoModal.displaySuccess("");
                    }
                }
                else {
                    personalInfoModal.displayError("Impossibile aggiornare l'account, i dati non sono validi.");
                    personalInfoModal.displaySuccess("");
                }
            };

            document.querySelectorAll(".close").forEach(e => {
                e.onclick = async () => {
                    const user = await presenter.getAccount();
                    name = user.name;
                    surname = user.surname;
                    email = user.email;
                    personalInfoModal.render();
                    pubsub.publish("modal-close");
                };
            });

            document.addEventListener("keydown", async (event) => {
                if (event.key === "Escape") {
                    const user = await presenter.getAccount();
                    name = user.name;
                    surname = user.surname;
                    email = user.email;
                    personalInfoModal.render();
                    pubsub.publish("modal-close");
                }
            });
        },
        displayError: (error) => {
            const errorDisplayer = document.getElementById(id + "Error");

            if (error) {
                errorDisplayer.innerText = error;
                errorDisplayer.classList.remove("is-hidden");
            }
            else {
                errorDisplayer.innerText = "";
                errorDisplayer.classList.add("is-hidden");
            }
        },
        displaySuccess: (message) => {
            const successDisplayer = document.getElementById(id + "Success");

            if (message) {
                successDisplayer.innerText = message;
                successDisplayer.classList.remove("is-hidden");
            }
            else {
                successDisplayer.innerText = "";
                successDisplayer.classList.add("is-hidden");
            }
        }
    };

    return personalInfoModal;
};