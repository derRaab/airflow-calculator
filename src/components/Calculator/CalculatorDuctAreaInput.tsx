import { Calculation, calculateDuctArea } from "@/src/calculation";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import React, { FC, useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

export interface DuctArea {
  area: number;
  height: number;
  width: number;
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
  const areaStyle = { color: colorScheme.onSurface };

  const [area, setArea] = useState<DuctArea>({
    area: calculation.area,
    height: calculation.height,
    width: calculation.width,
  });

  const onWidthChange = (width: number) => {
    const newArea = {
      area: calculateDuctArea(width, area.height),
      height: area.height,
      width,
    };
    setArea(newArea);
    onAreaChange(newArea);
  };

  const onHeightChange = (height: number) => {
    const newArea = {
      area: calculateDuctArea(area.width, height),
      height,
      width: area.width,
    };
    setArea(newArea);
    onAreaChange(newArea);
  };

  return (
    <View style={containerStyle}>
      <Text style={areaStyle}>{"Area: " + area.area}</Text>
      <CalculatorTextInput
        description={"Width description"}
        layout={layout}
        minHeight={0}
        onChangeNumber={onWidthChange}
        placeholder={"Width placeholder"}
        unit={"Width unit"}
        value={area.width}
      />
      <CalculatorTextInput
        layout={layout}
        description={"Height description"}
        minHeight={0}
        onChangeNumber={onHeightChange}
        placeholder={"Height placeholder"}
        unit={"Height unit"}
        value={area.height}
      />
    </View>
  );
};
