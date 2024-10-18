import { nestedMap } from "./mapUtils";

export const createCachedFactory = <T extends Function>(
  cache: Map<any, any>,
  factory: T,
) => {
  const cachedFactory = (...args: any[]) => {
    // Each argument represents a nested level in the cache
    const valueCache = nestedMap(cache, args);
    const key = "value";
    let value = valueCache.get(key);
    if (!value) {
      value = factory.apply(this, args);
      valueCache.set(key, value);
    }

    return value;
  };
  return cachedFactory as unknown as T;
};
