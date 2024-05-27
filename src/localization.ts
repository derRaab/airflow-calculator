import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

// TYPES
interface Translation {
  appName: string;
  duct: string;
  iso: string;
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
    duct: "Kanal",
    iso: "de",
    pipe: "Rohr",
  },
  en: {
    appName: "Airflow Calculator",
    duct: "Duct",
    iso: "en",
    pipe: "Pipe",
  },
};

const getFirstLanguageTag = () => {
  const locales = Localization.getLocales();
  if (locales?.length > 0) {
    return locales[0].languageTag;
  }
  return "en";
};

// UTILS
const i18n = new I18n(translations, {
  defaultLocale: "en",
  enableFallback: true,
  locale: getFirstLanguageTag(),
});

// FUNCTIONS
export const translate = (key: TranslationKey) => {
  return i18n.t(key);
};

export const changeLocale = (locale: string) => {
  i18n.locale = locale;
};
