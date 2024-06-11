export interface CalculationUnits {
  m3_h: string;
  m_s: string;
  mm: string;
  cm: string;
  dm: string;
  m: string;
  mm2: string;
  m2: string;
}

export type CalculationUnit = keyof CalculationUnits;

export interface CalculationValue {
  value: number;
  unit: CalculationUnit;
}

export interface Calculation {
  area: CalculationValue;
  diameter: CalculationValue;
  flowrate: CalculationValue;
  height: CalculationValue;
  object: string;
  result: CalculationValue;
  type: string;
  velocity: CalculationValue;
  width: CalculationValue;
}

export const defaultCalculation: Calculation = {
  area: { value: 0, unit: "m2" },
  diameter: { value: 0, unit: "mm" },
  flowrate: { value: 0, unit: "m3_h" },
  height: { value: 0, unit: "mm" },
  object: "",
  result: { value: 0, unit: "m_s" },
  type: "velocity",
  width: { value: 0, unit: "mm" },
  velocity: { value: 0, unit: "m_s" },
};

export const calculateDuctFlowrate = (calculation: Calculation) => {
  const newCalculation = { ...calculation };

  // Calculate area (mm * mm = mm2 -> m2)
  newCalculation.area = convertToUnit(
    calculateDuctArea(newCalculation.width, newCalculation.height),
    "m2",
  );

  // Calculate flowrate (m3/h)
  const velocityMs = convertToUnit(newCalculation.velocity, "m_s");
  newCalculation.result = {
    value: velocityMs.value * newCalculation.area.value * 3600,
    unit: "m3_h",
  };

  /*resultDuctVolumeFlow =
    floatToValidFixed2String(DuctVolumeVO.velocityDuctVolumeFlow) *
    (DuctVolumeVO.heightDuctVolumeFlow / 1000) *
    (DuctVolumeVO.widthDuctVolumeFlow / 1000) *
    3600;*/

  // DuctVolumeVO.resultDuctVolumeFlow = floatToValidFixed2String( DuctVolumeVO.velocityDuctVolumeFlow ) * (( DuctVolumeVO.heightDuctVolumeFlow/1000 ) * ( DuctVolumeVO.widthDuctVolumeFlow/1000) ) * 3600;
  // DuctVolumeVO.areaDuctVolumeFlow   = ( DuctVolumeVO.heightDuctVolumeFlow/ 1000) * (DuctVolumeVO.widthDuctVolumeFlow/ 1000 );

  return newCalculation;
};

export const calculateDuctVelocity = (calculation: Calculation) => {
  const newCalculation = { ...calculation };

  // Calculate area (mm * mm = mm2 -> m2)
  newCalculation.area = convertToUnit(
    calculateDuctArea(newCalculation.width, newCalculation.height),
    "m2",
  );

  // Calculate velocity (m/s)
  const flowrateM3H = convertToUnit(newCalculation.flowrate, "m3_h");
  newCalculation.result = {
    value: flowrateM3H.value / newCalculation.area.value / 3600,
    unit: "m_s",
  };

  // berechnungsscheiß / calculation shit
  // DuctVelocityVO.resultDuctVelocity =  DuctVelocityVO.volumeflowDuctVelocity / ( ( DuctVelocityVO.heightDuctVelocity/1000 ) * ( DuctVelocityVO.widthDuctVelocity/1000 ) ) / 3600;
  // DuctVelocityVO.areaDuctVelocity   = ( DuctVelocityVO.heightDuctVelocity/1000 ) * ( DuctVelocityVO.widthDuctVelocity/1000 ) ;

  return newCalculation;
};

export const calculatePipeFlowrate = () => {
  return 3.3;
};

export const calculatePipeVelocity = (calculation: Calculation) => {
  const newCalculation = { ...calculation };

  // Calculate and convert area mm2 -> m2
  newCalculation.area = convertToUnit(
    calculatePipeArea(newCalculation.diameter),
    "m2",
  );

  // Calculate velocity (m/s)
  const flowrateM3H = convertToUnit(newCalculation.flowrate, "m3_h");
  newCalculation.result = {
    value: flowrateM3H.value / newCalculation.area.value / 3600,
    unit: "m_s",
  };

  // pipeVelocityVo.areaPipeVelocity   = Math.pow(( ( pipeVelocityVo.diameterPipeVelocity/1000 ) / 2), 2 ) * Math.PI;
  // pipeVelocityVo.resultPipeVeolcity = pipeVelocityVo.volumeflowPipeVelocity / pipeVelocityVo.areaPipeVelocity / 3600 ;

  return newCalculation;
};

export const calculateDuctArea = (
  width: CalculationValue,
  height: CalculationValue,
): CalculationValue => {
  const unit = "mm";
  const widthMm = convertToUnit(width, unit);
  const heighttMm = convertToUnit(height, unit);
  return { value: widthMm.value * heighttMm.value, unit: "mm2" };
};

export const calculatePipeArea = (
  diameter: CalculationValue,
): CalculationValue => {
  const result = Math.pow(diameter.value / 2, 2) * Math.PI;
  switch (diameter.unit) {
    case "mm":
    case "cm":
    case "dm":
    case "m":
      return { value: result, unit: (diameter.unit + "2") as CalculationUnit };
  }
  throw new Error("Invalid pipe diameter unit: " + diameter.unit);
};

export const convertMm2ToM2 = (mm2: number) => {
  return mm2 / 1_000_000;
};

export const convertToUnit = (
  value: CalculationValue,
  unit: CalculationUnit,
) => {
  if (value.unit === unit) {
    return value;
  }

  const conversion = value.unit + " -> " + unit;
  switch (conversion) {
    case "mm2 -> m2":
      value.value = value.value === 0 ? 0 : value.value / 1_000_000;
      value.unit = unit;
      return value;
  }

  throw new Error("Conversion not implemented: " + conversion);
};
