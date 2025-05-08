export const generateSessionLogic = (pubsub) => {
    let session, sessionScore;

    const sessionLogic = {
        build: () => {
            sessionScore = 0;

            pubsub.subscribe("update-session-score", (activityScore) => {
                sessionScore += parseInt(activityScore);
            });

            pubsub.subscribe("session-go-forward", () => {
                sessionLogic.startActivity();
            });
        },
        startActivity: () => {
            if (session.length > 0) {
                let activity;

                if (session[0].times > 1) {
                    session[0].times--;
                    activity = session[0];
                }
                else {
                    activity = session.shift();
                }

                pubsub.publish(activity.name + "-start", activity);
            }
            else {
                pubsub.publish("session-finished", sessionScore);
                console.log(sessionScore)
                location.href = "#dashboard";
            }
        },
        startSession: (inputSession) => {
            sessionScore = 0;
            
            session = structuredClone(inputSession); // permette di fare una deep copy dell'array, in questo modo non viene cancellata la sessione una volta completata
            sessionLogic.startActivity();
        }
    };

    return sessionLogic;
};