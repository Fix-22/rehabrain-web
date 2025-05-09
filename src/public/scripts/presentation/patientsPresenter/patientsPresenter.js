export const generatePatientsPresenter = (middleware, pubsub) => {
    let email, password, patients;

    const patientsPresenter = {
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
        },
        checkGetAllPatients: async () => {
            if (email && password) {
                const result = await middleware.getAllPatients(email, password);
                
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
                pubsub.publish("patientsPresenter-onpatientselect", id);
            }
        }
    };

    return patientsPresenter;
};