export const generateRegisterForm = (presenter, parentElement, pubsub) => {
    let id;

    const registerForm = {
        build: (inputId) => {
            id = inputId;
        },
        render: () => {
            const html = `<div class="column is-half content" id="$ID">
                            <h1>Registrati a RehaBrain</h1>
                            <label class="label">Nome</label>
                            <div class="field">
                                <p class="control has-icons-left">
                                <input class="input" type="email" placeholder="Nome" id="$IDName">
                                <span class="icon is-small is-left">
                                    <i class="fa-solid fa-address-card"></i>
                                </span>
                                </p>
                            </div>
                            <label class="label">Cognome</label>
                            <div class="field">
                                <p class="control has-icons-left">
                                <input class="input" type="email" placeholder="Cognome" id="$IDSurname">
                                <span class="icon is-small is-left">
                                    <i class="fa-solid fa-address-card"></i>
                                </span>
                                </p>
                            </div>
                            <label class="label">Email</label>
                            <div class="field">
                                <p class="control has-icons-left">
                                <input class="input" type="email" placeholder="Email" id="$IDEmail">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                </p>
                            </div>
                            <div class="field has-text-centered">
                                <p class="control">
                                    <button type="button" class="button is-link" id="$IDSend">
                                        <span class="icon">
                                            <i class="fa-solid fa-user-plus"></i>
                                        </span>
                                        <span>Registrati</span>
                                    </button>
                                </p>
                            </div>
                            <p>Sei già registrato?</p>
                            <div class="field">
                                <p class="control">
                                    <a class="button is-link" href="#login">
                                        <span class="icon">
                                            <i class="fa-solid fa-right-to-bracket"></i>
                                        </span>
                                        <span>Entra</span>
                                    </a>
                                </p>
                            </div>
                            <div class="notification is-danger is-hidden" id="$IDError"></div>
                            <div class="notification is-success is-hidden" id="$IDSuccess"></div>
                        </div>`.replaceAll("$ID", id);
            parentElement.innerHTML = html;

            document.getElementById(id + "Send").onclick = async () => {
                const name = document.getElementById(id + "Name").value;
                const surname = document.getElementById(id + "Surname").value;
                const email = document.getElementById(id + "Email").value;
                
                if (name && surname && email && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    const result = await presenter.register(name, surname, email);

                    if (result) {
                        registerForm.displayError("");
                        registerForm.displaySuccess("La registrazione è andata a buon fine, controlla la tua email e fai il login.");
                    }
                    else {
                        registerForm.displaySuccess("");
                        registerForm.displayError("Registrazione fallita, dati errati.");
                    }
                }
                else {
                    registerForm.displaySuccess("");
                    registerForm.displayError("Registrazione impossibile, dati non inseriti correttamente.");
                }
            };
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

    return registerForm;
};