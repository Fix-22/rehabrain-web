export const generateDashboard = (pubsub) => {
    return {
        build: (sidebar, info, activities) => {
            if (sessionStorage.getItem("isLogged")) {
                sidebar.classList.remove("is-hidden");
                info.classList.add("is-hidden");
                activities.classList.add("is-hidden");
            }

            pubsub.subscribe("view-login-success", credentials => {
                sidebar.classList.remove("is-hidden");
                info.classList.add("is-hidden");
                activities.classList.add("is-hidden");
            });

            pubsub.subscribe("view-logout-success", () => {
                sidebar.classList.add("is-hidden");
                info.classList.remove("is-hidden");
                activities.classList.remove("is-hidden");
            });

            pubsub.subscribe("patientsList-onpatientselect", patientId => {
                sidebar.classList.remove("is-hidden");
                info.classList.add("is-hidden");
                activities.classList.remove("is-hidden");
            });
        }
    };
}