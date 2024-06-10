import { Calculation, CalculationValue } from "@/src/calculation";
import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import React, { FC, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

interface CalculatorFlowrateInputProps {
  calculation: Calculation;
  layout: MaterialDesign3Layout;
  minHeight: number;
  onFlowrateChange: (flowrate: CalculationValue) => void;
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

  const [flowrate, setFlowrate] = useState<CalculationValue>({
    value: calculation.flowrate.value,
    unit: calculation.flowrate.unit,
  });

  const onInputChange = (inputValue: number) => {
    const newFlowRate: CalculationValue = {
      value: inputValue,
      unit: flowrate.unit,
    };
    setFlowrate(newFlowRate);
    onFlowrateChange(newFlowRate);
  };

  const description = translate(
    "a_inCubicMetersPerHour",
    translate("flowrate"),
  );
  const placeholder = translate("flowrate");
  const unit = translate("m3_h");

  return (
    <View style={containerStyle}>
      <CalculatorTextInput
        description={description}
        layout={layout}
        minHeight={0}
        onChangeNumber={onInputChange}
        placeholder={placeholder}
        unit={unit}
        value={flowrate}
      />
    </View>
  );
};
