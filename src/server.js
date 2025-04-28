const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const crypto = require("crypto");
const business = require("./business");

const app = express();

const login = async (request, response) => {
    try {
        const loginData = request.body;

        if (business.checkLogin(loginData)) {
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/bulma", express.static(path.join(__dirname, "../node_modules/bulma"))); // permette accesso a Bulma all"applicazione lato client
app.use("/assets", express.static(path.join(__dirname, "assets")))
app.use("/", express.static(path.join(__dirname, "public")));

app.post("/login", login);

app.post("/register", async (request, response) => {
    try {
        const userData = request.body.userData;

        if (userData && Object.keys(userData).length === 4) {
            if (String(userData.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && String(userData.password) && String(userData.name) && String(userData.surname)) {
                userData.email = String(userData.email);
                userData.password = crypto.createHash("sha256").update(String(userData.password)).digest("base64");
                userData.name = String(userData.name);
                userData.surname = String(userData.surname);
                
                const result = await database.register(userData);

                if (result) {
                    response.json({result: true});
                }
                else {
                    response.status(500).json({result: false});
                }
            }
            else {
                console.error("Register error: invalid data inside userData");
                response.status(500).json({result: false});
            }
        }
        else {
            console.error("Register error: invalid length of userData");
            response.status(500).json({result: false});
        }
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

const server = http.createServer(app);
const port = 5600;

server.listen(port, () => {
    console.log("RehaBrain server running on port " +  port + "...")
});