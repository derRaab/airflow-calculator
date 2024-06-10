import { Calculation, CalculationValue } from "@/src/calculation";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import React, { FC } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { CalculatorDuctAreaInput, DuctArea } from "./CalculatorDuctAreaInput";
import { CalculatorFlowrateInput } from "./CalculatorFlowrateInput";
import { CalculatorPipeAreaInput, PipeArea } from "./CalculatorPipeAreaInput";
import { CalculatorResult } from "./CalculatorResult";
import { CalculatorVelocityInput } from "./CalculatorVelocityInput";

interface CalculatorProps {
  calculation: Calculation;
  insets: EdgeInsets;
  layout: MaterialDesign3Layout;
  onInputChange: (calculation: Calculation) => void;
}

export const Calculator: FC<CalculatorProps> = ({
  calculation,
  insets,
  layout,
  onInputChange,
}) => {
  const resultInsets = {
    top: insets.top,
    right: insets.right,
    bottom: 0,
    left: insets.left,
  };
  const horizontalInsets = {
    top: 0,
    right: insets.right,
    bottom: 0,
    left: insets.left,
  };
  const resultMinHeight = insets.top * 2;

  const colorScheme = usePreferredColorScheme();
  const surfaceStyle = {
    backgroundColor: colorScheme.surface,
    flexGrow: 1,
    rowGap: layout.gap,
  };

  const onDuctAreaChange = (area: DuctArea) => {
    const newCalculation: Calculation = {
      ...calculation,
      area: area.area,
      height: area.height,
      width: area.width,
    };
    onInputChange(newCalculation);
  };

  const onPipeAreaChange = (area: PipeArea) => {
    const newCalculation: Calculation = {
      ...calculation,
      area: area.area,
      diameter: area.diameter,
    };
    onInputChange(newCalculation);
  };

  const onFlowrateChange = (flowrate: CalculationValue) => {
    const newCalculation: Calculation = {
      ...calculation,
      flowrate,
    };
    onInputChange(newCalculation);
  };

  const onVelocityChange = (velocity: CalculationValue) => {
    const newCalculation: Calculation = {
      ...calculation,
      velocity,
    };
    onInputChange(newCalculation);
  };

  return (
    <View style={surfaceStyle}>
      <CalculatorResult
        calculation={calculation}
        insets={resultInsets}
        layout={layout}
        minHeight={resultMinHeight}
      />
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          {calculation.object === "duct" && (
            <CalculatorDuctAreaInput
              calculation={calculation}
              layout={layout}
              minHeight={0}
              onAreaChange={onDuctAreaChange}
            />
          )}
          {calculation.object === "pipe" && (
            <CalculatorPipeAreaInput
              calculation={calculation}
              layout={layout}
              minHeight={0}
              onAreaChange={onPipeAreaChange}
            />
          )}

          {calculation.type === "flowrate" && (
            <CalculatorVelocityInput
              calculation={calculation}
              layout={layout}
              minHeight={0}
              onVelocityChange={onVelocityChange}
            />
          )}

          {calculation.type === "velocity" && (
            <CalculatorFlowrateInput
              calculation={calculation}
              layout={layout}
              minHeight={0}
              onFlowrateChange={onFlowrateChange}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
