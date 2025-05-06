export const generateAuthenticator = (model, pubsub) => {
    const authenticator = {
        build: () => {
            pubsub.subscribe("usersManager-logout-success", () => {
                sessionStorage.removeItem("credentials");
            }); 
        },
        login: async (email, password) => {
            if (email && password && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                const result = await model.login(email, password);

                if (result) {
                    pubsub.publish("authenticator-login-success", {email: email, password: password});
                    sessionStorage.setItem("credentials", JSON.stringify({email: email, password: password}));
                }

                return result;
            }
            else {
                return false;
            }
        },
        register: async (name, surname, email) => {
            if (name && surname && email && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                const result = await model.register({name: name, surname: surname, email: email});
                
                if (result) {
                    pubsub.publish("authenticator-login-success", {email: email, password: password});
                    sessionStorage.setItem("credentials", JSON.stringify({email: email, password: password}));
                }

                return result;
            }
            else {
                return false;
            }
        },
        isLogged: () => {
            return sessionStorage.getItem("credentials") ? true : false;
        }
    };

    return authenticator;
};