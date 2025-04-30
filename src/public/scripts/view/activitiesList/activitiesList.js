export const generateActivitiesList = (presenter, parentElement, pubsub) => {
    let id, searchBarId, activities;

    const activitiesList = {
        build: async (inputId, inputSearchBarId) => {
            id = inputId;
            searchBarId = inputSearchBarId;
            activities = await presenter.getActivities();

            pubsub.subscribe(searchBarId + "-onsearch", search => {
                activitiesList.search(search);
            });
            pubsub.subscribe(searchBarId + "-oncancel", () => {
                activitiesList.reset();
            });
        },
        render: () => {
            let html = `<table class="table is-fullwidth" id="$ID">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Difficoltà</th>
                                    <th>Aggiungi</th>
                                </tr>
                            </thead>
                            <tbody>`.replace("$ID", id);
            
            let current;
            
            activities.forEach(e => {
                if (current !== e.name) {
                    html += "<tr><td>" + e.name + "</td><td>" + (e.difficulty ? '<div class="select"><select id="' + e.name + 'Difficulty"><option value="Low">Bassa</option><option value="Medium">Media</option><option value="Hard">Alta</option></select></div>' : "Nessuna difficoltà presente") + '</td><td><button class="button is-link addButton" id="' + e.name + 'Add"><span class="icon is-small"><i class="fa-solid fa-plus"></i></span></button></td></tr>';
                }
                current = e.name;
            });
            parentElement.innerHTML = html;

            document.querySelectorAll(".addButton").forEach(e => {
                e.onclick = () => {                    
                    pubsub.publish(id + "-addButton-onclcik", activities.find(d => d.name === e.id.replace("Add", "") && d.difficulty === (document.getElementById(e.id.replace("Add", "Difficulty")) === null ? null : document.getElementById(e.id.replace("Add", "Difficulty")).value)));
                };
            });
        },
        search: (search) => {
            let html = `<table class="table is-fullwidth" id="$ID">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Difficoltà</th>
                                    <th>Aggiungi</th>
                                </tr>
                            </thead>
                            <tbody>`.replace("$ID", id);
            
            let current;
            activities.forEach(e => {
                if (current !== e.name && e.name.toLowerCase().includes(search.toLowerCase())) {
                    html += "<tr><td>" + e.name + "</td><td>" + (e.difficulty ? '<div class="select"><select id="' + e.name + 'Difficulty"><option value="low">Bassa</option><option value="medium">Media</option><option value="hard">Alta</option></select></div>' : "Nessuna difficoltà presente") + '</td><td><button class="button is-link addButton" id="' + e.name + 'Add"><span class="icon is-small"><i class="fa-solid fa-plus"></i></span></button></td></tr>';
                }
                current = e.name;
            });
            parentElement.innerHTML = html;

            document.querySelectorAll(".addButton").forEach(e => {
                e.onclick = () => {
                    let difficulty = null;
                    if (document.getElementById(e.id.replace("Add", "Difficulty"))) {
                        difficulty = document.getElementById(e.id.replace("Add", "Difficulty")).value;
                    }
                    pubsub.publish(id + "-addButton-onclcik", {title: e.id.replace("Add", ""), difficulty: difficulty});
                };
            });
        },
        reset: () => {
            activitiesList.render();
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