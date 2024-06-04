// All possible window size classes but compact is always required
export interface MaterialDesign3WindowSizeClasses<T> {
  compact: T;
  medium?: T;
  expanded?: T;
  large?: T;
  extraLarge?: T;
}

// All possible size classes
type MaterialDesign3WindowSizeClass =
  keyof MaterialDesign3WindowSizeClasses<any>;

interface MaterialDesign3WindowSize {
  name: MaterialDesign3WindowSizeClass;
  minWidth: number;
}

const windowSizesDescending: MaterialDesign3WindowSize[] = [
  { name: "extraLarge", minWidth: 1600 },
  { name: "large", minWidth: 1200 },
  { name: "expanded", minWidth: 840 },
  { name: "medium", minWidth: 600 },
  { name: "compact", minWidth: 0 },
];
const windowSizesAscending: MaterialDesign3WindowSize[] = windowSizesDescending
  .slice()
  .reverse();

export function getWindowSizeClassName(
  width: number,
): MaterialDesign3WindowSizeClass {
  const c = windowSizesDescending.length;
  for (let i = 0; c; i++) {
    const windowSize = windowSizesDescending[i];
    if (windowSize.minWidth <= width) {
      return windowSize.name;
    }
  }
  return "compact";
}

const isWindowSizeClass = (
  name: string,
): name is MaterialDesign3WindowSizeClass => {
  switch (name) {
    case "extraLarge":
    case "large":
    case "expanded":
    case "medium":
    case "compact":
      return true;
  }
  return false;
};

export const selectWindowSizeClass = <T>(
  windowSizeClasses: MaterialDesign3WindowSizeClasses<T>,
  preferredClass: string,
) => {
  // Invalid name
  if (!preferredClass || !isWindowSizeClass(preferredClass)) {
    return windowSizeClasses.compact;
  }
  // Exact match
  if (windowSizeClasses[preferredClass]) {
    return windowSizeClasses[preferredClass];
  }

  // Fallback to next smaller size
  let useNext = false;
  let lastFound: T | null = null;

  const c = windowSizesAscending.length;
  for (let i = 0; i < c; i++) {
    const currentName = windowSizesAscending[i].name;
    const currentWindowSizeClass = windowSizeClasses[currentName];
    if (currentWindowSizeClass) {
      if (useNext) {
        // Use that size
        return currentWindowSizeClass;
      }
      // Hold on to biggest found so far
      lastFound = currentWindowSizeClass as T;
    }

    if (currentName === preferredClass) {
      // Return the last already found
      if (lastFound) {
        return lastFound;
      }
      // Otherwise use next size no matter what
      useNext = true;
    }
  }
  // Fallback to compact
  return windowSizeClasses.compact as T;
};
