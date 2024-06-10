import {
  Calculation,
  CalculationValue,
  calculatePipeArea,
  convertToUnit,
} from "@/src/calculation";
import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import React, { FC, useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

export interface PipeArea {
  area: CalculationValue;
  diameter: CalculationValue;
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
    areaM2.value +
    " m²";

  const diameterUnit = "mm";
  const diameterDescription = translate(
    "a_inMillimeters",
    translate("diameter"),
  );
  const diameterPlaceholder = translate("diameter");
  const diameterUnitText = translate(diameterUnit);

  return (
    <View style={containerStyle}>
      <Text style={areaStyle}>{areaText}</Text>
      <CalculatorTextInput
        description={diameterDescription}
        layout={layout}
        minHeight={0}
        onChangeNumber={onDiameterChange}
        placeholder={diameterPlaceholder}
        unit={diameterUnitText}
        value={area.diameter.value}
      />
    </View>
  );
};
