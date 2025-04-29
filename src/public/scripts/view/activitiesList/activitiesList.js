export const generateActivitiesList = (parentElement, pubsub) => {
    let id, activities;

    const activitiesList = {
        build: (inputId, inputActivities) => {
            id = inputId;
            activities = inputActivities;
        },
        render: () => {
            let html = `<table class="table" id="$ID">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Difficoltà</th>
                                    <th>Aggiungi</th>
                                </tr>
                            </thead>
                            <tbody>`.replace("$ID", id);
            
            activities.forEach(e => {
                html += "<tr><td>" + e.title + "</td><td>" + (e.hasDifficulty ? '<div class="select"><select id="' + e.title + 'Difficulty"><option value="low">Bassa</option><option value="medium">Media</option><option value="hard">Alta</option></select></div>' : "Nessuna difficoltà presente") + '</td><td><button class="button is-link addButton" id="' + e.title + 'Button"><span class="icon is-small"><i class="fa-solid fa-plus"></i></span></button></td></tr>';
            });
            parentElement.innerHTML = html;

            document.querySelectorAll(".addButton").forEach(e => {
                e.onclick = () => {
                    let difficulty = null;
                    if (document.getElementById(e.id.replace("Button", "Difficulty"))) {
                        difficulty = document.getElementById(e.id.replace("Button", "Difficulty")).value;
                    }
                    pubsub.publish(id + "addButton-pressed", {title: e.id.replace("Button", ""), difficulty: difficulty});
                };
            });
        },
        setActivities: (inputActivities) => {
            activities = inputActivities;
        },
        getActivites: () => {
            return activities;
        }
    };

    return activitiesList;
};