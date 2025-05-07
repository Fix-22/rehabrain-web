export const generatePatientCreationModal = (presenter, parentElement, pubsub) => {
    let id;

    const patientCreationModal = {
        build: (inputId) => {
            id = inputId;

            pubsub.subscribe("addPatientButton", () => {

            });
        },
        render: () => {
            let html = (`<div class="modal" id="$ID">
                            <div class="modal-background close"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Crezione paziente<p>
                                    <button class="delete close" aria-label="close"></button>
                                </header>
                                <section class="modal-card-body">
                                    <label class="label">Nome</label>
                                    <div class="field">
                                        <p class="control has-icons-left">
                                            <input class="input" type="email" placeholder="Nome" id="$IDName">
                                            <span class="icon is-small is-left">
                                                <i class="fa-solid fa-hospital-user"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <label class="label">Cognome</label>
                                    <div class="field">
                                        <p class="control has-icons-left">
                                            <input class="input" type="email" placeholder="Cognome" id="$IDSurname">
                                            <span class="icon is-small is-left">
                                                <i class="fa-solid fa-hospital-user"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <label class="label">Età</label>
                                    <div class="field">
                                        <p class="control has-icons-left">
                                            <input class="input" type="number" placeholder="Age" id="$IDAge">
                                            <span class="icon is-small is-left">
                                                <i class="fa-solid fa-hospital-user"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <label class="label">Note</label>
                                    <div class="field">
                                        <textarea class="textarea" placeholder="Note" id="$IDNotes" rows="10"></textarea>
                                    </div>
                                    <div class="notification is-danger is-hidden" id="$IDError"></div>
                                    <div class="notification is-success is-hidden" id="$IDSuccess"></div>
                                </section>
                                <footer class="modal-card-foot">
                                    <div class="buttons">
                                        <button type="button" class="button is-primary" id="$IDSave">
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

            document.getElementById(id + "Save").onclick = async () => {
                const name = document.getElementById(id + "Name").value;
                const surname = document.getElementById(id + "Surname").value;
                const age = document.getElementById(id + "Age").value;
                const notes = document.getElementById(id + "Notes").value;

                if (name && surname && age) {
                    const result = await presenter.createPatient({name: name, surname: surname, age: age, notes: notes ? notes : ""});
                    
                    if (result) {
                        patientCreationModal.displayError("");
                        patientCreationModal.displaySuccess("Paziente creato.");
                        pubsub.publish("view-patient-oncreate");
                    }
                    else {
                        patientCreationModal.displayError("Creazione paziente fallita, i dati sono errati.");
                        patientCreationModal.displaySuccess("");
                    }
                }
                else {
                    patientCreationModal.displayError("Impossibile creare il paziente, i dati non sono validi.");
                    patientCreationModal.displaySuccess("");
                }
            };

            document.querySelectorAll(".close").forEach(e => {
                e.onclick = () => {
                    document.getElementById(id + "Name").value = "";
                    document.getElementById(id + "Surname").value = "";
                    document.getElementById(id + "Age").value = "";
                    document.getElementById(id + "Notes").value = "";
                };
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    document.getElementById(id + "Name").value = "";
                    document.getElementById(id + "Surname").value = "";
                    document.getElementById(id + "Age").value = "";
                    document.getElementById(id + "Notes").value = "";
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

    return patientCreationModal;
};