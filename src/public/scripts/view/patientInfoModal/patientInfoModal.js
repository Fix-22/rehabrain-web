export const generatePatientInfoModal = (presenter, parentElement, pubsub) => {
    let id, patient, sessionsScores;

    const patientlInfoModal = {
        build: (inputId) => {
            id = inputId;
            patient = null;
            sessionsScores = [];

            pubsub.subscribe("patientsList-onpatientselect", async id => {
                patient = await presenter.getPatient();
                sessionsScores = await presenter.getSessionsScores();
                console.log(sessionsScores)
                patientlInfoModal.render();

                const x = sessionsScores.map(e => {
                    const date = new Date(e.playdate);
                    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                });
                const y = sessionsScores.map(e => e.score);

                new Chart("history", {
                    type: "line",
                    data: {
                        labels: x,
                        datasets: [{
                            label: "Progresso",
                            backgroundColor:"rgba(0,0,255,1.0)",
                            borderColor: "rgba(0,0,255,0.1)",
                            data: y
                        }]
                    }
                });
            });
        },
        render: () => {
            let tableHtml = patient ? `<table class="table is-fullwidth">
                                        <thead>
                                            <th>Data</th>
                                            <th>Punteggio</th>
                                            <th>Gestisci</th>
                                        </thead>
                                        <tbody>` : "";
            
            sessionsScores.forEach(e => {
                const date = new Date(e.playdate);
                tableHtml += "<tr><td>" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "</td><td>" + e.score + '</td><td><button type="button" class="button is-danger" id="' + e.id + 'Delete"><span class="icon"><i class="fa-solid fa-trash-can"></i></span></button></tr>';
            });
            tableHtml += patient ? "</tbody></table>" : "";

            let html = (`<div class="modal" id="$ID">
                            <div class="modal-background close"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Informazioni paziente ` + (patient ? "(" + patient.name + " " + patient.surname + ")" : "") + `</p>
                                    <button class="delete close" aria-label="close"></button>
                                </header>
                                <section class="modal-card-body">
                                    <label class="label">Nome</label>
                                    <div class="field">
                                        <p class="control has-icons-left">
                                            <input class="input" type="email" placeholder="Nome" id="$IDName" value="` + (patient ? patient.name : "") + `">
                                            <span class="icon is-small is-left">
                                                <i class="fa-solid fa-hospital-user"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <label class="label">Cognome</label>
                                    <div class="field">
                                        <p class="control has-icons-left">
                                            <input class="input" type="email" placeholder="Cognome" id="$IDSurname" value="` + (patient ? patient.surname : "") + `">
                                            <span class="icon is-small is-left">
                                                <i class="fa-solid fa-hospital-user"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <label class="label">Età</label>
                                    <div class="field">
                                        <p class="control has-icons-left">
                                            <input class="input" type="number" placeholder="Age" id="$IDAge" value="` + (patient ? patient.age : "") + `">
                                            <span class="icon is-small is-left">
                                                <i class="fa-solid fa-hospital-user"></i>
                                            </span>
                                        </p>
                                    </div>
                                    <label class="label">Note</label>
                                    <div class="field">
                                        <textarea class="textarea" placeholder="Note" id="$IDNotes" rows="10">` + (patient ? patient.notes : "") + `</textarea>
                                    </div>
                                    <div class="field has-text-centered">
                                        <p class="control">
                                            <button type="button" class="button is-danger" id="$IDDeletePatient">
                                                <span class="icon">
                                                    <i class="fa-solid fa-user-xmark"></i>
                                                </span>
                                                <span>Elimina paziente</span>
                                            </button>
                                        </p>
                                    </div>
                                    $TABLE
                                    <canvas id="history" style="width:100%;max-width:700px"></canvas>
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
                        </div>`).replaceAll("$ID", id).replace("$TABLE", tableHtml);
            
            parentElement.innerHTML = html;

            pubsub.publish("modal-render");
            
            document.getElementById(id + "DeletePatient").onclick = async () => {
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

    return patientlInfoModal;
};