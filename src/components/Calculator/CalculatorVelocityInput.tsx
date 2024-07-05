import { Calculation, CalculationValue } from "@/src/calculation";
import { translate } from "@/src/localization";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import React, { FC, MutableRefObject, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

interface CalculatorVelocityInputProps {
  calculation: Calculation;
  colorScheme: MaterialDesign3ColorScheme;
  layout: MaterialDesign3Layout;
  onVelocityChange: (velocity: CalculationValue) => void;
  velocityTextInputRef: MutableRefObject<TextInput | undefined>;
  onTextInputFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export const CalculatorVelocityInput: FC<CalculatorVelocityInputProps> = ({
  calculation,
  colorScheme,
  layout,
  onVelocityChange,
  velocityTextInputRef,
  onTextInputFocus,
}) => {
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

  const styles = useLocalStyle(colorScheme, layout);

  return (
    <View style={styles.containerStyle}>
      <CalculatorTextInput
        description={description}
        layout={layout}
        minHeight={0}
        onChangeNumber={onInputChange}
        placeholder={placeholder}
        textInputRef={velocityTextInputRef}
        unit={unit}
        value={velocity.value}
        onTextInputFocus={onTextInputFocus}
      />
    </View>
  );
};

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  layout: MaterialDesign3Layout,
) => {
  return StyleSheet.create({
    containerStyle: {
      backgroundColor: colorScheme.surfaceContainer,
      padding: layout.padding,
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
