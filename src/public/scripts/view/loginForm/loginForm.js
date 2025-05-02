export const generateLoginForm = (presenter, parentElement, pubsub) => {
    let id;

    const loginForm = {
        build: (inputId) => {
            id = inputId;
        },
        render: () => {
            const html = `<div class="column is-half content" id="$ID">
                            <h1>Entra nell'area personale</h1>
                            <div class="field">
                                <p class="control has-icons-left">
                                <input class="input" type="email" placeholder="Email" id="$IDEmail">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                <input class="input" type="password" placeholder="Password" id="$IDPassword">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                                </p>
                            </div>
                            <div class="field has-text-centered">
                                <p class="control">
                                    <button type="button" class="button is-link" id="$IDSend">
                                        <span class="icon">
                                            <i class="fa-solid fa-right-to-bracket"></i>
                                        </span>
                                        <span>Entra</span>
                                    </button>
                                </p>
                            </div>
                            <p>Non sei registrato?</p>
                            <div class="field">
                                <p class="control">
                                    <a class="button is-link" href="#register">
                                        <span class="icon">
                                            <i class="fa-solid fa-user-plus"></i>
                                        </span>
                                        <span>Registrati</span>
                                    </a>
                                </p>
                            </div>
                            <div class="notification is-danger is-hidden" id="$IDError"></div>
                        </div>`.replaceAll("$ID", id);
            parentElement.innerHTML = html;

            document.getElementById(id + "Send").onclick = async () => {
                const email = document.getElementById(id + "Email").value;
                const password = document.getElementById(id + "Password").value;
                
                if (email && password && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    const result = await presenter.login(email, password);

                    if (result) {
                        pubsub.publish("loginForm-login-success", {email: email, password: password});
                        location.href = "#home";
                    }
                    else {
                        loginForm.displayError("Autenticazione fallita, dati errati.");
                    }
                }
                else {
                    loginForm.displayError("Autenticazione impossibile, dati non inseriti correttamente.");
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
        }
    };

    return loginForm;
};