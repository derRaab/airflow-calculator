import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import React, { FC } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface CalculatorInputAccessorySetup {
  currentLabel?: string;
  currentTextInput?: TextInput | null;
  keyboardShown?: boolean;
  nextLabel?: string;
  nextTextInput?: TextInput | null;
  onNextPress?: () => void;
  onPreviousPress?: () => void;
  previousLabel?: string;
  previousTextInput?: TextInput | null;
}

export type CalculatorInputAccessorySetupKey =
  keyof CalculatorInputAccessorySetup;

interface CalculatorInputAccessoryViewProps {
  colorScheme: MaterialDesign3ColorScheme;
  layout: MaterialDesign3Layout;
  setup: CalculatorInputAccessorySetup;
}

export const CalculatorInputAccessoryView: FC<
  CalculatorInputAccessoryViewProps
> = ({ colorScheme, layout, setup }) => {
  const containerStyle: ViewStyle = {
    backgroundColor: colorScheme.surfaceContainerHighest,
    width: "100%",
  };

  const buttonContainerStyle: ViewStyle = {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: layout.padding,
    width: "100%",
  };

  const buttonStyle: ViewStyle = {
    backgroundColor: colorScheme.primary,
    borderRadius: 1000,
    padding: layout.padding / 2,
    paddingHorizontal: layout.padding,
  };

  const buttonTextStyle: TextStyle = {
    ...typography.labelLarge,
    color: colorScheme.onPrimary,
  };

  const currentTextStyle: TextStyle = {
    ...typography.labelLarge,
    color: colorScheme.onSurface,
  };

  if (!setup.keyboardShown) {
    return null;
  }

  return (
    <View style={containerStyle}>
      <View style={buttonContainerStyle}>
        <View>
          {setup.previousLabel && (
            <Pressable onPress={setup.onPreviousPress} style={buttonStyle}>
              <Text style={buttonTextStyle}>{"<  " + setup.previousLabel}</Text>
            </Pressable>
          )}
        </View>
        <View>
          {setup.currentLabel && (
            <Text style={currentTextStyle}>{setup.currentLabel}</Text>
          )}
        </View>
        <View>
          {setup.nextLabel && (
            <Pressable onPress={setup.onNextPress} style={buttonStyle}>
              <Text style={buttonTextStyle}>{setup.nextLabel + "  >"}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};
