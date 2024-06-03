export const calculateDuctFlowrate = () => {
  return 1.1;
};

export const calculateDuctVelocity = () => {
  return 2.2;
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
