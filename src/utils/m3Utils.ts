import { Theme } from "@react-navigation/native";
import { ColorSchemeName } from "react-native";
import { MaterialDesign3ColorScheme } from "../themes/m3/MaterialDesign3ColorTheme";

export const getReactNavigationTheme = (
  colorSchemeName: ColorSchemeName,
  colorScheme: MaterialDesign3ColorScheme,
): Theme => {
  return {
    dark: colorSchemeName === "dark",
    colors: {
      background: colorScheme.background,
      border: colorScheme.surfaceDim,
      card: colorScheme.surface,
      notification: colorScheme.error,
      primary: colorScheme.primary,
      text: colorScheme.onSurface,
    },
  };
};
