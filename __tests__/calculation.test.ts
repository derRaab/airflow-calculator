import {
  calculateDuctArea,
  calculateDuctFlowrate,
  calculateDuctVelocity,
  calculatePipeArea,
  calculatePipeFlowrate,
  calculatePipeVelocity,
} from "@/src/calculation";

describe("calculation", () => {
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

  it("duct velocity", () => {
    expect(calculateDuctVelocity()).toBe(2.2);
  });

  it("pipe flow rate", () => {
    expect(calculatePipeFlowrate()).toBe(3.3);
  });

  it("pipe velocity", () => {
    expect(calculatePipeVelocity()).toBe(4.4);
  });
});
