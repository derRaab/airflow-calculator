// More than 20 will throw an error - so cap it!
const maximumFractionDigitsThreshold = 20;
const capFractionDigits = (fractionDigits: number) => {
  return Math.max(0, Math.min(fractionDigits, maximumFractionDigitsThreshold));
};

export const valueToLocaleString = (
  resultValue: number,
  minFractionDigits = 0,
  maxFractionDigits = 20,
) => {
  if (resultValue === undefined) {
    return "-";
  }

  if (isNaN(resultValue)) {
    return "NaN";
  }

  if (isFinite(resultValue) === false) {
    return "∞";
  }

  // Cap the fraction digits
  minFractionDigits = capFractionDigits(minFractionDigits);
  maxFractionDigits = capFractionDigits(maxFractionDigits);
  if (minFractionDigits > maxFractionDigits) {
    minFractionDigits = maxFractionDigits;
  }

  // Create the default locale string with the given fraction digits
  const resultValueLocaleString = resultValue.toLocaleString(undefined, {
    maximumFractionDigits: maxFractionDigits,
    minimumFractionDigits: minFractionDigits,
  });

  if (resultValue === 0) {
    return resultValueLocaleString;
  }

  // Avoid rounding to zero by increasing the fraction digits
  let fixedResultValue = parseFloat(resultValue.toFixed(maxFractionDigits));
  while (
    fixedResultValue === 0 &&
    maxFractionDigits < maximumFractionDigitsThreshold
  ) {
    // Try again with more fraction digits
    maxFractionDigits++;
    fixedResultValue = parseFloat(resultValue.toFixed(maxFractionDigits));
  }

  const fixedResultValueLocaleString = resultValue.toLocaleString(undefined, {
    maximumFractionDigits: maxFractionDigits,
    minimumFractionDigits: minFractionDigits,
  });

  const needsRounding = resultValue !== fixedResultValue;
  const roundedPrefix = needsRounding ? "≈" : "";
  const result = roundedPrefix + fixedResultValueLocaleString;
  return result;
};
