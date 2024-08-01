import { Calculation } from "@/src/calculation";
import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { typography } from "@/src/themes/typography";
import { valueToLocaleString } from "@/src/utils/numberUtils";
import { capitalizeFirstLetter } from "@/src/utils/stringutils";
import { FC } from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

const resultDescriptionFromCalulation = (calculation: Calculation) => {
  const object = calculation.object;
  const type = calculation.type;

  if (object === "duct") {
    if (type === "flowrate") {
      return translate("a_inCubicMetersPerHour", translate("ductFlowrate"));
    }
    if (type === "velocity") {
      return translate("a_inMetersPerSecond", translate("ductVelocity"));
    }
  }

  if (object === "pipe") {
    if (type === "flowrate") {
      return translate("a_inCubicMetersPerHour", translate("pipeFlowrate"));
    }
    if (type === "velocity") {
      return translate("a_inMetersPerSecond", translate("pipeVelocity"));
    }
  }
  return object + " " + type;
};

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

  // Container settings
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colorScheme.primary,
    gap: layout.gap,
    minHeight,
    paddingBottom: layout.padding,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    paddingTop: insets.top,
  };

  const resultContainerStyle: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  };

  // Font settings
  const descriptionStyle: TextStyle = {
    ...typography.labelLarge,

    color: colorScheme.onPrimary,
    textAlign: "center",
  };
  const resultStyle = {
    ...typography.displayLarge,

    color: colorScheme.onPrimary,
    flexShrink: 1,
  };
  const unitStyle = {
    ...typography.labelLarge,

    color: colorScheme.onPrimary,
  };

  return (
    <View style={containerStyle}>
      <Text style={descriptionStyle}>
        {capitalizeFirstLetter(resultDescriptionFromCalulation(calculation))}
      </Text>
      <View style={resultContainerStyle}>
        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={resultStyle}>
          {valueToLocaleString(calculation.result.value, 0, 2)}
        </Text>
        <Text style={unitStyle}>
          {" " + translate(calculation.result.unit)}
        </Text>
      </View>
    </View>
  );
};
