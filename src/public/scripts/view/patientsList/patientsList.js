export const generatePatientsList = (presenter, parentElement, pubsub) => {
    let id, patients = [];

    const patientsList = {
        build: async (inputId) => {
            id = inputId;

            if (sessionStorage.getItem("credentials")) {
                patients = await presenter.checkGetAllPatients();
                patientsList.render();
            }

            pubsub.subscribe("view-login-success", async credentials => {
                patients = await presenter.checkGetAllPatients();
                patientsList.render();
            });

            pubsub.subscribe("view-patient-oncreate", async () => {
                patients = await presenter.checkGetAllPatients();
                patientsList.render();
            });

            pubsub.subscribe("view-patient-ondelete", async () => {
                patients = await presenter.checkGetAllPatients();
                patientsList.render();
            });

            pubsub.subscribe("patientsSearchbar-onsearch", search => {
                patientsList.search(search);
            });

            pubsub.subscribe("patientsSearchbar-oncancel", () => {
                patientsList.render();
            });
        },
        render: () => {
            let html = `<table class="table is-fullwidth" id="$ID">
                            <thead>
                                <th>Anagrafica</th>
                                <th>Informazioni</th>
                            </thead>
                            <tbody>`.replace("$ID", id);
            
            patients.forEach(e => {
                html += '<tr class="patientElement" id="patient' + e.id + '"><td>' + e.name + " " + e.surname + '</td><td><button type="button" class="button is-light js-modal-trigger is-hidden" id="patient' + e.id + 'Info" data-target="patientInfoModal"><span class="icon"><i class="fa-solid fa-circle-info"></i></span></span></button></td></tr>';
            });
            html += "</tbody></table>";
            parentElement.innerHTML = html;

            document.querySelectorAll(".patientElement").forEach((e, i) => {
                e.onclick = () => {
                    document.querySelectorAll(".patientElement").forEach((e2, i2) => {
                        if (i === i2) {
                            e2.classList.add("is-link");
                            document.getElementById(e2.id + "Info").classList.remove("is-hidden")

                            presenter.selectPatient(parseInt(e2.id.replace("patient", "")));
                            pubsub.publish("patientsList-onpatientselect", e2.id.replace("patient", ""));
                        }
                        else {
                            e2.classList.remove("is-link");
                            document.getElementById(e2.id + "Info").classList.add("is-hidden")
                        }
                    });
                };
            });

            document.querySelectorAll(".patientElement .js-modal-trigger").forEach(e => {
                e.addEventListener("click", event => {
                    event.stopPropagation();
                });
            });
        },
        search: (search) => {
            let html = `<table class="table is-fullwidth" id="$ID">
                            <thead>
                                <th>Anagrafica</th>
                                <th>Informazioni</th>
                            </thead>
                            <tbody>`.replace("$ID", id);
            
            patients.forEach(e => {
                if ((e.name.toLowerCase() + " " + e.surname.toLowerCase()).includes(search.toLowerCase())) {
                    html += '<tr class="patientElement" id="patient' + e.id + '"><td>' + e.name + " " + e.surname + '</td><td><button type="button" class="button is-light js-modal-trigger is-hidden" id="patient' + e.id + 'Info" data-target="patientInfoModal"><span class="icon"><i class="fa-solid fa-circle-info"></i></span></span></button></td></tr>';
                }
            });
            html += "</tbody></table>";
            parentElement.innerHTML = html;

            document.querySelectorAll(".patientElement").forEach((e, i) => {
                e.onclick = () => {
                    document.querySelectorAll(".patientElement").forEach((e2, i2) => {
                        if (i === i2) {
                            e2.classList.add("is-link");
                            document.getElementById(e2.id + "Info").classList.remove("is-hidden")

                            presenter.selectPatient(parseInt(e2.id.replace("patient", "")));
                            pubsub.publish("patientsList-onpatientselect", e2.id.replace("patient", ""));
                        }
                        else {
                            e2.classList.remove("is-link");
                            document.getElementById(e2.id + "Info").classList.add("is-hidden")
                        }
                    });
                };
            });

            document.querySelectorAll(".patientElement .js-modal-trigger").forEach(e => {
                e.addEventListener("click", event => {
                    event.stopPropagation();
                });
            });
        }
    };

    return patientsList;
};