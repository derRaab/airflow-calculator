import { MaterialDesign3WindowSizeClasses } from "./m3/MaterialDesign3Layout";

export interface MaterialDesign3Layout {
  gap: number;
  padding: number;
  spacing: number;
}

export const layout: MaterialDesign3WindowSizeClasses<MaterialDesign3Layout> = {
  compact: { spacing: 24, gap: 8, padding: 8 },
  medium: { spacing: 24, gap: 16, padding: 16 },
  expanded: { spacing: 24, gap: 16, padding: 16 },
  large: { spacing: 24, gap: 24, padding: 24 },
  extraLarge: { spacing: 24, gap: 24, padding: 24 },
};
