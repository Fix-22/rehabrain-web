export const generateMiddleware = () => {
    return {
        // personal account
        login: async (email, password) => {
            try {
                const response = await fetch("/login", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Login error: " + e);
            }
        },
        register: async (userData) => {
            try {
                const response = await fetch("/register", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        userData: userData
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Register error: " + e);
            }
        },
        editAccount: async (personalData) => {
            try {
                const response = await fetch("/edit-account", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        personalData: personalData
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Edit error: " + e);
            }
        },
        deleteAccount: async (email, password) => {
            try {
                const response = await fetch("/delete-account", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Deletion error: " + e);
            }
        },
        getAccount: async (email, password) => {
            try {
                const response = await fetch("/get-account", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Get account error: " + e);
            }
        },

        // activities
        getActivities: async () => {
            try {
                const response = await fetch("/activities");
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },

        // contents
        getContents: async (category, difficulty) => {
            try {
                const response = await fetch("/contents", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        category: category,
                        difficulty: difficulty
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },
        // caregiver
        getAllPatients: async (email, password) => {
            try {
                const response = await fetch("/all-patients", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },
        createPatient: async (patientData, email, password) => {
            try {
                const response = await fetch("/create-patient", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        patientData: patientData,
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },
        editPatient: async (patientData, email, password) => {
            try {
                const response = await fetch("/edit-patient", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        patientData: patientData,
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },
        deletePatient: async (patientId, email, password) => {
            try {
                const response = await fetch("/delete-patient", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        patientId: patientId,
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },
        getPatient: async (patientId, email, password) => {
            try {
                const response = await fetch("/get-patient", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        patientId: patientId,
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },
        saveSessionScore: async (sessionData, email, password) => {
            try {
                const response = await fetch("/save-session-score", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        sessionData: sessionData,
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },
        getSessionsScores: async (patientId, email, password) => {
            try {
                const response = await fetch("/get-sessions-scores", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        patientId: patientId,
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },
        saveCurrentSession: async (session, patientId, email, password) => {
            try {
                const response = await fetch("/save-current-session", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        session: session,
                        patientId: patientId,
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },
        clearCurrentSession: async (patientId, email, password) => {
            try {
                const response = await fetch("/clear-current-session", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        patientId: patientId,
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        },
        getCurrentSession: async (patientId, email, password) => {
            try {
                const response = await fetch("/get-current-session", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        patientId: patientId,
                        email: email,
                        password: password
                    })
                });
                const result = await response.json();
                
                return result.result;
            }
            catch (e) {
                console.error("Server error: " + e);
            }
        }
    };
};
