export const generateWordToObjectLogic = (middleware, pubsub) => {
    let config, difficulty, word, objectsList, isStarted, maxScore, currentScore;

    const wordToObjectLogic = {
        build: (inptuConfig) => {
            config = inptuConfig;
            isStarted = false;

            pubsub.subscribe(config.name + "-start", async (settings) => {
                maxScore = settings.maxscore;
                await wordToObjectLogic.start(settings.difficulty, maxScore);
                isStarted = true;
                
                location.href = "#session";
            });
        },
        start: async (inputDifficulty, inputCurrentScore) => {
            difficulty = inputDifficulty;
            currentScore = inputCurrentScore;

            let n;

            if (difficulty === "Low") {
                n = 3;
            }
            else if (difficulty === "Medium") {
                n = 4;
            }
            else {
                n = 5
            }

            const result = await middleware.getContents(n, difficulty);
            
            if (result) {
                result.forEach(dict => {
                    Object.keys(dict).forEach(k => {
                        dict[k.toLowerCase()] = dict[k];
                        delete dict[k];
                    });
                });
                
                objectsList = result;

                const idx = Math.floor(Math.random() * objectsList.length);
                word = objectsList[idx].name;
                objectsList[idx].correct = true;
            }
            else {
                objectsList = [];
                word = null;
            }
        },
        checkCorrectSelection: (name) => {
            if (name) {
                if (name === word) {
                    isStarted = false;
                    console.log(currentScore)
                    return true;
                }
                else {
                    currentScore -= Math.floor(currentScore * 0.05);
                    return false;
                }
            }
            else {
                return false;
            }
        },
        goForward: () => {
            if (!isStarted) {
                pubsub.publish("update-session-score", currentScore);
                pubsub.publish("session-go-forward");
            }
        },
        solve: () => {
            currentScore -= Math.floor(currentScore * 0.5);
            isStarted = false;
        },
        restart: async () => {
            isStarted = true;
            await wordToObjectLogic.start(difficulty, maxScore);
        },
        getWord: () => {
            return word;
        },
        getObjectsList: () => {
            return objectsList;
        },
        isStarted: () => {
            return isStarted;
        }
    };

    return wordToObjectLogic;
};