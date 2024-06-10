import { Calculation } from "@/src/calculation";
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
  onVelocityChange: (velocity: number) => void;
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

  const [velocity, setVelocity] = useState(calculation.velocity);

  const onInputChange = (newFlowRate: number) => {
    setVelocity(newFlowRate);
    onVelocityChange(newFlowRate);
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
        value={velocity}
      />
    </View>
  );
};
