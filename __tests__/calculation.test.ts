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
    expect(calculatePipeArea({ value: 1, unit: "mm" }).value.toFixed(10)).toBe(
      "0.7853981634",
    );
  });

  it("calculate duct area", () => {
    expect(
      calculateDuctArea({ value: 1, unit: "mm" }, { value: 1, unit: "mm" })
        .value,
    ).toBe(1);
    expect(
      calculateDuctArea({ value: 2, unit: "mm" }, { value: 2, unit: "mm" })
        .value,
    ).toBe(4);
    expect(
      calculateDuctArea({ value: 2, unit: "mm" }, { value: 4, unit: "mm" })
        .value,
    ).toBe(8);
    expect(
      calculateDuctArea({ value: 10, unit: "mm" }, { value: 9, unit: "mm" })
        .value,
    ).toBe(90);
    expect(
      calculateDuctArea(
        { value: 6.5, unit: "mm" },
        { value: 2.465, unit: "mm" },
      ).value,
    ).toBe(16.0225);
  });

  it("duct flow rate", () => {
    expect(calculateDuctFlowrate()).toBe(1.1);
  });

  it("calculate duct velocity", () => {
    const calculationIn: Calculation = {
      area: { value: 0, unit: "m2" },
      diameter: { value: 0, unit: "mm" },
      flowrate: { value: 1_000, unit: "m3_h" },
      height: { value: 1_000, unit: "mm" },
      object: "duct",
      result: { value: 0, unit: "m_s" },
      type: "velocity",
      width: { value: 1_000, unit: "mm" },
      velocity: { value: 0, unit: "m_s" },
    };
    const calculationOut: Calculation = calculateDuctVelocity(calculationIn);

    // Expect unchanged values
    expect(calculationOut.diameter.value).toBe(calculationIn.diameter.value);
    expect(calculationOut.diameter.unit).toBe(calculationIn.diameter.unit);
    expect(calculationOut.flowrate.value).toBe(calculationIn.flowrate.value);
    expect(calculationOut.flowrate.unit).toBe(calculationIn.flowrate.unit);
    expect(calculationOut.height.value).toBe(calculationIn.height.value);
    expect(calculationOut.height.unit).toBe(calculationIn.height.unit);
    expect(calculationOut.object).toBe(calculationIn.object);
    expect(calculationOut.type).toBe(calculationIn.type);
    expect(calculationOut.width.value).toBe(calculationIn.width.value);
    expect(calculationOut.width.unit).toBe(calculationIn.width.unit);
    expect(calculationOut.velocity.value).toBe(calculationIn.velocity.value);
    expect(calculationOut.velocity.unit).toBe(calculationIn.velocity.unit);

    // Expect calculated values
    expect(calculationOut.area.value).toBe(1);
    expect(calculationOut.area.unit).toBe("m2");

    expect(calculationOut.result.value.toFixed(6)).toBe("0.277778");
    expect(calculationOut.result.unit).toBe("m_s");
  });

  it("pipe flow rate", () => {
    expect(calculatePipeFlowrate()).toBe(3.3);
  });

  it("pipe velocity", () => {
    const calculationIn: Calculation = {
      area: { value: 0, unit: "m2" },
      diameter: { value: 1_000, unit: "mm" },
      flowrate: { value: 1_000, unit: "m3_h" },
      height: { value: 0, unit: "mm" },
      object: "pipe",
      result: { value: 0, unit: "m_s" },
      type: "velocity",
      width: { value: 0, unit: "mm" },
      velocity: { value: 0, unit: "m_s" },
    };
    const calculationOut: Calculation = calculatePipeVelocity(calculationIn);

    // Expect unchanged values
    // Expect unchanged values
    expect(calculationOut.diameter.value).toBe(calculationIn.diameter.value);
    expect(calculationOut.diameter.unit).toBe(calculationIn.diameter.unit);
    expect(calculationOut.flowrate.value).toBe(calculationIn.flowrate.value);
    expect(calculationOut.flowrate.unit).toBe(calculationIn.flowrate.unit);
    expect(calculationOut.height.value).toBe(calculationIn.height.value);
    expect(calculationOut.height.unit).toBe(calculationIn.height.unit);
    expect(calculationOut.object).toBe(calculationIn.object);
    expect(calculationOut.type).toBe(calculationIn.type);
    expect(calculationOut.width.value).toBe(calculationIn.width.value);
    expect(calculationOut.width.unit).toBe(calculationIn.width.unit);
    expect(calculationOut.velocity.value).toBe(calculationIn.velocity.value);
    expect(calculationOut.velocity.unit).toBe(calculationIn.velocity.unit);

    // Expect calculated values
    expect(calculationOut.area.value.toFixed(6)).toBe("0.785398");
    expect(calculationOut.area.unit).toBe("m2");

    expect(calculationOut.result.value.toFixed(6)).toBe("0.353678");
    expect(calculationOut.result.unit).toBe("m_s");
  });
});
