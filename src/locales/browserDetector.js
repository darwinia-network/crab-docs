import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const bD = {
    name: 'browser',

    lookup(/**options */) {
        // options -> are passed in options
        if (!ExecutionEnvironment.canUseDOM) {
            global.navigator = { userAgent: 'node.js', };
        }
        var userLang = navigator.language || navigator.userLanguage;
        return userLang;
    },

    cacheUserLanguage(/**lng, options */) {
        // options -> are passed in options
        // lng -> current language, will be called after init and on changeLanguage

        // store it
    }
};

export default bD;
