export const delayAsync = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
