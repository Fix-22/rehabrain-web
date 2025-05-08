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
                    console.log(word, objectsList)
                    wordToObjectView.render();
                }
            });
        },
        render: () => {
            let html = `<p class="title has-text-centered" id="wordToObjectWord">$WORD</p>`.replace("$WORD", word);
            objectsList.forEach(e => {
                html += '<label class="radio"><input type="radio" id="' + e.id + '" class="imageRadio' + (e.correct ? " correct" : "") + '" value="' + e.value + '" name="wordToObjectButton">' +
                        '<img src="' + e.path + '" class="imageInRadio"></label>';
            });
            html += '<p class="title has-text-centered" id="wordToObjectResult"></p>';

            parentElement.innerHTML = html;
            console.log("a")

            document.querySelectorAll(".imageRadio").forEach(e => {
                const result = document.getElementById("wordToObjectResult");

                e.onclick = () => {
                    if (presenter.checkCorrectSelection(e.id)) {
                        result.classList.remove("has-text-danger");
                        result.classList.add("has-text-success");
                        result.classList.remove("has-text-warning");
                        result.innerText = "Corretto";
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