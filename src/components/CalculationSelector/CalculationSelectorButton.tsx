import { CalculationObject, CalculationType } from "@/src/calculation";
import { translate } from "@/src/localization";
import { symbol } from "@/src/symbol";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import { Link } from "expo-router";
import React, { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CalculationSelectorButtonProps {
  colorScheme: MaterialDesign3ColorScheme;
  layout: MaterialDesign3Layout;
  object: CalculationObject;
  type: CalculationType;
}

export const CalculationSelectorButton: FC<CalculationSelectorButtonProps> = ({
  colorScheme,
  layout,
  object,
  type,
}) => {
  const objectTitle = translate(object);
  const styles = useLocalStyle(colorScheme, layout, object);

  return (
    <Link href={"./(root)/" + object + "/" + type} asChild>
      <Pressable style={styles.linkStyle}>
        <View style={styles.linkInnerStyle}>
          <View style={styles.symbolStyle}>
            <Text style={styles.symbolTextStyle}>{symbol(type)}</Text>
          </View>
          <View style={styles.labelStyle}>
            <Text style={styles.labelTextStyle}>{translate(type)}</Text>
            <Text style={styles.objectTitleTextStyle}>{objectTitle}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  layout: MaterialDesign3Layout,
  object: CalculationObject,
) => {
  const symbolSize = (typography.headlineSmall.fontSize as number) * 1.8;

  return StyleSheet.create({
    labelTextStyle: {
      ...typography.headlineSmall,

      color: colorScheme.onPrimary,
    },

    symbolTextStyle: {
      ...typography.headlineSmall,

      color: colorScheme.onPrimary,
    },

    symbolStyle: {
      alignItems: "center",
      borderColor: colorScheme.onPrimary,
      borderRadius: object === "pipe" ? symbolSize / 2 : 0,
      borderStyle: "solid",
      borderWidth: 1,
      height: (typography.headlineSmall.fontSize as number) * 1.8,
      justifyContent: "center",
      paddingTop: 2,
      width: symbolSize,
    },

    linkStyle: {
      backgroundColor: colorScheme.primary,
      borderRadius: 1000,
    },

    linkInnerStyle: {
      alignItems: "center",
      flexDirection: "row",
      gap: layout.spacing,
      justifyContent: "flex-start",
      paddingHorizontal: layout.spacing,
      paddingVertical: 16,
    },

    labelStyle: {
      flexGrow: 1,
    },

    objectTitleTextStyle: {
      ...typography.labelMedium,

      color: colorScheme.onPrimary,
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
