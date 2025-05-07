export class ActivityLogic {
    #config;
    #pubsub;

    constructor(config, pubsub) {
        this.#config = config;
        this.#pubsub = pubsub;

        this.#pubsub.subscribe(this.#config.name + "-start", () => {
            this.render();
            location.href = "#" + this.#config.id;
        });
    }

    render() {
        throw new Error("Render must be implemented");
    }
/*    solve() {
        throw new Error("Solve must be implemented");
    }
    restart() {
        throw new Error("Restart must be implemented");
    }
    goForward() {
        throw new Error("Go forward must be implemented");
    }
    goBack() {
        throw new Error("Go back must be implemented");
    }*/
};