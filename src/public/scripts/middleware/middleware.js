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

        // moderatore
        getAllContents: async (email, password) => {
            try {
                const response = await fetch("/all-contents", {
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
        createContent: async (contentData, email, password) => {
            try {
                const response = await fetch("/create-content", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        contentData: contentData,
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
        editContent: async (contentData, email, password) => {
            try {
                const response = await fetch("/edit-content", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        contentData: contentData,
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
        deleteContent: async (contentId, email, password) => {
            try {
                const response = await fetch("/delete-content", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        contentId: contentId,
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
        getContent: async (contentId, email, password) => {
            try {
                const response = await fetch("/get-content", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        contentId: contentId,
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

        editUser: async (userData, email, password) => {
            try {
                const response = await fetch("/edit-user", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        userData: userData,
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
        deleteUser: async (userEmail, email, password) => {
            try {
                const response = await fetch("/delete-user", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        userEmail: userEmail,
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
        getUser: async (userEmail, email, password) => {
            try {
                const response = await fetch("/get-user", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        userEmail: userEmail,
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
    };
};
