export const generateWordToObjectView = (presenter, parentElement, pubsub) => {
    let word, objectsList;

    const wordToObjectView = {
        build: () => {
            window.addEventListener("popstate", () => {
                const url = new URL(document.location.href);
                const pageName = url.hash.replace("#", "");

                if (presenter.getId() === pageName) {
                    word = presenter.getWord();
                    objectsList = presenter.getObjectsList();
                    wordToObjectView.render();
                }
            });

            pubsub.subscribe("activityGoForward-onclick", async () => {
                if (!presenter.isStarted()) {
                    
                }
            });

            pubsub.subscribe("activitySolve-onclick", async () => {
                const url = new URL(document.location.href);
                const pageName = url.hash.replace("#", "");

                if (presenter.getId() === pageName) {
                    presenter.solve();
                    pubsub.publish("view-activity-ended");
                    
                    const correctAnswer = document.querySelector('input[name="wordToObjectButton"].correct');
                    correctAnswer.classList.add("corrected")
                    correctAnswer.checked = true;
                    
                    const result = document.getElementById("wordToObjectResult");
                    result.classList.remove("has-text-danger");
                    result.classList.remove("has-text-success");
                    result.classList.add("has-text-warning");
                    result.innerText = "Soluzione corretta";
                    document.querySelectorAll(".imageRadio").forEach(e => e.disabled = true);
                }
            });

            pubsub.subscribe("activityRestart-onclick", async () => {
                const url = new URL(document.location.href);
                const pageName = url.hash.replace("#", "");

                if (presenter.getId() === pageName) {
                    await presenter.restart();
                    word = presenter.getWord();
                    objectsList = presenter.getObjectsList();
                    wordToObjectView.render();
                }
            });
        },
        render: () => {
            let html = `<p class="title has-text-centered" id="wordToObjectWord">$WORD</p>`.replace("$WORD", word);
            objectsList.forEach(e => {
                html += '<label class="radio"><input type="radio" id="' + e.name + 'Button" class="imageRadio' + (e.correct ? " correct" : "") + '" value="' + e.name + '" name="wordToObjectButton">' +
                        '<img src="' + e.linkedimage + '" class="imageInRadio"></label>';
            });
            html += '<p class="title has-text-centered" id="wordToObjectResult"></p>';

            parentElement.innerHTML = html;

            pubsub.publish("view-activity-started");

            document.querySelectorAll(".imageRadio").forEach(e => {
                const result = document.getElementById("wordToObjectResult");

                e.onclick = () => {
                    if (presenter.checkCorrectSelection(e.id.replace("Button", ""))) {
                        pubsub.publish("view-activity-ended");
                        result.classList.remove("has-text-danger");
                        result.classList.add("has-text-success");
                        result.classList.remove("has-text-warning");
                        result.innerText = "Corretto";
                        document.querySelectorAll(".imageRadio").forEach(e => e.disabled = true);
                    }
                    else {
                        result.classList.add("has-text-danger");
                        result.classList.remove("has-text-success");
                        result.classList.remove("has-text-warning");
                        result.innerText = "Sbagliato";
                    }
                };
            });
        }
    };

    return wordToObjectView;
};