export const generateCurrentSession = (presenter, parentElement, pubsub) => {
    let id, searchBarId, isDashboard, session;

    const moveUp = (session, element) => {
        const idx = session.indexOf(element);
        
        if (idx > 0) {
            const mid = session[idx];
            session[idx] = session[idx - 1];
            session[idx - 1] = mid;
        }
    };

    const moveDown = (session, element) => {
        const idx = session.indexOf(element);
        
        if (idx < session.length - 1) {
            const mid = session[idx];
            session[idx] = session[idx + 1];
            session[idx + 1] = mid;
        }
    };

    const currentSession = {
        build: async (inputId, inputSearchBarId, inputIsDashboard) => {
            id = inputId;
            searchBarId = inputSearchBarId;
            isDashboard = inputIsDashboard;
            session = isDashboard ? await presenter.checkGetCurrentSession() : [];

            pubsub.subscribe(searchBarId + "-onsearch", search => {
                currentSession.search(search);
            });
            pubsub.subscribe(searchBarId + "-oncancel", () => {
                currentSession.reset();
            });

            pubsub.subscribe("activitiesList-addButton-onclcik", activity => {
                const foundActivity = session.find(a => a.name === activity.name && a.difficulty === activity.difficulty);

                if (foundActivity) {
                    foundActivity.times++;
                }
                else {
                    session.push(JSON.parse(JSON.stringify(activity))); // per fare una deep copy ed inserirlo nell'array, in modo da non andare ad aumentare il numero di ripetizioni di base per ogni attività
                }
                currentSession.render();
            });

            pubsub.subscribe("view-login-success", async credentials => {
                isDashboard = true;
            });

            pubsub.subscribe("patientsList-onpatientselect", async patientId => {
                session = isDashboard ? await presenter.checkGetCurrentSession() : [];
                console.log(session);
                currentSession.render();
            });
        },
        render: () => {
            let html =  (`<div class="buttons is-centered">
                            <button class="button is-link" id="$IDStart">
                                <span class="icon">
									<i class="fa-solid fa-play"></i>
								</span>
								<span>Avvia</span>
                            </button>` + (isDashboard ? `<button class="button is-primary" id="$IDSave">
                                                            <span class="icon">
                                                                <i class="fa-solid fa-floppy-disk"></i>
                                                            </span>
                                                            <span>Salva</span>
                                                        </button>
                                                        <button class="button is-danger" id="$IDClear">
                                                            <span class="icon">
                                                                <i class="fa-solid fa-eraser"></i>
                                                            </span>
                                                            <span>Cancella</span>
                                                        </button>` : "</div>") +
                            `<div class="notification is-danger is-hidden" id="$IDError"></div>
                            <div class="notification is-success is-light is-hidden" id="$IDSuccess"></div>
                            <table class="table is-fullwidth" id="$ID">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Difficoltà</th>
                                        <th>Gestisci</th>
                                        <th>Ripetizioni</th>
                                    </tr>
                                </thead>
                                <tbody>`).replaceAll("$ID", id);
            
            const difficulties = {
                Low: "Bassa",
                Medium: "Media",
                Hard: "Alta"
            };
            session.forEach(e => {
                html += "<tr><td>" + e.name + "</td><td>" + (e.difficulty ? difficulties[e.difficulty] : "Nessuna") + '</td><td><div class="field has-addons"><p class="control"><button class="button is-danger deleteButton" id="' + e.name + (e.difficulty ? e.difficulty : "") + 'Delete"><span class="icon is-small"><i class="fa-solid fa-trash-can"></i></span></button></p><p class="control"><button class="button is-link upButton" id="' + e.name + (e.difficulty ? e.difficulty : "") + 'Up"><span class="icon is-small"><i class="fa-solid fa-up-long"></i></span></button></p><p class="control"><button class="button is-link downButton" id="' + e.name + (e.difficulty ? e.difficulty : "") + 'Down"><span class="icon is-small"><i class="fa-solid fa-down-long"></i></span></button></p></td><td><input type="number" class="input is-link timesInput" id="' + e.name + (e.difficulty ? e.difficulty : "") + 'Times" value=' + e.times + '></td></tr>';

            });
            parentElement.innerHTML = html;

            document.querySelectorAll(".deleteButton").forEach(e => {
                e.onclick = () => {
                    session.splice(session.findIndex(d => d.difficulty ? (d.name === e.id.replace(d.difficulty.charAt(0).toUpperCase() + d.difficulty.substring(1) + "Delete", "")) : (d.name === e.id.replace("Delete", ""))), 1);
                    currentSession.render();
                };
            });

            document.querySelectorAll(".upButton").forEach(e => {
                e.onclick = () => {
                    moveUp(session, session.find(d => d.difficulty ? (d.name === e.id.replace(d.difficulty.charAt(0).toUpperCase() + d.difficulty.substring(1) + "Up", "")) : (d.name === e.id.replace("Up", ""))));
                    currentSession.render();
                };
            });

            document.querySelectorAll(".downButton").forEach(e => {
                e.onclick = () => {
                    moveDown(session, session.find(d => d.difficulty ? (d.name === e.id.replace(d.difficulty.charAt(0).toUpperCase() + d.difficulty.substring(1) + "Down", "")) : (d.name === e.id.replace("Down", ""))));
                    currentSession.render();
                };
            });

            document.querySelectorAll(".timesInput").forEach(e => {
                e.oninput = () => {
                    session.find(d => d.difficulty ? (d.name === e.id.replace(d.difficulty.charAt(0).toUpperCase() + d.difficulty.substring(1) + "Times", "")) : (d.name === e.id.replace("Times", ""))).times = parseInt(e.value);
                };
            });

            document.getElementById(id + "Start").onclick = () => {
                pubsub.publish(id + "Start-onclick", session);
                console.log(session)
                
                if (!presenter.checkStartSession(session)) {
                    currentSession.displayError("Impossibile avviare la sessione, i dati inseriti sotto non sono validi.");
                }
                else {
                    currentSession.displayError("");
                }
            };

            if (isDashboard) {
                document.getElementById(id + "Save").onclick = async () => {
                    pubsub.publish(id + "Save-onclick", session);

                    if (await presenter.checkSaveCurrentSession(session)) {
                        currentSession.displayError("");
                        currentSession.displaySuccess("Sessione salvata.");
                    }
                    else {
                        currentSession.displaySuccess("");
                        currentSession.displayError("Impossibile avviare la sessione, i dati inseriti sotto non sono validi.");
                    }
                };
                document.getElementById(id + "Clear").onclick = async () => {
                    pubsub.publish(id + "Clear-onclick", session);

                    if (await presenter.checkClearCurrentSession()) {
                        session = await presenter.checkGetCurrentSession();
                        currentSession.render();
                        currentSession.displayError("");
                        currentSession.displaySuccess("Sessione cancellata.");
                    }
                    else {
                        currentSession.displaySuccess("");
                        currentSession.displayError("Impossibile cancellare la sessione.");
                    }
                };
            }
        },
        search: (search) => {
            let html =  (`<div class="buttons is-centered">
                            <button class="button is-link" id="$IDStart">
                                <span class="icon">
									<i class="fa-solid fa-play"></i>
								</span>
								<span>Avvia</span>
                            </button>` + (isDashboard ? `<button class="button is-primary" id="$IDSave">
                                                            <span class="icon">
                                                                <i class="fa-solid fa-floppy-disk"></i>
                                                            </span>
                                                            <span>Salva</span>
                                                        </button>
                                                        <button class="button is-danger" id="$IDClear">
                                                            <span class="icon">
                                                                <i class="fa-solid fa-eraser"></i>
                                                            </span>
                                                            <span>Cancella</span>
                                                        </button>` : "</div>") +
                            `<div class="notification is-danger is-hidden" id="$IDError"></div>
                            <div class="notification is-success is-light is-hidden" id="$IDSuccess"></div>
                            <table class="table is-fullwidth" id="$ID">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Difficoltà</th>
                                        <th>Gestisci</th>
                                        <th>Ripetizioni</th>
                                    </tr>
                                </thead>
                                <tbody>`).replaceAll("$ID", id);
            
            const difficulties = {
                Low: "Bassa",
                Medium: "Media",
                Hard: "Alta"
            };
            session.forEach(e => {
                if (e.name.toLowerCase().includes(search.toLowerCase())) {
                    html += "<tr><td>" + e.name + "</td><td>" + (e.difficulty ? difficulties[e.difficulty] : "Nessuna") + '</td><td><div class="field has-addons"><p class="control"><button class="button is-danger deleteButton" id="' + e.name + (e.difficulty ? e.difficulty : "") + 'Delete"><span class="icon is-small"><i class="fa-solid fa-trash-can"></i></span></button></p><p class="control"><button class="button is-link upButton" id="' + e.name + (e.difficulty ? e.difficulty : "") + 'Up"><span class="icon is-small"><i class="fa-solid fa-up-long"></i></span></button></p><p class="control"><button class="button is-link downButton" id="' + e.name + (e.difficulty ? e.difficulty : "") + 'Down"><span class="icon is-small"><i class="fa-solid fa-down-long"></i></span></button></p></td><td><input type="number" class="input is-link timesInput" id="' + e.name + (e.difficulty ? e.difficulty : "") + 'Times" value=' + e.times + '></td></tr>';
                }
            });
            parentElement.innerHTML = html;

            document.querySelectorAll(".deleteButton").forEach(e => {
                e.onclick = () => {
                    session.splice(session.findIndex(d => d.difficulty ? (d.name === e.id.replace(d.difficulty.charAt(0).toUpperCase() + d.difficulty.substring(1) + "Delete", "")) : (d.name === e.id.replace("Delete", ""))), 1);
                    currentSession.render();
                };
            });

            document.querySelectorAll(".upButton").forEach(e => {
                e.onclick = () => {
                    moveUp(session, session.find(d => d.difficulty ? (d.name === e.id.replace(d.difficulty.charAt(0).toUpperCase() + d.difficulty.substring(1) + "Up", "")) : (d.name === e.id.replace("Up", ""))));
                    currentSession.render();
                };
            });

            document.querySelectorAll(".downButton").forEach(e => {
                e.onclick = () => {
                    moveDown(session, session.find(d => d.difficulty ? (d.name === e.id.replace(d.difficulty.charAt(0).toUpperCase() + d.difficulty.substring(1) + "Down", "")) : (d.name === e.id.replace("Down", ""))));
                    currentSession.render();
                };
            });

            document.querySelectorAll(".timesInput").forEach(e => {
                e.oninput = () => {
                    session.find(d => d.difficulty ? (d.name === e.id.replace(d.difficulty.charAt(0).toUpperCase() + d.difficulty.substring(1) + "Times", "")) : (d.name === e.id.replace("Times", ""))).times = parseInt(e.value);
                };
            });

            document.getElementById(id + "Start").onclick = () => {
                pubsub.publish(id + "Start-onclick", session);
                console.log(session)
                
                if (!presenter.checkStartSession(session)) {
                    currentSession.displayError("Impossibile avviare la sessione, i dati inseriti sotto non sono validi.");
                }
                else {
                    currentSession.displayError("");
                }
            };

            if (isDashboard) {
                document.getElementById(id + "Save").onclick = async () => {
                    pubsub.publish(id + "Save-onclick", session);

                    if (await presenter.checkSaveCurrentSession(session)) {
                        currentSession.displayError("");
                        currentSession.displaySuccess("Sessione salvata.");
                    }
                    else {
                        currentSession.displaySuccess("");
                        currentSession.displayError("Impossibile avviare la sessione, i dati inseriti sotto non sono validi.");
                    }
                };
                document.getElementById(id + "Clear").onclick = async () => {
                    pubsub.publish(id + "Clear-onclick", session);

                    if (await presenter.checkClearCurrentSession()) {
                        session = await presenter.checkGetCurrentSession();
                        currentSession.render();
                        currentSession.displayError("");
                        currentSession.displaySuccess("Sessione cancellata.");
                    }
                    else {
                        currentSession.displaySuccess("");
                        currentSession.displayError("Impossibile cancellare la sessione.");
                    }
                };
            }
        },
        reset: () => {
            currentSession.render();
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
        },
        setIsDashboard: (inputIsDashboard) => {
            isDashboard = inputIsDashboard;
        }
    };

    return currentSession;
};