export const generateUsersManager = (middleware, pubsub) => {
    let email, password;
    
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
        },
        logout: () => {
            email = null;
            password = null;
            pubsub.publish("usersManager-logout-success");
        },
        getAccount: async () => {
            if (email && password) {
                const result = await middleware.getAccount(email, password);
                
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
        editAccount: async (newName, newSurname) => {
            if (newName && newSurname && email && password) {
                const result = middleware.editAccount({name: newName, surname: newSurname, email: email, password: password});
                return result;
            }
            else {
                return false;
            }
        },
        deleteAccount: async () => {
            if (email && password) {
                const result = await middleware.deleteAccount(email, password);

                if (result) {
                    
                }
                return result;
            }
            else {
                return false;
            }
        }
    };
};