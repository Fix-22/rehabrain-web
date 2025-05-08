export const generateWordToObjectPresenter = (business, pubsub) => {
    const wordToObjectPresent = {
        build: () => {

        },
        checkCorrectSelection: (id) => {
            if (id) {
                return business.checkCorrectSelection(id);
            }
            else {
                return false;
            }
        },
        solve: () => {
            business.solve();
        },
        restart: async () => {
            await business.restart();
        },
        getId: () => {
            return business.getId();
        },
        getWord: () => {
            return business.getWord();
        },
        getObjectsList: () => {
            return business.getObjectsList();
        },
        isStarted: () => {
            return business.isStarted();
        }
    };

    return wordToObjectPresent;
};