export const generateResultsPresenter = (business, pubsub) => {
    let email, password;

    const resultsPresenter = {
        build: () => {
            if (sessionStorage.getItem("credentials")) {
                const credentials = JSON.parse(sessionStorage.getItem("credentials"));
                email = credentials.email;
                password = credentials.password;
            }

            pubsub.subscribe("authenticator-login-success", credentials => {
                email = credentials.email;
                password = credentials.password;
            });
        },
        isLogged: () => {
            return sessionStorage.getItem("credentials") ? true : false;
        },
        isFinished: () => {
            return business.isFinished();
        },
        getSessionScore: () => {
            return business.getSessionScore();
        },
        saveSessionScore: () => {
            pubsub.publish("resultsPresenter-save-session-score", resultsPresenter.getSessionScore());
        }
    };

    return resultsPresenter;
}