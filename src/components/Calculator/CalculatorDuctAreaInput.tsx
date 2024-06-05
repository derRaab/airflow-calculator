import {
  Calculation,
  CalculationUnit,
  calculateDuctArea,
  convertMm2ToM2,
} from "@/src/calculation";
import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { capitalizeFirstLetter } from "@/src/utils/stringutils";
import React, { FC, useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { CalculatorTextInput } from "./CalculatorTextInput";

export interface DuctArea {
  area: number;
  areaUnit: CalculationUnit;
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
    areaUnit: calculation.areaUnit,
    height: calculation.height,
    width: calculation.width,
  });

  const onWidthChange = (width: number) => {
    const newArea: DuctArea = {
      area: calculateDuctArea(width, area.height),
      areaUnit: "mm2",
      height: area.height,
      width,
    };
    setArea(newArea);
    onAreaChange(newArea);
  };

  const onHeightChange = (height: number) => {
    const newArea: DuctArea = {
      area: calculateDuctArea(area.width, height),
      areaUnit: "mm2",
      height,
      width: area.width,
    };
    setArea(newArea);
    onAreaChange(newArea);
  };

  const resultDescriptionFromCalulation = (calculation: Calculation) => {
    const object = calculation.object;
    const type = calculation.type;

    if (object === "duct") {
      if (type === "flowrate") {
        return translate("a_inMetersPerSecond", translate("ductFlowrate"));
      }
      if (type === "velocity") {
        return translate("a_inMetersPerSecond", translate("ductVelocity"));
      }
    }

    if (object === "pipe") {
      if (type === "flowrate") {
        return translate("a_inMetersPerSecond", translate("pipeFlowrate"));
      }
      if (type === "velocity") {
        return translate("a_inMetersPerSecond", translate("pipeVelocity"));
      }
    }

    return capitalizeFirstLetter(
      translate("a_inMeters", calculation.result.toString()),
    ) as string;
  };

  const areaM2 = area.areaUnit === "m2" ? area.area : convertMm2ToM2(area.area);
  const areaText =
    translate("a_inSquareMeters", translate("area")) + ": " + areaM2 + " m²";

  const widthDescription = translate("a_inMillimeters", translate("width"));
  const widthPlaceholder = translate("width");
  const widthUnit = translate("mm");

  const heightDescription = translate("a_inMillimeters", translate("height"));
  const heightPlaceholder = translate("height");
  const heightUnit = translate("mm");

  return (
    <View style={containerStyle}>
      <Text style={areaStyle}>{areaText}</Text>
      <CalculatorTextInput
        description={widthDescription}
        layout={layout}
        minHeight={0}
        onChangeNumber={onWidthChange}
        placeholder={widthPlaceholder}
        unit={widthUnit}
        value={area.width}
      />
      <CalculatorTextInput
        layout={layout}
        description={heightDescription}
        minHeight={0}
        onChangeNumber={onHeightChange}
        placeholder={heightPlaceholder}
        unit={heightUnit}
        value={area.height}
      />
    </View>
  );
};
