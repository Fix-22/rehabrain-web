const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/bulma", express.static(path.join(__dirname, "../node_modules/bulma"))); // permette accesso a Bulma all"applicazione lato client
app.use("/assets", express.static(path.join(__dirname, "assets")))
app.use("/", express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const port = 5600;

server.listen(port, () => {
    console.log("RehaBrain server running on port " +  port + "...")
});