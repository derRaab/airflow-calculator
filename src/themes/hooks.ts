import { useColorScheme } from "react-native";
import { materialTheme } from "./colors";
import { selectColorScheme } from "./m3/MaterialDesign3ColorTheme";

export const usePreferredColorScheme = () => {
  let colorSchemeName = useColorScheme();
  return selectColorScheme(materialTheme.schemes, colorSchemeName);
};
