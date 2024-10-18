import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Calculation,
  CalculationObject,
  CalculationType,
  defaultCalculationDuctFlowrate,
  defaultCalculationDuctVelocity,
  defaultCalculationPipeFlowrate,
  defaultCalculationPipeVelocity,
  isValidCalculation,
} from "../calculation";

export class CalculationStorage {
  private useAsyncStorage = false;

  private calculationsChangeMap: Map<string, boolean> = new Map();
  private calculationsMap: Map<string, Calculation> = new Map();
  private calculationsUpdatesMap: Map<string, Calculation[]> = new Map();
  private prepared = false;
  private writingBlocked = false;

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

    if (!this.useAsyncStorage) {
      return;
    }

    // Add to updates
    this.calculationsUpdatesMap.get(key)?.push(calculation);
    // Start writing to disc
    this.writeNext();
  }
  initialize = async (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, _reject) => {
      if (!this.useAsyncStorage) {
        resolve(false);
        return;
      }

      try {
        this.writingBlocked = true;
        const calculationKeys = Array.from(this.calculationsMap.keys());
        for (let i = 0; i < calculationKeys.length; i++) {
          const calculationKey = calculationKeys[i];
          const jsonString = await AsyncStorage.getItem(calculationKey);
          if (jsonString) {
            const calculation = JSON.parse(jsonString) as Calculation;
            if (!isValidCalculation(calculation)) {
              console.log(
                `Skip invalid loaded calculation ${calculationKey}`,
                calculation,
              );
            }
            this.calculationsMap.set(calculationKey, calculation);
          }
        }
      } catch (error) {
        console.error("Error initializing calculation storage", error);
      } finally {
        this.writingBlocked = false;
        resolve(true);
      }
    });
  };

  writeNext = async (): Promise<void> => {
    if (this.writingBlocked) {
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

      this.writingBlocked = true;
      try {
        const jsonString = JSON.stringify(calculation);
        await AsyncStorage.setItem(calulationKey, jsonString);
      } catch (error) {
        console.error(`Error writing calculations for ${mapKey}`, error);
      } finally {
        this.writingBlocked = false;
        this.writeNext();
      }
    }
  };
}
