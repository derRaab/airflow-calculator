import {
  Calculation,
  CalculationValue,
  calculatePipeArea,
  convertToUnit,
} from "@/src/calculation";
import { translate } from "@/src/localization";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import { valueToLocaleString } from "@/src/utils/numberUtils";
import React, { FC, MutableRefObject, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

export interface PipeArea {
  area: CalculationValue;
  diameter: CalculationValue;
}

interface CalculatorPipeAreaInputProps {
  calculation: Calculation;
  colorScheme: MaterialDesign3ColorScheme;
  layout: MaterialDesign3Layout;
  onAreaChange: (area: PipeArea) => void;
  diameterTextInputRef: MutableRefObject<TextInput | undefined>;
  onTextInputFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export const CalculatorPipeAreaInput: FC<CalculatorPipeAreaInputProps> = ({
  calculation,
  colorScheme,
  layout,
  onAreaChange,
  diameterTextInputRef,
  onTextInputFocus,
}) => {
  const [area, setArea] = useState<PipeArea>({
    area: { value: calculation.area.value, unit: calculation.area.unit },
    diameter: {
      value: calculation.diameter.value,
      unit: calculation.diameter.unit,
    },
  });

  const onDiameterChange = (diameter: number) => {
    const newDiameter: CalculationValue = {
      value: diameter,
      unit: diameterUnit,
    };
    const newArea = {
      area: calculatePipeArea(newDiameter),
      diameter: newDiameter,
    };
    setArea(newArea);
    onAreaChange(newArea);
  };

  const areaM2 = convertToUnit(area.area, "m2");
  const areaText =
    translate("a_inSquareMeters", translate("area")) +
    ": " +
    valueToLocaleString(areaM2.value, 0, 3) +
    " m²";

  const diameterUnit = "mm";
  const diameterDescription = translate(
    "a_inMillimeters",
    translate("diameter"),
  );
  const diameterPlaceholder = translate("diameter");
  const diameterUnitText = translate(diameterUnit);

  const styles = useLocalStyle(colorScheme, layout);
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.areaTextStyle}>{areaText}</Text>
      <CalculatorTextInput
        description={diameterDescription}
        layout={layout}
        minHeight={0}
        onChangeNumber={onDiameterChange}
        placeholder={diameterPlaceholder}
        textInputRef={diameterTextInputRef}
        unit={diameterUnitText}
        value={area.diameter.value}
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
      gap: layout.gap,
      padding: layout.padding,
    },

    areaTextStyle: {
      ...typography.labelLarge,
      color: colorScheme.onSurface,
      textAlign: "center",
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
