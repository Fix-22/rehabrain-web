export const generateAuthenticator = (model, pubsub) => {
    return {
        login: async (email, password) => {
            if (email && password && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                const result = await model.login(email, password);

                if (result) {
                    pubsub.publish("authenticator-login-success", {email: email, password: password});
                }

                return result;
            }
            else {
                return false;
            }
        },
        register: async (name, surname, email, password) => {
            if (name && surname && email && password && email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                const result = await model.register({name: name, surname: surname, email: email, password: password});
                
                if (result) {
                    pubsub.publish("authenticator-login-success", {email: email, password: password});
                }

                return result;
            }
            else {
                return false;
            }
        }
    }
};