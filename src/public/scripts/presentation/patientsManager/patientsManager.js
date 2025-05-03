export const generatePatientsManager = (model, pubsub) => {
    let email, password, patients;

    const patientsManager = {
        build: () => {
            pubsub.subscribe("authenticator-login-success", credentials => {
                email = credentials.email;
                password = credentials.password;
            });
        },
        checkGetAllPatients: async () => {
            if (email && password) {
                const result = await model.getAllPatients(email, password);
                
                if (result) {
                    result.forEach(dict => {
                        Object.keys(dict).forEach(k => {
                            dict[k.toLowerCase()] = dict[k];
                            delete dict[k];
                        });
                    });

                    patients = result;
                    return patients;
                }
                else {
                    return [];
                }
            }
            else {
                return [];
            }
        },
        selectPatient: (id) => {
            if (patients.find(e => e.id === id)) {
                pubsub.subscribe("patientsManager-onpatientselect", id);
            }
        }
    };

    return patientsManager;
};