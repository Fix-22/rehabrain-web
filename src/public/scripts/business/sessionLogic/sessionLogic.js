export const generateSessionLogic = (pubsub) => {
    let session, sessionScore, isFinished;

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
                isFinished = true;
                pubsub.publish("session-finished", sessionScore);
            }
        },
        startSession: (inputSession) => {
            sessionScore = 0;
            isFinished = false;
            
            session = structuredClone(inputSession); // permette di fare una deep copy dell'array, in questo modo non viene cancellata la sessione una volta completata
            sessionLogic.startActivity();
        },
        isFinished: () => {
            return isFinished;
        },
        getSessionScore: () => {
            return sessionScore;
        }
    };

    return sessionLogic;
};