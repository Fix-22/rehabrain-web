import { generatePubSub } from "/scripts/pubsub/pubsub.js";
import { generateNavigator } from "/scripts/view/navigator/navigator.js";
import { generateMiddleware } from "/scripts/middleware/middleware.js";
import { generateActivitiesList } from "/scripts/view/activitiesList/activitiesList.js";
import { generateActivitiesPresenter } from "/scripts/presentation/activitiesPresenter/activitiesPresenter.js";
import { generateSearchbar } from "/scripts/view/searchbar/searchbar.js";
import { generateCurrentSession } from "/scripts/view/currentSession/currentSession.js";
import { generateSessionPresenter } from "/scripts/presentation/sessionPresenter/sessionPresenter.js";
import { generateAuthenticator } from "/scripts/presentation/authenticator/authenticator.js";
import { generateLoginForm } from "/scripts/view/loginForm/loginForm.js";
import { generateRegisterForm } from "/scripts/view/registerForm/registerForm.js";
import { generateNavbar } from "/scripts/view/navbar/navbar.js";
import { generatePatientsList } from "/scripts/view/patientsList/patientsList.js";
import { generatePatientsPresenter } from "/scripts/presentation/patientsPresenter/patientsPresenter.js";
import { generateDashboard } from "/scripts/view/dashboard/dashboard.js";
import { generatePersonalInfoModal } from "/scripts/view/personalInfoModal/personalInfoModal.js";
import { generateUsersPresenter } from "/scripts/presentation/usersPresenter/usersPresenter.js";
import { generateBulmaEventsHandler } from "/scripts/view/bulmaEventsHandler/bulmaEventsHandler.js";
import { generatePatientInfoModal } from "/scripts/view/patientInfoModal/patientInfoModal.js";
import { generatePatientInfoPresenter } from "/scripts/presentation/patientInfoPresenter/patientInfoPresenter.js";
import { generateButton } from "/scripts/view/button/button.js";
import { generatePatientCreationModal } from "/scripts/view/patientCreationModal/patientCreationModal.js";
import { generateSessionLogic } from "/scripts/business/sessionLogic/sessionLogic.js";
import { generateWordToObjectLogic } from "/scripts/business/wordToObjectLogic/wordToObjectLogic.js";
import { generateWordToObjectPresenter } from "/scripts/presentation/wordToObjectPresenter/wordToObjectPresenter.js";
import { generateWordToObjectView } from "/scripts/view/wordToObjectView/wordToObjectView.js";
import { generateResultsPresenter } from "/scripts/presentation/resultsPresenter/resultsPresenter.js";
import { generateResults } from "/scripts/view/results/results.js";

const pubsub = generatePubSub();

generateNavigator(document.getElementById("pages"), pubsub);

// MIDDLEWARE
const middleware = generateMiddleware();

// BUSINESS
const sessionLogic = generateSessionLogic(pubsub);
sessionLogic.build();

const wordToObjectLogic = generateWordToObjectLogic(middleware, pubsub);
wordToObjectLogic.build({name: "Abbinamento oggetto-parola"});

// PRESENTATION
const wordToObjectPresenter = generateWordToObjectPresenter(wordToObjectLogic, pubsub);

const activitiesPresenter = generateActivitiesPresenter(middleware);

const sessionPresenter = generateSessionPresenter(middleware, sessionLogic, pubsub);
await sessionPresenter.build();

const authenticator = generateAuthenticator(middleware, pubsub);
authenticator.build();

const patientsPresenter = generatePatientsPresenter(middleware, pubsub);
patientsPresenter.build();

const usersPresenter = generateUsersPresenter(middleware, pubsub);
usersPresenter.build();

const patientInfoPresenter = generatePatientInfoPresenter(middleware, pubsub);
patientInfoPresenter.build();

const resultsPresenter = generateResultsPresenter(sessionLogic, pubsub);
resultsPresenter.build();

// VIEW

const matchPage = () => {
    const url = new URL(document.location.href);
    const pageName = url.hash.replace("#", "");

    switch (pageName) {
        case "":
        case "session":
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
        usersPresenter.logout();
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
const activitiesList = generateActivitiesList(activitiesPresenter, activitiesListContainer, pubsub);
await activitiesList.build("activitiesList", "activitiesSearchbar");
activitiesList.render();

const currentSessionSearchbarContainer = document.getElementById("currentSessionSearchbarContainer");
const currentSessionSearchbar = generateSearchbar(currentSessionSearchbarContainer, pubsub);
currentSessionSearchbar.build("currentSessionSearchbar", "Cerca attività");
currentSessionSearchbar.render();

const currentSessionContainer = document.getElementById("currentSessionContainer");
const currentSession = generateCurrentSession(sessionPresenter, currentSessionContainer, pubsub);
await currentSession.build("currentSession", "currentSessionSearchbar", false);
currentSession.render();

// patients
const patientsSearchbarContainer = document.getElementById("patientsSearchbarContainer");
const patientsSearchbar = generateSearchbar(patientsSearchbarContainer, pubsub);
patientsSearchbar.build("patientsSearchbar", "Cerca pazienti");
patientsSearchbar.render();

const addPatientButtonContainer = document.getElementById("addPatientButtonContainer");
const addPatientButton = generateButton(addPatientButtonContainer, pubsub);
addPatientButton.build({id: "addPatientButton", classList: ["button", "is-link", "js-modal-trigger"], text: "", icon: '<i class="fa-solid fa-plus"></i>', dataTarget: "patientCreationModal"});
addPatientButton.render();

const patientsListContainer = document.getElementById("patientsListContainer");
const patientsList = generatePatientsList(patientsPresenter, patientsListContainer, pubsub);
await patientsList.build("patientsList");
patientsList.render()

// attività
const activityContent = document.getElementById("activityContent");

const activityGoForwardContainer = document.getElementById("activityGoForwardContainer");
const activityGoForward = generateButton(activityGoForwardContainer, pubsub);
activityGoForward.build({id: "activityGoForward", classList: ["button", "is-link"], text: "Avanti", icon: '<i class="fa-solid fa-arrow-right"></i>', disabled: true, subscribedEvents: {"view-activity-started": activityGoForward.disable, "view-activity-stopped": activityGoForward.enable}});
activityGoForward.render();

const activitySolveContainer = document.getElementById("activitySolveContainer");
const activitySolve = generateButton(activitySolveContainer, pubsub);
activitySolve.build({id: "activitySolve", classList: ["button", "is-warning"], text: "Risolvi", icon: '<i class="fa-solid fa-lightbulb"></i>', disabled: true, subscribedEvents: {"view-activity-started": activitySolve.enable, "view-activity-stopped": activitySolve.disable}});
activitySolve.render();

const activityRestartContainer = document.getElementById("activityRestartContainer");
const activityRestart = generateButton(activityRestartContainer, pubsub);
activityRestart.build({id: "activityRestart", classList: ["button", "is-primary"], text: "Riavvia", icon: '<i class="fa-solid fa-rotate-right"></i>', disabled: true, subscribedEvents: {"view-activity-started": activityRestart.enable}});
activityRestart.render();

const wordToObjectView = generateWordToObjectView(wordToObjectPresenter, activityContent, pubsub);
wordToObjectView.build();

// risultati
const resultsContainer = document.getElementById("resultsContainer");
const results = generateResults(resultsPresenter, resultsContainer, pubsub);
results.build();

// modali
const personalInfoModalContainer = document.getElementById("personalInfoModalContainer");
const personalInfoModal = generatePersonalInfoModal(usersPresenter, personalInfoModalContainer, pubsub); 
await personalInfoModal.build("personalInfoModal");
personalInfoModal.render();

const patientInfoModalContainer = document.getElementById("patientInfoModalContainer");
const patientInfoModal = generatePatientInfoModal(patientInfoPresenter, patientInfoModalContainer, pubsub); 
patientInfoModal.build("patientInfoModal");
patientInfoModal.render();

const patientCreationModalContainer = document.getElementById("patientCreationModalContainer");
const patientCreationModal = generatePatientCreationModal(patientInfoPresenter, patientCreationModalContainer, pubsub); 
patientCreationModal.build("patientCreationModal");
patientCreationModal.render();

// gestione testo footer
document.getElementById("footerText").innerHTML = '© ' + new Date().getFullYear() + ' Simone Cecire. Il codice sorgente è protetto da licenza <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache-2.0</a>. I contenuti del sito sono protetti da licenza <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>.';

pubsub.subscribe("usersPresenter-logout-success", matchPage);
pubsub.subscribe("view-logout-success", matchPage);
window.addEventListener("popstate", matchPage);

// gestione eventi Bulma
const bulmaEventsHandler = generateBulmaEventsHandler(pubsub);
bulmaEventsHandler.build();
bulmaEventsHandler.mapNavbar();
bulmaEventsHandler.mapModals();

window.addEventListener("popstate", bulmaEventsHandler.mapModals);