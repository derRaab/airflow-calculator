import {
  Calculation,
  calculateDuctArea,
  calculateDuctFlowrate,
  calculateDuctVelocity,
  calculatePipeArea,
  calculatePipeFlowrate,
  calculatePipeVelocity,
  convertMm2ToM2,
} from "@/src/calculation";

describe("calculation", () => {
  it("convert mm2 to m2", () => {
    expect(convertMm2ToM2(1_000_000)).toBe(1);
  });

  it("calculate pipe area", () => {
    expect(calculatePipeArea(1).toFixed(10)).toBe("0.7853981634");
  });

  it("calculate duct area", () => {
    expect(calculateDuctArea(1, 1)).toBe(1);
    expect(calculateDuctArea(2, 2)).toBe(4);
    expect(calculateDuctArea(2, 4)).toBe(8);
    expect(calculateDuctArea(10, 9)).toBe(90);
    expect(calculateDuctArea(6.5, 2.465)).toBe(16.0225);
  });

  it("duct flow rate", () => {
    expect(calculateDuctFlowrate()).toBe(1.1);
  });

  it("calculate duct velocity", () => {
    const calculationIn: Calculation = {
      area: 0,
      areaUnit: "m2",
      diameter: 0,
      diameterUnit: "mm",
      flowrate: 1_000,
      flowrateUnit: "m3_h",
      height: 1_000,
      heightUnit: "mm",
      object: "duct",
      result: 0,
      resultUnit: "m_s",
      type: "velocity",
      width: 1_000,
      widthUnit: "mm",
    };
    const calculationOut: Calculation = calculateDuctVelocity(calculationIn);

    // Expect unchanged values
    expect(calculationOut.diameter).toBe(calculationIn.diameter);
    expect(calculationOut.diameterUnit).toBe(calculationIn.diameterUnit);
    expect(calculationOut.flowrate).toBe(calculationIn.flowrate);
    expect(calculationOut.flowrateUnit).toBe(calculationIn.flowrateUnit);
    expect(calculationOut.height).toBe(calculationIn.height);
    expect(calculationOut.heightUnit).toBe(calculationIn.heightUnit);
    expect(calculationOut.object).toBe(calculationIn.object);
    expect(calculationOut.type).toBe(calculationIn.type);
    expect(calculationOut.width).toBe(calculationIn.width);
    expect(calculationOut.widthUnit).toBe(calculationIn.widthUnit);

    // Expect calculated values
    expect(calculationOut.area).toBe(
      convertMm2ToM2(
        calculateDuctArea(calculationIn.width, calculationIn.height),
      ),
    );

    expect(calculationOut.areaUnit).toBe("m2");

    expect(calculationOut.result.toFixed(6)).toBe("0.277778");
  });

  it("pipe flow rate", () => {
    expect(calculatePipeFlowrate()).toBe(3.3);
  });

  it("pipe velocity", () => {
    expect(calculatePipeVelocity()).toBe(4.4);
  });
});
