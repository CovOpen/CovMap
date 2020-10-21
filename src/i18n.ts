import i18n from "i18next";
import { InitOptions } from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import moment from "moment";

const languageDetector = new LanguageDetector();

const i18nOptions: InitOptions = {
  lng: "de", // <- remove this line to activate language detection!
  fallbackLng: "de",
  debug: process.env.NODE_ENV === "development",
  load: "languageOnly",
  nonExplicitSupportedLngs: true,
  interpolation: {
    escapeValue: false,
    format: function (value, format) {
      if (value instanceof Date) {
        const formattedDate = moment(value).format(format);
        return formattedDate;
      }
      return value;
    },
  },
};

i18n.use(Backend).use(languageDetector).use(initReactI18next).init(i18nOptions);

i18n.on("languageChanged", moment.locale);

export default i18n;
