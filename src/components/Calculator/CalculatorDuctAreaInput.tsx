import {
  Calculation,
  CalculationValue,
  calculateDuctArea,
  convertToUnit,
} from "@/src/calculation";
import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { typography } from "@/src/themes/typography";
import React, { FC, useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

export interface DuctArea {
  area: CalculationValue;
  height: CalculationValue;
  width: CalculationValue;
}

interface CalculatorDuctAreaInputProps {
  calculation: Calculation;
  layout: MaterialDesign3Layout;
  minHeight: number;
  onAreaChange: (area: DuctArea) => void;
}

export const CalculatorDuctAreaInput: FC<CalculatorDuctAreaInputProps> = ({
  minHeight,
  calculation,
  onAreaChange,
  layout,
}) => {
  const colorScheme = usePreferredColorScheme();
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colorScheme.surfaceContainer,
    gap: layout.gap,
    minHeight,
    padding: layout.padding,
  };
  const areaTextStyle = {
    ...typography.labelLarge,
    color: colorScheme.onSurface,
    textAlign: "center",
  };

  const [area, setArea] = useState<DuctArea>({
    area: { value: calculation.area.value, unit: calculation.area.unit },
    height: { value: calculation.height.value, unit: calculation.height.unit },
    width: { value: calculation.width.value, unit: calculation.width.unit },
  });

  const onWidthChange = (width: number) => {
    const newWidth: CalculationValue = { value: width, unit: widthUnit };
    const newArea: DuctArea = {
      area: calculateDuctArea(newWidth, area.height),
      height: area.height,
      width: newWidth,
    };
    setArea(newArea);
    onAreaChange(newArea);
  };

  const onHeightChange = (height: number) => {
    const newHeight: CalculationValue = { value: height, unit: heightUnit };
    const newArea: DuctArea = {
      area: calculateDuctArea(area.width, newHeight),
      height: newHeight,
      width: area.width,
    };
    setArea(newArea);
    onAreaChange(newArea);
  };

  const areaM2 = convertToUnit(area.area, "m2");
  const areaText =
    translate("a_inSquareMeters", translate("area")) +
    ": " +
    areaM2.value +
    " m²";

  const widthUnit = "mm";
  const widthDescription = translate("a_inMillimeters", translate("width"));
  const widthPlaceholder = translate("width");
  const widthUnitText = translate(widthUnit);

  const heightUnit = "mm";
  const heightDescription = translate("a_inMillimeters", translate("height"));
  const heightPlaceholder = translate("height");
  const heightUnitText = translate(heightUnit);

  return (
    <View style={containerStyle}>
      <Text style={areaTextStyle}>{areaText}</Text>
      <CalculatorTextInput
        description={widthDescription}
        layout={layout}
        minHeight={0}
        onChangeNumber={onWidthChange}
        placeholder={widthPlaceholder}
        unit={widthUnitText}
        value={area.width.value}
      />
      <CalculatorTextInput
        layout={layout}
        description={heightDescription}
        minHeight={0}
        onChangeNumber={onHeightChange}
        placeholder={heightPlaceholder}
        unit={heightUnitText}
        value={area.height.value}
      />
    </View>
  );
};
