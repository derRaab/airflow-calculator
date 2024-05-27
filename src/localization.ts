import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

// TYPES
interface Translation {
  appName: string;
  duct: string;
  pipe: string;
}

interface Translations {
  [key: string]: Translation;
}

type TranslationKey = keyof Translation;

// DATA
const translations: Translations = {
  de: {
    appName: "Lüftungsrechner",
    pipe: "Rohr",
    duct: "Kanal",
  },
  en: {
    appName: "Airflow Calculator",
    pipe: "Pipe",
    duct: "Duct",
  },
};

// UTILS
const i18n = new I18n(translations, {
  defaultLocale: "en",
  enableFallback: true,
  locale: Localization.getLocales()[0].languageTag,
});

// FUNCTIONS
export const translate = (key: TranslationKey) => {
  return i18n.t(key);
};
