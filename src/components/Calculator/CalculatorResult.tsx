import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { typography } from "@/src/themes/typography";
import { FC } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

interface CalculatorResultProps {
  description: string;
  insets: EdgeInsets;
  layout: MaterialDesign3Layout;
  minHeight: number;
  result: number;
  unit: string;
}

export const CalculatorResult: FC<CalculatorResultProps> = ({
  description,
  insets,
  layout,
  minHeight,
  result,
  unit,
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
    ...typography.headlineMedium,
    color: colorScheme.onPrimary,
  };
  const unitStyle = { ...typography.labelLarge, color: colorScheme.onPrimary };

  return (
    <View style={containerStyle}>
      <Text style={descriptionStyle}>{description}</Text>
      <Text style={resultStyle}>{result}</Text>
      <Text style={unitStyle}>{unit}</Text>
    </View>
  );
};
