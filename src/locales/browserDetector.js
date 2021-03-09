export default {
    name: 'browser',

    lookup(options) {
        // options -> are passed in options
        var userLang = navigator.language || navigator.userLanguage;
        return userLang;
    },

    cacheUserLanguage(lng, options) {
        // options -> are passed in options
        // lng -> current language, will be called after init and on changeLanguage

        // store it
    }
};
