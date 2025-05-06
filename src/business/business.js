const generateBusiness = (database, cipher, mailer) => {
    return {
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
            if (userData && Object.keys(userData).length === 3) {
                if (String(userData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(userData.name) && String(userData.surname)) {
                    userData.email = String(userData.email);
                    userData.name = String(userData.name);
                    userData.surname = String(userData.surname);

                    const password = cipher.generatePassword(15);
                    userData.password = cipher.hashPassword(password);
                    
                    const result = await database.register(userData);

                    if (result === 1) {
                        mailer.sendEmail(userData.email, "Benvenuto in RehaBrain", "Benvenuto su RehaBrain.", "<p>Benvenuto su RehaBrain.<br>Ecco la tua password: " + password + "</p>")

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
        checkGetAccount: async (loginData) => {
            if (loginData && Object.keys(loginData).length === 2) {
                if (String(loginData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(loginData.password)) {
                    loginData.email = String(loginData.email);
                    loginData.password = cipher.hashPassword(String(loginData.password));
                    
                    const result = await database.getAccount(loginData.email, loginData.password);

                    if (result) {
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
        getActivities: async () => {
            const result = await database.getActivities();

            if (result) {
                return result;
            }
            else {
                return null;
            }
        },
        checkGetContents: async (inputData) => {
            if (inputData && Object.keys(inputData).length === 2) {
                if (String(inputData.category) && String(inputData.difficulty)) {
                    inputData.category = String(inputData.category);
                    inputData.difficulty = String(inputData.difficulty);

                    const result = await database.getContents(inputData.category, inputData.difficulty);

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
                if (String(inputData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(inputData.password) && inputData.patientData && Object.keys(inputData.patientData).length === 4) {
                    if (inputData.patientData.name && inputData.patientData.surname && inputData.patientData.age && inputData.patientData.notes !== null && inputData.patientData.notes !== undefined) {
                        inputData.email = String(inputData.email);
                        inputData.password = cipher.hashPassword(String(inputData.password));
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
                    if (inputData.patientData.id && inputData.patientData.name && inputData.patientData.surname && inputData.patientData.age && inputData.patientData.notes !== null && inputData.patientData.notes !== undefined) {
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
        checkGetPatient: async (inputData) => {
            if (inputData && Object.keys(inputData).length === 3) {
                if (String(inputData.patientId) && String(inputData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(inputData.password)) {
                    inputData.patientId = 0 ? isNaN(parseInt(inputData.patientId)) : parseInt(inputData.patientId);
                    inputData.email = String(inputData.email);
                    inputData.password = cipher.hashPassword(String(inputData.password));
                
                    const result = await database.getPatient(inputData.patientId, inputData.email, inputData.password);

                    if (result.length === 1) {
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
        checkSaveSessionScore: async (loginData) => {
            if (loginData && Object.keys(loginData).length === 3) {
                if (String(loginData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(loginData.password) && parseInt(loginData.sessionData.patientId) && String(loginData.sessionData.playDate) && parseInt(loginData.sessionData.score)) {
                    loginData.email = String(loginData.email);
                    loginData.password = cipher.hashPassword(String(loginData.password));
                    loginData.sessionData.score = 0 ? isNaN(parseInt(loginData.sessionData.score)) : parseInt(loginData.sessionData.score);
                    loginData.sessionData.playDate = String(loginData.sessionData.playDate);
                    loginData.sessionData.patientId = 0 ? isNaN(parseInt(loginData.sessionData.patientId)) : parseInt(loginData.sessionData.patientId);
                    
                    const result = await database.saveSessionScore(loginData.sessionData, loginData.email, loginData.password);

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
        checkGetSessionsScores: async (loginData) => {
            if (loginData && Object.keys(loginData).length === 3) {
                if (String(loginData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(loginData.password) && parseInt(loginData.patientId)) {
                    loginData.email = String(loginData.email);
                    loginData.password = cipher.hashPassword(String(loginData.password));
                    loginData.patientId = 0 ? isNaN(parseInt(loginData.patientId)) : parseInt(loginData.patientId);
                    
                    const result = await database.getSessionsScores(loginData.patientId, loginData.email, loginData.password);

                    if (result) {
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
        checkSaveCurrentSession: async (loginData) => {
            if (loginData && Object.keys(loginData).length === 4) {
                if (String(loginData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(loginData.password) && loginData.session && parseInt(loginData.patientId)) {
                    loginData.email = String(loginData.email);
                    loginData.password = cipher.hashPassword(String(loginData.password));
                    loginData.patientId = 0 ? isNaN(parseInt(loginData.patientId)) : parseInt(loginData.patientId);
                    loginData.session.forEach(e => {
                        if (!e.name || !e.maxmediumscore || e.times < 1) {
                            return false;
                        }
                    });

                    loginData.session.forEach(async (e, i) => {
                        const result = await database.saveCurrentSession(e, i, loginData.patientId, loginData.email, loginData.password);

                        if (result !== 1) {
                            return false;
                        }
                    });

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
        checkClearCurrentSession: async (loginData) => {
            if (loginData && Object.keys(loginData).length === 3) {
                if (String(loginData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(loginData.password) && parseInt(loginData.patientId)) {
                    loginData.email = String(loginData.email);
                    loginData.password = cipher.hashPassword(String(loginData.password));
                    loginData.patientId = 0 ? isNaN(parseInt(loginData.patientId)) : parseInt(loginData.patientId);
                    
                    await database.clearCurrentSession(loginData.patientId, loginData.email, loginData.password);
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
        checkGetCurrentSession: async (loginData) => {
            if (loginData && Object.keys(loginData).length === 3) {
                if (String(loginData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(loginData.password) && parseInt(loginData.patientId)) {
                    loginData.email = String(loginData.email);
                    loginData.password = cipher.hashPassword(String(loginData.password));
                    loginData.patientId = 0 ? isNaN(parseInt(loginData.patientId)) : parseInt(loginData.patientId);

                    const result = await database.getCurrentSession(loginData.patientId, loginData.email, loginData.password);

                    if (result) {
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
    };
};

module.exports = generateBusiness;