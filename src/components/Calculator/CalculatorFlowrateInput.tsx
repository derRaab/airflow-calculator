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

interface CalculatorFlowrateInputProps {
  calculation: Calculation;
  colorScheme: MaterialDesign3ColorScheme;
  layout: MaterialDesign3Layout;
  onFlowrateChange: (flowrate: CalculationValue) => void;
  flowrateTextInputRef: MutableRefObject<TextInput | undefined>;
  onTextInputFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export const CalculatorFlowrateInput: FC<CalculatorFlowrateInputProps> = ({
  calculation,
  colorScheme,
  layout,
  onFlowrateChange,
  flowrateTextInputRef,
  onTextInputFocus,
}) => {
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

  const styles = useLocalStyle(colorScheme, layout);

  return (
    <View style={styles.containerStyle}>
      <CalculatorTextInput
        description={description}
        layout={layout}
        minHeight={0}
        onChangeNumber={onInputChange}
        placeholder={placeholder}
        unit={unit}
        value={flowrate.value}
        textInputRef={flowrateTextInputRef}
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
