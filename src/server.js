const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const business = require("./business");

const app = express();

const login = async (request, response) => {
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
};

const register = async (request, response) => {
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
};

const editAccount = async (request, response) => {
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
};

const deleteAccount = async (request, response) => {
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
};

const getActivities = async (request, response) => {
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
};



const getAllPatients = async (request, response) => {
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
};

const createPatient = async (request, response) => {
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
};

const editPatient = async (request, response) => {
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
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/bulma", express.static(path.join(__dirname, "../node_modules/bulma"))); // permette accesso a Bulma all"applicazione lato client
app.use("/assets", express.static(path.join(__dirname, "assets")))
app.use("/", express.static(path.join(__dirname, "public")));

app.post("/login", login);

app.post("/register", register);

app.put("/edit-account", editAccount);

app.post("/delete-account", deleteAccount);

app.get("/activities", getActivities);

app.post("/contents", async (request, response) => {
    try {
        
    }
    catch (e) {
        console.error("Register error: " + e);
        response.status(500).json({result: false});
    }
});

app.post("/all-patients", getAllPatients);

app.post("/create-patient", createPatient);

app.put("/edit-patient", editPatient);

app.post("/delete-patient", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

app.post("/get-patient", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: null});
    }
});

const server = http.createServer(app);
const port = 5600;

server.listen(port, () => {
    console.log("RehaBrain server running on port " +  port + "...")
});