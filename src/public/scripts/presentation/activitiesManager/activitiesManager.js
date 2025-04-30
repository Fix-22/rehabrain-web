export const generateActivitiesManager = (model) => {
    return {
        getActivities: async () => {
            const result = await model.getActivities();

            result.forEach(dict => {
                Object.keys(dict).forEach(k => {
                    dict[k.toLowerCase()] = dict[k];
                    delete dict[k];
                });
                dict.times = 1;
            });

            return result;
        }
    };
};