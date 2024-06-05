import { Calculation } from "@/src/calculation";
import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { typography } from "@/src/themes/typography";
import { capitalizeFirstLetter } from "@/src/utils/stringutils";
import { FC } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

interface CalculatorResultProps {
  calculation: Calculation;
  insets: EdgeInsets;
  layout: MaterialDesign3Layout;
  minHeight: number;
}

export const CalculatorResult: FC<CalculatorResultProps> = ({
  calculation,
  insets,
  layout,
  minHeight,
}) => {
  const colorScheme = usePreferredColorScheme();
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colorScheme.primary,
    gap: layout.gap,
    minHeight,
    paddingBottom: layout.padding,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    paddingTop: insets.top,
  };
  const descriptionStyle = {
    ...typography.labelLarge,
    color: colorScheme.onPrimary,
  };
  const resultStyle = {
    ...typography.displayMedium,
    color: colorScheme.onPrimary,
  };
  const unitStyle = { ...typography.labelLarge, color: colorScheme.onPrimary };

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

  return (
    <View style={containerStyle}>
      <Text style={descriptionStyle}>
        {resultDescriptionFromCalulation(calculation)}
      </Text>
      <Text style={resultStyle}>
        <Text>{calculation.result}</Text>
        <Text style={unitStyle}>{" " + translate(calculation.resultUnit)}</Text>
      </Text>
    </View>
  );
};
