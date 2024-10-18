// Translate function overloading based on key!
interface SymbolMap {
  flowrate: string;
  velocity: string;
}

const symbolMap: SymbolMap = {
  flowrate: "V̇",
  velocity: "V",
};

type SymbolKey = keyof SymbolMap;

export const symbol = (key: SymbolKey) => {
  return symbolMap[key];
};
