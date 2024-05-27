import {
  calculateDuctFlowrate,
  calculateDuctVelocity,
  calculatePipeFlowrate,
  calculatePipeVelocity,
} from "@/src/calculation";

describe("calculation", () => {
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
