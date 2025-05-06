const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const fs = require("fs");

const conf = JSON.parse(fs.readFileSync("conf.json"));
conf.db.ssl.ca = fs.readFileSync("./ca.pem");

const generateDatabase = require("./persistance/database");
const database = generateDatabase();
database.build(conf.db);
database.createTables();

const generateCipher = require("./business/cipher");
const cipher = generateCipher();

const generateMailer = require("./middleware/mailer");
const mailer = generateMailer();
mailer.build(conf.email, "RehaBrain", "info@rehabrain.eu");

const generateBusiness = require("./business/business");
const business = generateBusiness(database, cipher, mailer);

const generateMiddleware = require("./middleware/middleware");
const middleware = generateMiddleware(business);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/bulma", express.static(path.join(__dirname, "../node_modules/bulma"))); // permette accesso a Bulma all"applicazione lato client
app.use("/chart.js", express.static(path.join(__dirname, "../node_modules/chart.js"))); // permette accesso a Bulma all"applicazione lato client
app.use("/assets", express.static(path.join(__dirname, "assets")))
app.use("/", express.static(path.join(__dirname, "public")));

app.post("/login", middleware.login);

app.post("/register", middleware.register);

app.put("/edit-account", middleware.editAccount);

app.post("/delete-account", middleware.deleteAccount);

app.post("/get-account", middleware.getAccount);

app.get("/activities", middleware.getActivities);

app.post("/contents", middleware.getContents);

app.post("/all-patients", middleware.getAllPatients);

app.post("/create-patient", middleware.createPatient);

app.put("/edit-patient", middleware.editPatient);

app.post("/delete-patient", middleware.deletePatient);

app.post("/get-patient", middleware.getPatient);

app.post("/save-session-score", middleware.saveSessionScore);

app.post("/get-sessions-scores", middleware.getSessionsScores);

app.post("/save-current-session", middleware.saveCurrentSession);

app.post("/clear-current-session", middleware.clearCurrentSession);

app.post("/get-current-session", middleware.getCurrentSession);

const server = http.createServer(app);
const port = 5600;

server.listen(port, () => {
    console.log("RehaBrain server running on port " +  port + "...")
});