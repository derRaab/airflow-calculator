import { Calculation, CalculationValue } from "@/src/calculation";
import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import React, { FC, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

interface CalculatorVelocityInputProps {
  calculation: Calculation;
  layout: MaterialDesign3Layout;
  minHeight: number;
  onVelocityChange: (velocity: CalculationValue) => void;
}

export const CalculatorVelocityInput: FC<CalculatorVelocityInputProps> = ({
  calculation,
  layout,
  minHeight,
  onVelocityChange,
}) => {
  const colorScheme = usePreferredColorScheme();
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colorScheme.surfaceContainer,
    minHeight,
    padding: layout.padding,
  };

  const [velocity, setVelocity] = useState<CalculationValue>({
    value: calculation.velocity.value,
    unit: calculation.velocity.unit,
  });

  const onInputChange = (inputValue: number) => {
    const newVelocity: CalculationValue = {
      value: inputValue,
      unit: velocity.unit,
    };
    setVelocity(newVelocity);
    onVelocityChange(newVelocity);
  };

  const description = translate("a_inMetersPerSecond", translate("velocity"));
  const placeholder = translate("velocity");
  const unit = translate("m_s");

  return (
    <View style={containerStyle}>
      <CalculatorTextInput
        description={description}
        layout={layout}
        minHeight={0}
        onChangeNumber={onInputChange}
        placeholder={placeholder}
        unit={unit}
        value={velocity.value}
      />
    </View>
  );
};
