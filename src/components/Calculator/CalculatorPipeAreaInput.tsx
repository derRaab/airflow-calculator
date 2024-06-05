import {
  Calculation,
  CalculationUnit,
  calculatePipeArea,
  convertMm2ToM2,
} from "@/src/calculation";
import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import React, { FC, useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

export interface PipeArea {
  area: number;
  areaUnit: CalculationUnit;
  diameter: number;
}

interface CalculatorPipeAreaInputProps {
  calculation: Calculation;
  layout: MaterialDesign3Layout;
  minHeight: number;
  onAreaChange: (area: PipeArea) => void;
}

export const CalculatorPipeAreaInput: FC<CalculatorPipeAreaInputProps> = ({
  calculation,
  layout,
  minHeight,
  onAreaChange,
}) => {
  const colorScheme = usePreferredColorScheme();
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colorScheme.surfaceContainer,
    minHeight,
    padding: layout.padding,
  };
  const areaStyle = { color: colorScheme.onSurface };

  const [area, setArea] = useState<PipeArea>({
    area: calculation.area,
    areaUnit: calculation.areaUnit,
    diameter: calculation.diameter,
  });

  const onDiameterChange = (diameter: number) => {
    const newArea = {
      area: calculatePipeArea(diameter),
      areaUnit: area.areaUnit,
      diameter,
    };
    setArea(newArea);
    onAreaChange(newArea);
  };

  const areaM2 = area.areaUnit === "m2" ? area.area : convertMm2ToM2(area.area);
  const areaText =
    translate("a_inSquareMeters", translate("area")) + ": " + areaM2 + " m²";

  const diameterDescription = translate(
    "a_inMillimeters",
    translate("diameter"),
  );
  const diameterPlaceholder = translate("diameter");
  const diameterUnit = translate("mm");

  return (
    <View style={containerStyle}>
      <Text style={areaStyle}>{areaText}</Text>
      <CalculatorTextInput
        description={diameterDescription}
        layout={layout}
        minHeight={0}
        onChangeNumber={onDiameterChange}
        placeholder={diameterPlaceholder}
        unit={diameterUnit}
        value={area.diameter}
      />
    </View>
  );
};
