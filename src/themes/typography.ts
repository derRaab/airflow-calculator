
import { Platform } from "react-native";
import { MaterialDesign3Typography } from "./m3/MaterialDesign3Typography";

const androidFontFamily = "Roboto";
const iosFontFamily = "San Francisco";
const fontFamily = Platform.OS === "ios" ? iosFontFamily : androidFontFamily;

// @see https://m3.material.io/styles/typography/type-scale-tokens
export const typography : MaterialDesign3Typography = {
  displayLarge : {
    fontFamily,
    fontSize: 57,
    fontWeight: "400",
    letterSpacing: -0.25,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily,
    fontSize: 45,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily,
    fontSize: 36,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily,
    fontSize: 32,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily,
    fontSize: 28,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily,
    fontSize: 24,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily,
    fontSize: 22,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily,
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily,
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: 24,
  };
  bodyMedium: {
    fontFamily,
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily,
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  labelLarge: {
    fontFamily,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily,
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily,
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
  },
}