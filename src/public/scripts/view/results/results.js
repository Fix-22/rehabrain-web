export const generateResults = (presenter, parentElement, pubsub) => {
    let id, score;

    const results = {
        build: (inputId) => {
            id = inputId;

            pubsub.subscribe("view-activity-ended", () => {
                if (presenter.isFinished()) {
                    score = presenter.getSessionScore();
                    results.render();
                    location.href = "#results";
                }
            });
        },
        render: () => {
            let html = (`<p>Il paziente ha realizzato <strong>$SCORE</strong> punti.</p>` + (+
                        presenter.isLogged() ?
                        `<p>Desideri salvare la sessione?</p>
                        <div class="field is-grouped">
                            <p class="control">
                                <button class="button is-primary" id="$IDSave">
                                    <span class="icon is-small">
                                        <i class="fa-solid fa-floppy-disk"></i>
                                    </span>
                                    <span>Salva</span>
                                </button>
                            </p>
                            <p class="control">
                                <a class="button is-danger" href="#dashboard">
                                    <span class="icon is-small">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </span>
                                    <span>Scarta</span>
                                </a>
                            </p>
                        </div>`
                        :
                        `<div class="field is-grouped">
                            <p class="control">
                                <a class="button is-light" href="#dashboard">
                                    <span class="icon is-small">
                                        <i class="fa-solid fa-xmark"></i>
                                    </span>
                                    <span>Chiudi</span>
                                </a>
                            </p>
                        </div>`)).replace("$SCORE", score).replaceAll("$ID", id);
            
            parentElement.innerHTML = html;

            if (presenter.isLogged()) {
                document.getElementById(id + "Save").onclick = () => {
                    presenter.saveSessionScore();
                    location.href = "#dashboard";
                };
            }
        }
    };

    return results;
};