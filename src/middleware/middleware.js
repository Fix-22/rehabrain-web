const generateMiddleware = (business) => {
    return {
        login: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkLogin(loginData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Login error: " + e);
                response.status(500).json({result: false});
            }
        },
        
        register: async (request, response) => {
            try {
                const userData = request.body.userData;
                const result = await business.checkRegister(userData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Register error: " + e);
                response.status(500).json({result: false});
            }
        },
        
        editAccount: async (request, response) => {
            try {
                const personalData = request.body.personalData;
                const result = await business.checkEditAccount(personalData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Edit account error: " + e);
                response.status(500).json({result: false});
            }
        },
        
        deleteAccount: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkDeleteAccount(loginData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Login error: " + e);
                response.status(500).json({result: false});
            }
        },
        
        getAccount: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkGetAccount(loginData);
        
                if (result) {
                    response.json({result: result});
                }
                else {
                    response.json({result: null});
                }
            }
            catch (e) {
                console.error("Account get error: " + e);
                response.status(500).json({result: null});
            }
        },
        
        getActivities: async (request, response) => {
            try {
                const result = await business.getActivities();
        
                if (result) {
                    response.json({result: result});
                }
                else {
                    console.error("Error while sending activities: " + e);
                    response.status(500).json({result: null});
                }
            }
            catch (e) {
                console.error("Error while sending activities: " + e);
                response.status(500).json({result: null});
            }
        },
        
        getContents: async (request, response) => {
            try {
                const inputData = request.body;
                const result = await business.checkGetContents(inputData);
        
                if (result) {
                    response.json({result: result});
                }
                else {
                    console.error("Error while sending contents: " + e);
                    response.status(500).json({result: null});
                }
            }
            catch (e) {
                console.error("Error while sending contents: " + e);
                response.status(500).json({result: null});
            }
        },
        
        getAllPatients: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkGetAllPatients(loginData);
        
                if (result) {
                    response.json({result: result});
                }
                else {
                    response.json({result: null});
                }
            }
            catch (e) {
                console.error("Error while getting patients: " + e);
                response.status(500).json({result: null});
            }
        },
        
        createPatient: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkCreatePatient(loginData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Error while creating patient: " + e);
                response.status(500).json({result: false});
            }
        },
        
        editPatient: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkEditPatient(loginData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Error while editing patient: " + e);
                response.status(500).json({result: false});
            }
        },
        
        deletePatient: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkDeletePatient(loginData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Error while editing patient: " + e);
                response.status(500).json({result: false});
            }
        },
        
        getPatient: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkGetPatient(loginData);
        
                if (result) {
                    response.json({result: result});
                }
                else {
                    response.json({result: null});
                }
            }
            catch (e) {
                console.error("Error while getting patient: " + e);
                response.status(500).json({result: null});
            }
        },
        
        saveSessionScore: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkSaveSessionScore(loginData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Error while saving session: " + e);
                response.status(500).json({result: false});
            }
        },

        deleteSessionScore: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkDeleteSessionScore(loginData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Error while deleting session: " + e);
                response.status(500).json({result: false});
            }
        },
        
        getSessionsScores: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkGetSessionsScores(loginData);
        
                if (result) {
                    response.json({result: result});
                }
                else {
                    response.json({result: null});
                }
            }
            catch (e) {
                console.error("Error while geting sessions: " + e);
                response.status(500).json({result: null});
            }
        },
        
        
        saveCurrentSession: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkSaveCurrentSession(loginData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Error while saving current session: " + e);
                response.status(500).json({result: false});
            }
        },
        
        clearCurrentSession: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkClearCurrentSession(loginData);
        
                if (result) {
                    response.json({result: true});
                }
                else {
                    response.json({result: false});
                }
            }
            catch (e) {
                console.error("Error while saving current session: " + e);
                response.status(500).json({result: false});
            }
        },
        
        getCurrentSession: async (request, response) => {
            try {
                const loginData = request.body;
                const result = await business.checkGetCurrentSession(loginData);
        
                if (result) {
                    response.json({result: result});
                }
                else {
                    response.json({result: null});
                }
            }
            catch (e) {
                console.error("Error while getting current session: " + e);
                response.status(500).json({result: null});
            }
        }
    };
};

module.exports = generateMiddleware;