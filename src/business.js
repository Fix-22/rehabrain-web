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
    checkRegister: (userData) => {

    },
    checkEditAccount: (personalData) => {

    },
    checkDeleteAccount: (email, password) => {

    },
    checkGetActivities: () => {

    },
    checkGetContents: (category, difficulty) => {

    },
    checkGetAllPatients: (email, password) => {

    },
    checkCreatePatient: (patientData, email, password) => {

    },
    checkEditPatient: (patientData, email, password) => {

    },
    checkDeletePatient: (patientId, email, password) => {

    },
    checkGetPatient: (patientId, email, password) => {

    },
};

module.exports = business;