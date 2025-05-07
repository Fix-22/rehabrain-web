export const generatePatientInfoManager = (model, pubsub) => {
    let patientId, email, password;

    const patientInfoManager = {
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

            pubsub.subscribe("patientsManager-onpatientselect", id => {
                patientId = id;
            });
        },
        createPatient: async (patientData) => {
            if (patientData && patientData.name && patientData.surname && patientData.notes !== null && patientData.notes !== undefined && email && password) {
                const result = await model.createPatient(patientData, email, password);

                return result;
            }
            else {
                return false;
            }
        },
        editPatient: async (newData) => {
            if (newData && newData.name && newData.surname && newData.notes && email && password) {
                newData.id = patientId;
                const result = await model.editPatient(newData, email, password);

                return result;
            }
            else {
                return false;
            }
        },
        deletePatient: async () => {
            if (parseInt(patientId) && email && password) {
                const result = await model.deletePatient(patientId, email, password);

                return result;
            }
            else {
                return false;
            }
        },
        getPatient: async () => {
            if (parseInt(patientId) && email && password) {
                const result = await model.getPatient(patientId, email, password);

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
                const result = await model.getSessionsScores(patientId, email, password);

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
        saveSessionScore: async (sessionData) => {
            if (parseInt(sessionData.patientId) && sessionData.playDate && parseInt(sessionData.score) && email && password) {
                const result = await model.saveCurrentSession(sessionData, email, password);

                return result;
            }
            else {
                return [];
            }
        },
        deleteSessionScore: async (sessionId) => {
            if (parseInt(sessionId) && parseInt(patientId) && email && password) {
                const result = await model.deleteSessionScore(sessionId, patientId, email, password);

                return result;
            }
            else {
                return false;
            }
        }
    };

    return patientInfoManager;
};