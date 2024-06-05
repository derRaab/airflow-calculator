import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { typography } from "@/src/themes/typography";
import { lineHeightPadding } from "@/src/utils/textStyleUtils";
import { FC, useState } from "react";
import { StyleProp, Text, TextInput, View, ViewStyle } from "react-native";

interface CalculatorTextInputProps {
  description: string;
  layout: MaterialDesign3Layout;
  minHeight: number;
  onChangeNumber: (number: number) => void;
  placeholder: string;
  unit: string;
  value: number;
}

export const CalculatorTextInput: FC<CalculatorTextInputProps> = ({
  description,
  layout,
  minHeight,
  onChangeNumber,
  placeholder,
  unit,
  value,
}) => {
  const colorScheme = usePreferredColorScheme();
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colorScheme.surfaceContainerHigh,
    minHeight,
    padding: layout.padding,
  };
  const inputContainerStyle: StyleProp<ViewStyle> = {
    flexDirection: "row",
    gap: layout.gap,
    alignItems: "flex-end",
  };

  const descriptionStyle = {
    ...typography.labelLarge,
    color: colorScheme.onSurface,
  };
  const textInputStyle = {
    ...typography.headlineMedium,
    color: colorScheme.onSurface,
  };
  const unitStyle = {
    ...typography.labelLarge,
    color: colorScheme.onSurface,
  };
  const stringToValue = (text: string) => {
    const value = parseFloat(text);
    if (isNaN(value)) {
      return 0;
    }
    return value;
  };
  const valueToString = (value: number) => {
    if (0 < value) {
      return value.toString();
    }
    return "";
  };
  const [displayValue, setDisplayValue] = useState(valueToString(value));
  const onChangeText = (text: string) => {
    const value = stringToValue(text);
    const string = valueToString(value);
    setDisplayValue(string);
    onChangeNumber(value);
  };

  unitStyle.paddingBottom =
    lineHeightPadding(textInputStyle) - lineHeightPadding(unitStyle);

  return (
    <View style={containerStyle}>
      <Text style={descriptionStyle}>{description}</Text>
      <View style={inputContainerStyle}>
        <TextInput
          keyboardType="numeric"
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={textInputStyle}
          value={displayValue}
        ></TextInput>
        <Text style={unitStyle}>{unit}</Text>
      </View>
    </View>
  );
};
