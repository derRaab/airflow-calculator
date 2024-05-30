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

interface MaterialDesign3ColorScheme {
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
