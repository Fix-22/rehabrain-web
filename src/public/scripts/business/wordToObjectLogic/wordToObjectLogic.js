export const generateWordToObjectLogic = (pubsub) => {
    let config;

    const wordToObjectLogic = {
        build: (inptuConfig) => {
            config = inptuConfig;

            pubsub.subscribe(config.name + "-start", () => {
                location.href = "#" + config.id;
            });
        }
    };

    return wordToObjectLogic;
};