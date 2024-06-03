const capitalizeFirstLetterCache = new Map<string, string>();

export const capitalizeFirstLetter = (str: string) => {
  if (!capitalizeFirstLetterCache.has(str)) {
    capitalizeFirstLetterCache.set(
      str,
      str.charAt(0).toUpperCase() + str.slice(1),
    );
  }
  return capitalizeFirstLetterCache.get(str);
};
