import { Calculation } from "@/src/calculation";
import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { capitalizeFirstLetter } from "@/src/utils/stringutils";
import React, { FC } from "react";
import { View } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { CalculatorDuctAreaInput, DuctArea } from "./CalculatorDuctAreaInput";
import { CalculatorFlowrateInput } from "./CalculatorFlowrateInput";
import { CalculatorPipeAreaInput, PipeArea } from "./CalculatorPipeAreaInput";
import { CalculatorResult } from "./CalculatorResult";

interface CalculatorProps {
  calculation: Calculation;
  insets: EdgeInsets;
  layout: MaterialDesign3Layout;
  onInputChange: (calculation: Calculation) => void;
}

export const Calculator: FC<CalculatorProps> = ({
  calculation,
  insets,
  layout,
  onInputChange,
}) => {
  const resultInsets = {
    top: insets.top,
    right: insets.right,
    bottom: 0,
    left: insets.left,
  };
  const horizontalInsets = {
    top: 0,
    right: insets.right,
    bottom: 0,
    left: insets.left,
  };
  const resultMinHeight = insets.top * 2;

  const colorScheme = usePreferredColorScheme();
  const surfaceStyle = {
    backgroundColor: colorScheme.surface,
    flexGrow: 1,
    rowGap: layout.gap,
  };

  const onDuctAreaChange = (area: DuctArea) => {
    const newCalculation: Calculation = {
      ...calculation,
      area: area.area,
      height: area.height,
      width: area.width,
    };
    onInputChange(newCalculation);
  };

  const onPipeAreaChange = (area: PipeArea) => {
    const newCalculation: Calculation = {
      ...calculation,
      area: area.area,
      diameter: area.diameter,
    };
    onInputChange(newCalculation);
  };

  const onFlowrateChange = (flowrate: number) => {
    const newCalculation: Calculation = {
      ...calculation,
      flowrate,
    };
    onInputChange(newCalculation);
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

  const resultUnit = translate("unitMetersPerSecond") as string;

  return (
    <View style={surfaceStyle}>
      <CalculatorResult
        description={resultDescriptionFromCalulation(calculation)}
        insets={resultInsets}
        layout={layout}
        minHeight={resultMinHeight}
        result={calculation.result}
        unit={resultUnit}
      />
      {calculation.object === "duct" && (
        <CalculatorDuctAreaInput
          calculation={calculation}
          layout={layout}
          minHeight={0}
          onAreaChange={onDuctAreaChange}
        />
      )}
      {calculation.object === "pipe" && (
        <CalculatorPipeAreaInput
          calculation={calculation}
          layout={layout}
          minHeight={0}
          onAreaChange={onPipeAreaChange}
        />
      )}
      <CalculatorFlowrateInput
        calculation={calculation}
        insets={horizontalInsets}
        layout={layout}
        minHeight={0}
        onFlowrateChange={onFlowrateChange}
      />
    </View>
  );
};
