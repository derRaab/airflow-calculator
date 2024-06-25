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
  const stringToValue = (valueString: string) => {
    const decimalSeparator = (1.1).toLocaleString().charAt(1);
    if (decimalSeparator === ",") {
      valueString = valueString.replace(",", ".");
    }
    const value = parseFloat(valueString);
    if (isNaN(value)) {
      return 0;
    }
    return value;
  };
  const valueToString = (value: number) => {
    if (0 < value) {
      return value.toLocaleString();
    }
    return "";
  };
  const [displayValue, setDisplayValue] = useState(valueToString(value));

  const onChangeText = (text: string) => {
    // Allow only digits and decimal separator
    text = text.replace(/[^0-9.,]/g, "");
    // Detect the localized decimal separator
    const decimalSeparator = (1.1).toLocaleString().charAt(1);
    // Rdfgsdfg
    text = text.replace(decimalSeparator === "," ? "." : ",", "");
    // Extract integer and fraction parts
    const valuePartStrings = text.split(decimalSeparator);
    let integerString = valuePartStrings[0] || "";
    let fractionString = valuePartStrings[1] || "";
    // Allow only one leading zero for the integer part
    while (integerString.startsWith("00")) {
      integerString = integerString.substring(1);
    }
    // Create the validated text
    let valueString = integerString;
    if (1 < valuePartStrings.length) {
      valueString += decimalSeparator + fractionString;
    }
    // Get value from validated text
    const value = stringToValue(valueString);

    setDisplayValue(valueString);
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
          placeholderTextColor={colorScheme.onSurface + "66"}
          style={textInputStyle}
          value={displayValue}
        ></TextInput>
        <Text style={unitStyle}>{unit}</Text>
      </View>
    </View>
  );
};
