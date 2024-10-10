import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Calculation,
  CalculationObject,
  CalculationType,
  defaultCalculationDuctFlowrate,
  defaultCalculationDuctVelocity,
  defaultCalculationPipeFlowrate,
  defaultCalculationPipeVelocity,
} from "../calculation";

export class CalculationStorage {
  private calculationsChangeMap: Map<string, boolean> = new Map();
  private calculationsMap: Map<string, Calculation> = new Map();
  private calculationsUpdatesMap: Map<string, Calculation[]> = new Map();
  private prepared = false;
  private writing = false;

  constructor() {
    // Initialize with ALL default calculations
    const defaultCalculations: Calculation[] = [
      defaultCalculationDuctFlowrate,
      defaultCalculationDuctVelocity,
      defaultCalculationPipeFlowrate,
      defaultCalculationPipeVelocity,
    ];
    defaultCalculations.forEach((calculation) => {
      const key = this.getStorageKey(calculation.object, calculation.type);
      this.calculationsChangeMap.set(key, false);
      this.calculationsMap.set(key, calculation);
      this.calculationsUpdatesMap.set(key, []);
    });
  }

  private getStorageKey(
    object: CalculationObject,
    type: CalculationType,
  ): string {
    return `calculation-${object}-${type}`;
  }

  get(object: CalculationObject, type: CalculationType): Calculation {
    return this.calculationsMap.get(this.getStorageKey(object, type))!;
  }

  set(calculation: Calculation): void {
    const key = this.getStorageKey(calculation.object, calculation.type);
    // Mark as changed
    this.calculationsChangeMap.set(key, true);
    // Immidiately update in map
    this.calculationsMap.set(key, calculation);
    // Add to updates
    this.calculationsUpdatesMap.get(key)?.push(calculation);
    // Start writing to disc
    this.writeNext();
  }
  read = async (): Promise<boolean> => {
    console.log("Reading calculations");
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        console.log("Read calculations");
        resolve(true);
      }, 1000);
    });
  };

  writeNext = async (): Promise<void> => {
    if (this.writing) {
      return;
    }

    const map = this.calculationsUpdatesMap;
    const mapKeys = Array.from(map.keys());
    for (let i = 0; i < mapKeys.length; i++) {
      const mapKey = mapKeys[i];
      const calculations = map.get(mapKey);
      if (!calculations || calculations.length === 0) {
        continue;
      }
      // Write only latest calculation version an clear array
      const calculation = calculations.pop();
      while (calculations.length > 0) {
        calculations.pop();
      }
      if (!calculation) {
        continue;
      }

      // Double check if calculation is same type
      const calulationKey = this.getStorageKey(
        calculation.object,
        calculation.type,
      );
      if (mapKey !== calulationKey) {
        continue;
      }

      this.writing = true;
      try {
        const jsonString = JSON.stringify(calculation);

        console.log(`Writing calculations for ${mapKey}`, jsonString);
        await AsyncStorage.setItem(calulationKey, jsonString);
      } catch (error) {
        console.error(`Error writing calculations for ${mapKey}`);
        console.error(error);
      } finally {
        this.writing = false;
        this.writeNext();
      }
    }
  };
}
