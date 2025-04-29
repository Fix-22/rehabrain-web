export const generateCurrentSession = (presenter, parentElement, pubsub) => {
    let id, searchBarId, activitiesListId, session;

    const currentSession = {
        build: (inputId, inputSearchBarId, inputActivitiesListId) => {
            id = inputId;
            activitiesListId = inputActivitiesListId;
            searchBarId = inputSearchBarId;
            session = [];

            pubsub.subscribe(searchBarId + "-onsearch", search => {
                currentSession.search(search);
            });
            pubsub.subscribe(searchBarId + "-oncancel", () => {
                currentSession.reset();
            });

            pubsub.subscribe(inputActivitiesListId + "-addButton-onclcik", activity => {
                console.log(activity)
            });
        },
        render: () => {
            let html = ``;
        },
        setSession: (inputSession) => {
            session = inputSession;
        },
        getSession: () => {
            return session;
        }
    };

    return currentSession;
};