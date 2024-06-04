import { Calculation, calculatePipeArea } from "@/src/calculation";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import React, { FC, useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

export interface PipeArea {
  area: number;
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
    diameter: calculation.diameter,
  });

  const onDiameterChange = (diameter: number) => {
    const newArea = {
      area: calculatePipeArea(diameter),
      diameter,
    };
    setArea(newArea);
    onAreaChange(newArea);
  };

  return (
    <View style={containerStyle}>
      <Text style={areaStyle}>{"Area: " + area.area}</Text>
      <CalculatorTextInput
        description={"Diameter description"}
        layout={layout}
        minHeight={0}
        onChangeNumber={onDiameterChange}
        placeholder={"Diameter placeholder"}
        unit={"Diameter unit"}
        value={area.diameter}
      />
    </View>
  );
};
