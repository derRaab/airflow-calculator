export interface MaterialDesign3ColorTheme {
  description: string;
  seed: string;
  coreColors: MaterialDesign3CoreColors;
  extendedColors: MaterialDesign3ExtendedColor[];
  schemes: MaterialDesign3ColorSchemes;
  palettes: MaterialDesign3ColorPalettes;
}

interface MaterialDesign3CoreColors {
  primary: string;
}

interface MaterialDesign3ExtendedColor {
  name: string;
  color: string;
  description: string;
  harmonized: boolean;
}

interface MaterialDesign3ColorSchemes {
  light: MaterialDesign3ColorScheme;
  lightMediumContrast: MaterialDesign3ColorScheme;
  lightHighContrast: MaterialDesign3ColorScheme;
  dark: MaterialDesign3ColorScheme;
  darkMediumContrast: MaterialDesign3ColorScheme;
  darkHighContrast: MaterialDesign3ColorScheme;
}

export interface MaterialDesign3ColorScheme {
  primary: string;
  surfaceTint: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  primaryFixed: string;
  onPrimaryFixed: string;
  primaryFixedDim: string;
  onPrimaryFixedVariant: string;
  secondaryFixed: string;
  onSecondaryFixed: string;
  secondaryFixedDim: string;
  onSecondaryFixedVariant: string;
  tertiaryFixed: string;
  onTertiaryFixed: string;
  tertiaryFixedDim: string;
  onTertiaryFixedVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
}

interface MaterialDesign3ColorPalettes {
  primary: MaterialDesign3ColorPalette;
  secondary: MaterialDesign3ColorPalette;
  tertiary: MaterialDesign3ColorPalette;
  neutral: MaterialDesign3ColorPalette;
  neutralVariant: MaterialDesign3ColorPalette;
}

interface MaterialDesign3ColorPalette {
  "0": string;
  "5": string;
  "10": string;
  "15": string;
  "20": string;
  "25": string;
  "30": string;
  "35": string;
  "40": string;
  "50": string;
  "60": string;
  "70": string;
  "80": string;
  "90": string;
  "95": string;
  "98": string;
  "99": string;
  "100": string;
}

export type MaterialDesign3ColorPaletteKey = keyof MaterialDesign3ColorPalette;
const materialDesign3ColorPaletteKeysOrder: MaterialDesign3ColorPaletteKey[] = [
  "0",
  "5",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "95",
  "98",
  "99",
  "100",
];

type MaterialDesign3ColorSchemeName = keyof MaterialDesign3ColorSchemes;

const isColorSchemeName = (
  name: string,
): name is MaterialDesign3ColorSchemeName => {
  switch (name) {
    case "light":
    case "lightMediumContrast":
    case "lightHighContrast":
    case "dark":
    case "darkMediumContrast":
    case "darkHighContrast":
      return true;
  }
  return false;
};

export const selectColorScheme = (
  colorSchemes: MaterialDesign3ColorSchemes,
  preferredName: string | null | undefined,
): MaterialDesign3ColorScheme => {
  // Invalid name
  if (!preferredName || !isColorSchemeName(preferredName)) {
    return colorSchemes.light;
  }
  // Exact match
  if (colorSchemes[preferredName]) {
    return colorSchemes[preferredName];
  }
  // Fallback dark
  if (preferredName.startsWith("dark")) {
    return colorSchemes.dark;
  }
  // Fallback light
  return colorSchemes.light;
};

export const selectPaletteColor = (
  colorPalette: MaterialDesign3ColorPalette,
  key: MaterialDesign3ColorPaletteKey,
): string => {
  return colorPalette[key];
};

export const selectPaletteColorAt = (
  colorPalette: MaterialDesign3ColorPalette,
  index:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17,
): string => {
  return selectPaletteColor(
    colorPalette,
    materialDesign3ColorPaletteKeysOrder[index],
  );
};
