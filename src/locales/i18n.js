import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import browserDetector from './browserDetector'

import en_us from './en-us'
import zh_cn from './zh-cn'

const languageDetector = new LanguageDetector();
languageDetector.addDetector(browserDetector);



// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        ...en_us
    },
    zh: {
        ...zh_cn
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(languageDetector)
    .init({
        resources,
        // lng: localStorage.getItem("lng") || 'en-us',
        detection:{
            // order and from where user language should be detected
            order: ['querystring', 'cookie', 'localStorage','browser', 'navigator', 'path', 'subdomain'],

            // keys or params to lookup language from
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            lookupFromPathIndex: 0,
            lookupFromSubdomainIndex: 0,

            // cache user language on
            caches: ['localStorage', 'cookie'],

            // optional htmlTag with lang attribute, the default is:
        },
        fallbackLng: "en",
        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
