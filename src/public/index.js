import { generatePubSub } from "/scripts/pubsub/pubsub.js";
import { generateNavigator } from "/scripts/view/navigator/navigator.js";
import { generateMiddleware } from "/scripts/middleware/middleware.js";
import { generateActivitiesList } from "/scripts/view/activitiesList/activitiesList.js";
import { generateActivitiesManager } from "/scripts/presentation/activitiesManager/activitiesManager.js";
import { generateSearchbar } from "/scripts/view/searchbar/searchbar.js";
import { generateCurrentSession } from "/scripts/view/currentSession/currentSession.js";
import { generateSessionManager } from "/scripts/presentation/sessionManager/sessionManager.js";
import { generateAuthenticator } from "/scripts/presentation/authenticator/authenticator.js";
import { generateLoginForm } from "/scripts/view/loginForm/loginForm.js";
import { generateRegisterForm } from "/scripts/view/registerForm/registerForm.js";
import { generateNavbar } from "/scripts/view/navbar/navbar.js";
import { generatePatientsList } from "/scripts/view/patientsList/patientsList.js";
import { generatePatientsManager } from "/scripts/presentation/patientsManager/patientsManager.js";
import { generateDashboard } from "/scripts/view/dashboard/dashboard.js";
import { generatePersonalInfoModal } from "/scripts/view/personalInfoModal/personalInfoModal.js";
import { generateUsersManager } from "/scripts/presentation/usersManager/usersManager.js";
import { generateBulmaEventsHandler } from "/scripts/view/bulmaEventsHandler/bulmaEventsHandler.js";
import { generatePatientInfoModal } from "/scripts/view/patientInfoModal/patientInfoModal.js";
import { generatePatientInfoManager } from "/scripts/presentation/patientInfoManager/patientInfoManager.js";

const pubsub = generatePubSub();

generateNavigator(document.getElementById("pages"), pubsub);

// MODEL (middleware che prende i dati dal model decentrato)
const middleware = generateMiddleware();

// PRESENTERS
const activitiesManager = generateActivitiesManager(middleware);
const sessionManager = generateSessionManager(middleware, pubsub);
await sessionManager.build();
const authenticator = generateAuthenticator(middleware, pubsub);
authenticator.build();
const patientsManager = generatePatientsManager(middleware, pubsub);
patientsManager.build();
const usersManager = generateUsersManager(middleware, pubsub);
usersManager.build();
const patientInfoManager = generatePatientInfoManager(middleware, pubsub);
patientInfoManager.build();

// VIEWS

const matchPage = () => {
    const url = new URL(document.location.href);
    const pageName = url.hash.replace("#", "");

    switch (pageName) {
        case "":
        case "home":
        case "register":
        case "login":
            navbar.render([
                {
                    class: "is-link",
                    link: "#dashboard",
                    icon: '<i class="fa-solid fa-puzzle-piece"></i>',
                    text: "Dashboard"
                }
            ]);
            break;

        case "dashboard":
            if (authenticator.isLogged()) {
                navbar.render([
                    {
                        class: "is-link",
                        link: "#home",
                        icon: '<i class="fa-solid fa-house"></i>',
                        text: "Home"
                    },
                    {
                        class: "is-light",
                        icon: '<i class="fa-solid fa-circle-user"></i>',
                        text: "Informazioni personali",
                        dataTarget: "personalInfoModal"
                    },
                    {
                        id: "logoutButton",
                        class: "is-danger",
                        icon: '<i class="fa-solid fa-door-open"></i>',
                        text: "Esci",
                        dataTarget: ""
                    }
                ]);
            }
            else {
                navbar.render([
                    {
                        class: "is-link",
                        link: "#home",
                        icon: '<i class="fa-solid fa-house"></i>',
                        text: "Home"
                    },
                    {
                        class: "is-link",
                        link: "#login",
                        icon: '<i class="fa-solid fa-right-to-bracket"></i>',
                        text: "Entra"
                    }
                ]);
            }
            break;
    }
};

// navbar
const navbarContainer = document.getElementById("navbarContainer");
const navbar = generateNavbar(navbarContainer, pubsub);
matchPage();
pubsub.subscribe("navbarButton-onclick", id => {
    if (id === "logoutButton") {
        usersManager.logout();
        pubsub.publish("view-logout-success");
    }
});

// dashboard
const dashboard = generateDashboard(pubsub);
dashboard.build(document.getElementById("sidebar"), document.getElementById("info"), document.getElementById("activities"));

// authentication
const loginFormContainer = document.getElementById("loginFormContainer");
const loginForm = generateLoginForm(authenticator, loginFormContainer, pubsub);
loginForm.build("loginForm")
loginForm.render();

const registerFormContainer = document.getElementById("registerFormContainer");
const registerForm = generateRegisterForm(authenticator, registerFormContainer, pubsub);
registerForm.build("registerForm")
registerForm.render();

// activities
const activitiesSearchbarContainer = document.getElementById("activitiesSearchbarContainer");
const activitiesSearchbar = generateSearchbar(activitiesSearchbarContainer, pubsub);
activitiesSearchbar.build("activitiesSearchbar", "Cerca attività da aggiungere");
activitiesSearchbar.render();

const activitiesListContainer = document.getElementById("activtiesListContainer");
const activitiesList = generateActivitiesList(activitiesManager, activitiesListContainer, pubsub);
await activitiesList.build("activitiesList", "activitiesSearchbar");
activitiesList.render();

const currentSessionSearchbarContainer = document.getElementById("currentSessionSearchbarContainer");
const currentSessionSearchbar = generateSearchbar(currentSessionSearchbarContainer, pubsub);
currentSessionSearchbar.build("currentSessionSearchbar", "Cerca attività");
currentSessionSearchbar.render();

const currentSessionContainer = document.getElementById("currentSessionContainer");
const currentSession = generateCurrentSession(sessionManager, currentSessionContainer, pubsub);
await currentSession.build("currentSession", "currentSessionSearchbar", false);
currentSession.render();

// patients
const patientsSearchbarContainer = document.getElementById("patientsSearchbarContainer");
const patientsSearchbar = generateSearchbar(patientsSearchbarContainer, pubsub);
patientsSearchbar.build("patientsSearchbar", "Cerca attività");
patientsSearchbar.render();

const patientsListContainer = document.getElementById("patientsListContainer");
const patientsList = generatePatientsList(patientsManager, patientsListContainer, pubsub);
await patientsList.build("patientsList");
patientsList.render()

// modali
const personalInfoModalContainer = document.getElementById("personalInfoModalContainer");
const personalInfoModal = generatePersonalInfoModal(usersManager, personalInfoModalContainer, pubsub); 
await personalInfoModal.build("personalInfoModal");
personalInfoModal.render();

const patientInfoModalContainer = document.getElementById("patientInfoModalContainer");
const patientInfoModal = generatePatientInfoModal(patientInfoManager, patientInfoModalContainer, pubsub); 
patientInfoModal.build("patientInfoModal");
patientInfoModal.render();

// gestione testo footer
document.getElementById("footerText").innerHTML = '© ' + new Date().getFullYear() + ' Simone Cecire. Il codice sorgente è protetto da licenza <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache-2.0</a>. I contenuti del sito sono protetti da licenza <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>.';

pubsub.subscribe("usersManager-logout-success", matchPage);
window.addEventListener("popstate", matchPage);

// gestione eventi Bulma
const bulmaEventsHandler = generateBulmaEventsHandler(pubsub);
bulmaEventsHandler.build();
bulmaEventsHandler.mapNavbar();
bulmaEventsHandler.mapModals();

window.addEventListener("popstate", bulmaEventsHandler.mapModals);