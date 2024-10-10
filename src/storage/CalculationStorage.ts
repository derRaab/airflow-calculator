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
  prepared = false;
  calculationsMap: Map<string, Calculation> = new Map();

  constructor() {
    // Initialize with default calculations
    const defaultCalculations: Calculation[] = [
      defaultCalculationDuctFlowrate,
      defaultCalculationDuctVelocity,
      defaultCalculationPipeFlowrate,
      defaultCalculationPipeVelocity,
    ];
    defaultCalculations.forEach((calculation) => {
      this.calculationsMap.set(
        this.getStorageKey(calculation.object, calculation.type),
        calculation,
      );
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
    return;
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
}
