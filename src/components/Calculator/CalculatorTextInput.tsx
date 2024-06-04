import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { typography } from "@/src/themes/typography";
import { FC, useState } from "react";
import { StyleProp, Text, TextInput, View, ViewStyle } from "react-native";

interface CalculatorTextInputProps {
  value: number;
  description: string;
  placeholder: string;
  minHeight: number;
  unit: string;
  onChangeNumber: (number: number) => void;

  layout: MaterialDesign3Layout;
}

export const CalculatorTextInput: FC<CalculatorTextInputProps> = ({
  value,
  description,
  placeholder,
  minHeight,
  onChangeNumber,
  unit,
  layout,
}) => {
  const colorScheme = usePreferredColorScheme();
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colorScheme.surfaceContainerHigh,
    minHeight,
    padding: layout.padding,
  };
  const descriptionStyle = {
    ...typography.labelLarge,
    color: colorScheme.onSurface,
  };
  const textInputStyle = {
    ...typography.headlineMedium,
    color: colorScheme.onSurface,
  };
  const unitStyle = { ...typography.labelLarge, color: colorScheme.onSurface };
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
    console.log(text);
    const value = stringToValue(text);
    const string = valueToString(value);
    setDisplayValue(string);
    onChangeNumber(value);
  };

  return (
    <View style={containerStyle}>
      <Text style={descriptionStyle}>{description}</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={textInputStyle}
        value={displayValue}
      ></TextInput>
      <Text style={unitStyle}>{unit}</Text>
    </View>
  );
};
