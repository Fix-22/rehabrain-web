export const generateSessionManager = (middleware, business, pubsub) => {
    let patientId, email, password;

    return {
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

            pubsub.subscribe("patientsManager-onpatientselect", inputPatienId => {
                patientId = inputPatienId;
            });
        },
        checkStartSession: (session) => {
            if (session.length > 0) {
                let exit = false;

                session.forEach(e => {
                    if (parseInt(e.times) <= 0) {
                        exit = true;
                    }
                });

                if (exit) {
                    return false;
                }
                else {
                    business.startSession(session);
                    return true;
                }
            }
            return false;
        },
        checkSaveCurrentSession: async (session) => {
            if (session.length > 0) {
                let exit = false;

                session.forEach(e => {
                    if (parseInt(e.times) <= 0) {
                        exit = true;
                    }
                });

                if (exit) {
                    return false;
                }
                else {
                    const result = await middleware.saveCurrentSession(session,  patientId, email, password);
                    return result;
                }
            }
            return false;
        },
        checkClearCurrentSession: async () => {
            const result = await middleware.clearCurrentSession(patientId, email, password);
            return result;
        },
        checkGetCurrentSession: async () => {
            if (parseInt(patientId) && email && password) {
                const result = await middleware.getCurrentSession(patientId, email, password);

                if (result) {
                    result.forEach(dict => {
                        Object.keys(dict).forEach(k => {
                            dict[k.toLowerCase()] = dict[k];
                            delete dict[k];
                        });
                    });
                    result.sort((a, b) => a.position - b.position);

                    return result;
                }
                else {
                    return [];
                }
            }
            else {
                return [];
            }
        }
    };
}