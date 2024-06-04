export interface CalculationUnits {
  m3_h: string;
  m_s: string;
  mm: string;
  m2: string;
}

type CalculationUnit = keyof CalculationUnits;

export interface Calculation {
  area: number;
  areaUnit: CalculationUnit;
  diameter: number;
  diameterUnit: CalculationUnit;
  flowrate: number;
  flowrateUnit: CalculationUnit;
  height: number;
  heightUnit: CalculationUnit;
  object: string;
  result: number;
  resultUnit: CalculationUnit;
  type: string;
  width: number;
  widthUnit: CalculationUnit;
}

export const calculateDuctFlowrate = () => {
  return 1.1;
};

export const calculateDuctVelocity = (calculation: Calculation) => {
  const newCalculation = { ...calculation };

  // Calculate area first
  const areaM2 = convertMm2ToM2(
    calculateDuctArea(newCalculation.width, newCalculation.height),
  );
  newCalculation.area = areaM2;
  newCalculation.areaUnit = "m2";

  newCalculation.result = newCalculation.flowrate / areaM2 / 3600;
  newCalculation.resultUnit = "m_s";

  // berechnungsscheiß / calculation shit
  // DuctVelocityVO.resultDuctVelocity =  DuctVelocityVO.volumeflowDuctVelocity / ( ( DuctVelocityVO.heightDuctVelocity/1000 ) * ( DuctVelocityVO.widthDuctVelocity/1000 ) ) / 3600;
  // DuctVelocityVO.areaDuctVelocity   = ( DuctVelocityVO.heightDuctVelocity/1000 ) * ( DuctVelocityVO.widthDuctVelocity/1000 ) ;

  return newCalculation;
};

export const calculatePipeFlowrate = () => {
  return 3.3;
};

export const calculatePipeVelocity = () => {
  return 4.4;
};

export const calculateDuctArea = (width: number, height: number) => {
  return width * height;
};

export const calculatePipeArea = (diameter: number) => {
  return Math.pow(diameter / 2, 2) * Math.PI;
};

export const convertMm2ToM2 = (mm2: number) => {
  return mm2 / 1_000_000;
};
