const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const database = require("./database");
const crypto = require("crypto");

const app = express();

database.createTables();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/bulma", express.static(path.join(__dirname, "../node_modules/bulma"))); // permette accesso a Bulma all"applicazione lato client
app.use("/assets", express.static(path.join(__dirname, "assets")))
app.use("/", express.static(path.join(__dirname, "public")));

app.post("/login", async (request, response) => {
    try {
        const loginData = request.body;

        const result = await database.login(loginData.email, crypto.createHash("sha256").update(loginData.password).digest("base64"));

        if (result.length === 1) {
            response.json({result: true});
        }
        else {
            response.json({result: false})
        }
    }
    catch (e) {
        console.error("Login error: " + e);
        response.status(500).json({result: false});
    }
});

app.post("/register", async (request, response) => {
    try {
        const registerData = request.body;

        
    }
    catch (e) {
        console.error("Register error: " + e);
        response.status(500).json({result: false});
    }
});

app.put("/edit-account", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Edit error: " + e);
        response.status(500).json({result: false});
    }
});

app.post("/delete-account", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Deletion error: " + e);
        response.status(500).json({result: false});
    }
});

app.get("/activities", async (request, response) => {
    try {
        response.json({activities: {a:"a", b:"b"}})
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({activities: null});
    }
});

app.post("/create-activity", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

app.put("/edit-activity", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

app.post("/delete-activity", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

app.get("/get-activity/:id", async (request, response) => {
    try {
        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: null});
    }
});

app.post("/contents", async (request, response) => {
    try {
        
    }
    catch (e) {
        console.error("Register error: " + e);
        response.status(500).json({result: false});
    }
});

app.post("/all-patients", async (request, response) => {
    try {
        const loginData = request.body;

    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: null});
    }
});

app.post("/create-patient", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

app.put("/edit-patient", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

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

app.post("/all-contents", async (request, response) => {
    try {
        const loginData = request.body;

    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: null});
    }
});

app.post("/create-content", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

app.put("/edit-content", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

app.post("/delete-content", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

app.post("/get-content", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: null});
    }
});

app.put("/edit-user", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

app.post("/delete-user", async (request, response) => {
    try {
        const patientData = request.body;

        
    }
    catch (e) {
        console.error("Server error: " + e);
        response.status(500).json({result: false});
    }
});

app.post("/get-user", async (request, response) => {
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