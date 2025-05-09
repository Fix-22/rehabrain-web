export const generatePatientInfoPresenter = (middleware, pubsub) => {
    let patientId, email, password;

    const patientInfoPresenter = {
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

            pubsub.subscribe("patientsPresenter-onpatientselect", id => {
                patientId = id;
            });

            pubsub.subscribe("resultsPresenter-save-session-score", (sessionScore) => {
                patientInfoPresenter.saveSessionScore(sessionScore)
            });
        },
        createPatient: async (patientData) => {
            if (patientData && patientData.name && patientData.surname && patientData.notes !== null && patientData.notes !== undefined && email && password) {
                const result = await middleware.createPatient(patientData, email, password);

                return result;
            }
            else {
                return false;
            }
        },
        editPatient: async (newData) => {
            if (newData && newData.name && newData.surname && newData.notes && email && password) {
                newData.id = patientId;
                const result = await middleware.editPatient(newData, email, password);

                return result;
            }
            else {
                return false;
            }
        },
        deletePatient: async () => {
            if (parseInt(patientId) && email && password) {
                const result = await middleware.deletePatient(patientId, email, password);

                return result;
            }
            else {
                return false;
            }
        },
        getPatient: async () => {
            if (parseInt(patientId) && email && password) {
                const result = await middleware.getPatient(patientId, email, password);

                if (result.length === 1 && result[0]) {
                    Object.keys(result[0]).forEach(k => {
                        result[0][k.toLowerCase()] = result[0][k];
                        delete result[0][k];
                    });
                }

                return result[0];
            }
            else {
                return null;
            }
        },
        getSessionsScores: async () => {
            if (parseInt(patientId) && email && password) {
                const result = await middleware.getSessionsScores(patientId, email, password);

                if (result) {
                    result.forEach(dict => {
                        Object.keys(dict).forEach(k => {
                            dict[k.toLowerCase()] = dict[k];
                            delete dict[k];
                        });
                    });
                    result.sort((a, b) => new Date(b.playDate) - new Date(a.playDate));
                    
                    return result;
                }
                else {
                    return [];
                }
            }
            else {
                return [];
            }
        },
        saveSessionScore: async (sessionScore) => {
            if (parseInt(patientId) && parseInt(sessionScore) && email && password) {
                const sessionData = {
                    score: parseInt(sessionScore),
                    patientId: parseInt(patientId)
                };
                const result = await middleware.saveSessionScore(sessionData, email, password);
                
                pubsub.publish("patientInfoPresenter-session-saved");

                return result;
            }
            else {
                return false;
            }
        },
        deleteSessionScore: async (sessionId) => {
            if (parseInt(sessionId) && parseInt(patientId) && email && password) {
                const result = await middleware.deleteSessionScore(sessionId, patientId, email, password);

                return result;
            }
            else {
                return false;
            }
        }
    };

    return patientInfoPresenter;
};