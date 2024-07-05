export const nestedMap = (map: Map<any, any>, nestedKeys: any[]) => {
  let currentMap = map;
  for (let i = 0; i < nestedKeys.length; i++) {
    const key = nestedKeys[i];
    let nextMap = currentMap.get(key);
    if (!nextMap) {
      console.log("create new MAP at index " + i);
      nextMap = new Map<any, any>();
      currentMap.set(key, nextMap);
    }
    currentMap = nextMap;
  }
  return currentMap;
};
