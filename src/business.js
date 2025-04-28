const database = require("./database");
const cipher = require("./cipher");

database.createTables();

const business = {
    checkLogin: async (loginData) => {
        if (loginData.email, loginData.password) {
            const result = await database.login(loginData.email, cipher.hashPassword(loginData.password));

            if (result.length === 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    checkRegister: async (userData) => {
        if (userData && Object.keys(userData).length === 4) {
            if (String(userData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(userData.password) && String(userData.name) && String(userData.surname)) {
                userData.email = String(userData.email);
                userData.password = cipher.hashPassword(String(userData.password));
                userData.name = String(userData.name);
                userData.surname = String(userData.surname);
                
                const result = await database.register(userData);

                if (result) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                console.error("Register error: invalid data inside userData");
            }
        }
        else {
            console.error("Register error: invalid length of userData");
        }
    },
    checkEditAccount: async (personalData) => {
        if (personalData && Object.keys(personalData).length === 4) {
            if (String(personalData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(personalData.password) && String(personalData.name) && String(personalData.surname)) {
                personalData.email = String(personalData.email);
                personalData.password = cipher.hashPassword(String(personalData.password));
                personalData.name = String(personalData.name);
                personalData.surname = String(personalData.surname);
                
                const result = await database.editAccount(personalData);

                if (result === 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                console.error("Edit account error: invalid data inside personalData");
            }
        }
        else {
            console.error("Edit account error: invalid length of personalData");
        }
    },
    checkDeleteAccount: async (loginData) => {
        if (loginData.email, loginData.password) {
            const result = await database.deleteAccount(loginData.email, cipher.hashPassword(loginData.password));

            if (result === 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    getActivities: async () => {
        const result = database.getActivities();

        if (result) {
            return result;
        }
        else {
            return null;
        }
    },
    checkGetContents: async (category, difficulty) => {

    },
    checkGetAllPatients: async (email, password) => {

    },
    checkCreatePatient: async (patientData, email, password) => {

    },
    checkEditPatient: async (patientData, email, password) => {

    },
    checkDeletePatient: async (patientId, email, password) => {

    },
    checkGetPatient: async (patientId, email, password) => {

    },
};

module.exports = business;