const database = require("./database");
const cipher = require("./cipher");

database.createTables();

const business = {
    checkLogin: async (loginData) => {
        if (loginData && Object.keys(loginData).length === 2) {
            if (String(loginData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(loginData.password)) {
                loginData.email = String(loginData.email);
                loginData.password = cipher.hashPassword(String(loginData.password));
                
                const result = await database.login(loginData.email, loginData.password);

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
        }
        else {
            return false;
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
                return false;
            }
        }
        else {
            return false;
        }
    },
    checkDeleteAccount: async (loginData) => {
        if (loginData && Object.keys(loginData).length === 2) {
            if (String(loginData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(loginData.password)) {
                loginData.email = String(loginData.email);
                loginData.password = cipher.hashPassword(String(loginData.password));
                
                const result = await database.deleteAccount(loginData.email, loginData.password);

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
        }
        else {
            return false;
        }
    },
    getActivities: async () => {
        const result = await database.getActivities();

        if (result) {
            return result;
        }
        else {
            return null;
        }
    },
    checkGetContents: () => {},
    checkGetAllPatients: async (loginData) => {
        if (loginData && Object.keys(loginData).length === 2) {
            if (String(loginData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(loginData.password)) {
                loginData.email = String(loginData.email);
                loginData.password = cipher.hashPassword(String(loginData.password));
            
                const result = await database.getAllPatients(loginData.email, loginData.password);

                if (result.length > 0) {
                    return result;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    },
    checkCreatePatient: async (inputData) => {
        if (inputData && Object.keys(inputData).length === 3) {
            if (String(inputData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(inputData.password) && inputData.patientData && Object.keys(inputData.patientData).length === 5) {
                if (inputData.patientData.id && inputData.patientData.name && inputData.patientData.surname && inputData.patientData.age && inputData.patientData.notes) {
                    inputData.email = String(inputData.email);
                    inputData.password = cipher.hashPassword(String(inputData.password));
                    inputData.patientData.id = 0 ? isNaN(parseInt(inputData.patientData.id)) : parseInt(inputData.patientData.id);
                    inputData.patientData.name = String(inputData.patientData.name);
                    inputData.patientData.surname = String(inputData.patientData.surname);
                    inputData.patientData.age = 0 ? isNaN(parseInt(inputData.patientData.age)) : parseInt(inputData.patientData.age);
                    inputData.patientData.notes = String(inputData.patientData.notes);

                    const result = await database.createPatient(inputData.patientData, inputData.email, inputData.password);

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
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    checkEditPatient: async (inputData) => {
        if (inputData && Object.keys(inputData).length === 3) {
            if (String(inputData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(inputData.password) && inputData.patientData && Object.keys(inputData.patientData).length === 5) {
                if (inputData.patientData.id && inputData.patientData.name && inputData.patientData.surname && inputData.patientData.age && inputData.patientData.notes) {
                    inputData.email = String(inputData.email);
                    inputData.password = cipher.hashPassword(String(inputData.password));
                    inputData.patientData.id = 0 ? isNaN(parseInt(inputData.patientData.id)) : parseInt(inputData.patientData.id);
                    inputData.patientData.name = String(inputData.patientData.name);
                    inputData.patientData.surname = String(inputData.patientData.surname);
                    inputData.patientData.age = 0 ? isNaN(parseInt(inputData.patientData.age)) : parseInt(inputData.patientData.age);
                    inputData.patientData.notes = String(inputData.patientData.notes);

                    const result = await database.editPatient(inputData.patientData, inputData.email, inputData.password);

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
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    checkDeletePatient: async (inputData) => {
        if (inputData && Object.keys(inputData).length === 3) {
            if (inputData.patientId && inputData.email && inputData.password) {
                console.log(inputData);
                
                inputData.patientId = 0 ? isNaN(parseInt(inputData.patientId)) : parseInt(inputData.patientId);
                inputData.email = String(inputData.email);
                inputData.password = cipher.hashPassword(String(inputData.password));
                
                const result = await database.deletePatient(inputData.patientId, inputData.email, inputData.password);

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
        }
        else {
            return false;
        }
    },
    checkGetPatient: async (patientId, email, password) => {

    },
};

module.exports = business;