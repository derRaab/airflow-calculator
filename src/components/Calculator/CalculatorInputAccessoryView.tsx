import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import React, { FC } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

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
  const styles = useLocalStyle(colorScheme, layout);

  if (!setup.keyboardShown) {
    return null;
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.buttonContainerStyle}>
        <View>
          {setup.previousLabel && (
            <Pressable
              onPress={setup.onPreviousPress}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonTextStyle}>
                {"<  " + setup.previousLabel}
              </Text>
            </Pressable>
          )}
        </View>
        <View>
          {setup.currentLabel && (
            <Text style={styles.currentTextStyle}>{setup.currentLabel}</Text>
          )}
        </View>
        <View>
          {setup.nextLabel && (
            <Pressable onPress={setup.onNextPress} style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>
                {setup.nextLabel + "  >"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  layout: MaterialDesign3Layout,
) => {
  return StyleSheet.create({
    containerStyle: {
      backgroundColor: colorScheme.surfaceContainerHighest,
      width: "100%",
    },

    buttonContainerStyle: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: layout.padding,
      width: "100%",
    },

    buttonStyle: {
      backgroundColor: colorScheme.primary,
      borderRadius: 1000,
      padding: layout.padding,
      paddingHorizontal: layout.padding * 2,
    },

    buttonTextStyle: {
      ...typography.labelLarge,
      color: colorScheme.onPrimary,
    },

    currentTextStyle: {
      ...typography.labelLarge,
      color: colorScheme.onSurface,
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
