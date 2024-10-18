import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { CalculationUnits } from "./calculation";

// Transitions without interpolation
interface TranslationInterpolate0 extends CalculationUnits {
  appName: string;
  area: string;
  diameter: string;
  duct: string;
  ductFlowrate: string;
  ductVelocity: string;
  flowrate: string;
  height: string;
  iso: string;
  pipe: string;
  pipeFlowrate: string;
  pipeVelocity: string;
  velocity: string;
  width: string;
}

// Transitions with one {{a}} interpolation
interface TranslationInterpolate1 {
  a_inCubicMetersPerHour: string;
  a_inMeters: string;
  a_inMetersPerSecond: string;
  a_inMillimeters: string;
  a_inSquareMeters: string;
}

// All translations combined
interface Translation
  extends TranslationInterpolate0,
    TranslationInterpolate1 {}

interface Translations {
  [key: string]: Translation;
}

// Translation values
const translations: Translations = {
  de: {
    a_inCubicMetersPerHour: "{{a}} in Kubikmeter pro Stunde",
    a_inMeters: "{{a}} in Meter",
    a_inMetersPerSecond: "{{a}} in Meter pro Sekunde",
    a_inMillimeters: "{{a}} in Millimeter",
    a_inSquareMeters: "{{a}} in Quadratmeter",

    appName: "Lüftungsrechner",
    area: "Fläche",
    cm: "cm",
    diameter: "Durchmesser",
    dm: "dm",
    duct: "Kanal",
    ductFlowrate: "Kanal-Volumenstrom",
    ductVelocity: "Kanal-Geschwindigkeit",
    flowrate: "Volumenstrom",
    height: "Höhe",
    iso: "de",
    m_s: "m/s",
    m: "m",
    m2: "m²",
    m3_h: "m³/h",
    mm: "mm",
    mm2: "mm²",
    pipe: "Rohr",
    pipeFlowrate: "Rohr-Volumenstrom",
    pipeVelocity: "Rohr-Geschwindigkeit",
    velocity: "Geschwindigkeit",
    width: "Breite",
  },
  en: {
    a_inCubicMetersPerHour: "{{a}} in cubic meters per hour",
    a_inMeters: "{{a}} in meters",
    a_inMetersPerSecond: "{{a}} in meters per second",
    a_inMillimeters: "{{a}} in millimeters",
    a_inSquareMeters: "{{a}} in square meters",

    appName: "Airflow Calculator",
    area: "Area",
    cm: "cm",
    diameter: "Diameter",
    dm: "dm",
    duct: "Duct",
    ductFlowrate: "duct flow rate",
    ductVelocity: "duct velocity",
    flowrate: "Flow rate",
    height: "Height",
    iso: "en",
    m_s: "m/s",
    m: "m",
    m2: "m²",
    m3_h: "m³/hr",
    mm: "mm",
    mm2: "mm²",
    pipe: "Pipe",
    pipeFlowrate: "Pipe flow rate",
    pipeVelocity: "Pipe velocity",
    velocity: "Velocity",
    width: "Width",
  },
};

const getFirstLanguageTag = () => {
  const locales = Localization.getLocales();
  if (locales?.length > 0) {
    return locales[0].languageTag;
  }
  return "en";
};

const i18n = new I18n(translations, {
  defaultLocale: "en",
  enableFallback: true,
  locale: getFirstLanguageTag(),
});

export const changeLocale = (locale: string) => {
  i18n.locale = locale;
};

// Translate function overloading based on key!

type TranslationKey = keyof Translation;
type TranslationInterpolate0Key = keyof TranslationInterpolate0;
type TranslationInterpolate1Key = keyof TranslationInterpolate1;

type IOverload = {
  (key: TranslationInterpolate0Key): string;
  (key: TranslationInterpolate1Key, a: string): string;
};

export const translate: IOverload = (key: TranslationKey, a?: string) => {
  if (a) {
    return i18n.t(key, { a });
  }
  return i18n.t(key);
};
