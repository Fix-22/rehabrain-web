export const generateSessionManager = (model, pubsub) => {
    let patientId, email, password;

    return {
        build: () => {
            pubsub.subscribe("authenticator-login-success", credentials => {
                email = credentials.email;
                password = credentials.password;
            });

            pubsub.subscribe("patientsManager-onpatientselect", patient => {alert(9)
                patientId = patient.id;
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
                    const result = await model.saveCurrentSession(session,  patientId, email, password);
                    return result;
                }
            }
            return false;
        },
        checkClearCurrentSession: async () => {
            const result = await model.clearCurrentSession(patientId, email, password);
            return result;
        },
        checkGetCurrentSession: async () => {
            const result = await model.getCurrentSession(patientId, email, password);

            if (result) {
                result.forEach(dict => {
                    Object.keys(dict).forEach(k => {
                        dict[k.toLowerCase()] = dict[k];
                        delete dict[k];
                    });
                });
                result.sort((a, b) => a.position - b.position);
            }

            return result;
        }
    };
}