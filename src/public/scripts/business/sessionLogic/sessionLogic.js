export const generateSessionLogic = (pubsub) => {
    const sessionLogic = {
        startSession: (session) => {
            session.forEach(e => {
                pubsub.publish(e.name + "-start");
            });
        }
    };

    return sessionLogic;
};