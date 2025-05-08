export const generateSessionLogic = (pubsub) => {
    let session, sessionScore;

    const sessionLogic = {
        build: () => {
            pubsub.subscribe("update-session-score", (activityScore) => {
                sessionScore += activityScore;
            });
            
            pubsub.subscribe("session-go-forward", () => {
                sessionLogic.startActivity();
            });
        },
        startActivity: () => {
            if (session.length > 0) {
                const activity = session.shift();
                pubsub.publish(activity.name + "-start", activity);
            }
            else {

            }
        },
        startSession: (inputSession) => {
            session = inputSession;
            sessionLogic.startActivity();
        }
    };

    return sessionLogic;
};