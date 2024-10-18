import { useColorScheme, useWindowDimensions } from "react-native";
import { materialTheme } from "./colors";
import { MaterialDesign3Layout, layout } from "./layout";
import { selectColorScheme } from "./m3/MaterialDesign3ColorTheme";
import {
  getWindowSizeClassName,
  selectWindowSizeClass,
} from "./m3/MaterialDesign3Layout";

export const usePreferredColorScheme = () => {
  let colorSchemeName = useColorScheme();
  return selectColorScheme(materialTheme.schemes, colorSchemeName);
};

export const usePreferredLayout = () => {
  const { width } = useWindowDimensions();
  const className = getWindowSizeClassName(width);
  return selectWindowSizeClass(layout, className) as MaterialDesign3Layout;
};
