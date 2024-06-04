import { Calculation } from "@/src/calculation";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import React, { FC, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

interface CalculatorFlowrateInputProps {
  calculation: Calculation;
  layout: MaterialDesign3Layout;
  minHeight: number;
  onFlowrateChange: (flowrate: number) => void;
}

export const CalculatorFlowrateInput: FC<CalculatorFlowrateInputProps> = ({
  calculation,
  layout,
  minHeight,
  onFlowrateChange,
}) => {
  const colorScheme = usePreferredColorScheme();
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colorScheme.surfaceContainer,
    minHeight,
    padding: layout.padding,
  };

  const [flowrate, setFlowrate] = useState(calculation.flowrate);

  const onInputChange = (newFlowRate: number) => {
    setFlowrate(newFlowRate);
    onFlowrateChange(newFlowRate);
  };

  return (
    <View style={containerStyle}>
      <CalculatorTextInput
        description={"Flowrate description"}
        layout={layout}
        minHeight={0}
        onChangeNumber={onInputChange}
        placeholder={"Flowrate placeholder"}
        unit={"Flowrate unit"}
        value={flowrate}
      />
    </View>
  );
};
