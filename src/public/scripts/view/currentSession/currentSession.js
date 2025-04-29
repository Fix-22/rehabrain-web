export const generateCurrentSession = (parentElement, pubsub) => {
    let id, session;

    const currentSession = {
        build: (inputId, inputSession) => {
            id = inputId;
            session = inputSession;
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