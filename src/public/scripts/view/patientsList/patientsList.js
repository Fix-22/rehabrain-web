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
        },
        render: () => {
            let html = `<aside class="menu" id="$ID">
                            <p class="menu-label">Pazienti</p>
                            <ul class="menu-list">`.replace("$ID", id);
            
            patients.forEach(e => {
                html += '<li><a id="patient' + e.id + '" class="patientElement has-text-link"><span class="icon-text"><span class="mr-6 pr-6">' + e.name + " " + e.surname + '</span><span class="icon clickableIcon ml-6 pl-6" id="' + e.id +'Info"><i class="fa-solid fa-circle-info"></i></span></span></a></li>'
            });
            html += "</ul></aside>";
            parentElement.innerHTML = html;

            document.querySelectorAll(".patientElement").forEach((e, i) => {
                e.onclick = () => {
                    document.querySelectorAll(".patientElement").forEach((e2, i2) => {
                        if (i === i2) {
                            e2.classList.add("is-active");
                            e2.classList.add("has-text-light");
                            e2.classList.remove("has-text-link");

                            presenter.selectPatient(parseInt(e2.id.replace("patient", "")));
                            pubsub.publish("patientsList-onpatientselect", e2.id.replace("patient", ""));
                        }
                        else {
                            e2.classList.remove("is-active");
                            e2.classList.remove("has-text-light");
                            e2.classList.add("has-text-link");
                        }
                    });
                };
            });
        }
    };

    return patientsList;
};