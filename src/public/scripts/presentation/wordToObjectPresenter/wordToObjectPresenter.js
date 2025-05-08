export const generateWordToObjectPresenter = (business, pubsub) => {
    const wordToObjectPresent = {
        build: () => {

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
        checkCorrectSelection: (id) => {
            if (id) {
                return business.checkCorrectSelection(id);
            }
            else {
                return false;
            }
        },
        solve: () => {

        }
    };

    return wordToObjectPresent;
};