export const generateWordToObjectPresenter = (business, pubsub) => {
    const wordToObjectPresent = {
        checkCorrectSelection: (id) => {
            if (id) {
                return business.checkCorrectSelection(id);
            }
            else {
                return false;
            }
        },
        goForward: () => {
            business.goForward();
        },
        solve: () => {
            business.solve();
        },
        restart: async () => {
            await business.restart();
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