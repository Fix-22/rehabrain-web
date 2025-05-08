export const generateWordToObjectLogic = (pubsub) => {
    let config, word="apple", objectsList=[{id: "aaa", path:"assets/images/apple.png", value:"apple"}, {id: "b", path:"assets/images/car.png", value:"car", correct: true}, {id: "dog", path:"assets/images/dog.png", value:"dog"}];

    const wordToObjectLogic = {
        build: (inptuConfig) => {
            config = inptuConfig;

            pubsub.subscribe(config.name + "-start", () => {
                location.href = "#" + config.id;
            });
        },
        checkCorrectSelection: (id) => {
            if (id) {
                if (objectsList.find(e => e.id === id && e.correct)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        },
        solve: () => {
            return objectsList.find(e => e.correct === true);
        },
        getId: () => {
            return config.id;
        },
        getWord: () => {
            return word;
        },
        getObjectsList: () => {
            return objectsList;
        }
    };

    return wordToObjectLogic;
};