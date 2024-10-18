import { CalculationObject, CalculationType } from "@/src/calculation";
import { translate } from "@/src/localization";
import { symbol } from "@/src/symbol";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import { lineHeightPadding } from "@/src/utils/textStyleUtils";
import { Link } from "expo-router";
import React, { FC } from "react";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import Animate, { SharedValue } from "react-native-reanimated";

const AnimatedLink = Animate.createAnimatedComponent(Link);

interface CalculationSelectorButtonProps {
  colorScheme: MaterialDesign3ColorScheme;
  layout: MaterialDesign3Layout;
  object: CalculationObject;
  opacity: SharedValue<number>;
  type: CalculationType;
}

export const CalculationSelectorButton: FC<CalculationSelectorButtonProps> = ({
  colorScheme,
  layout,
  object,
  opacity,
  type,
}) => {
  const objectTitle = translate(object);
  const styles = useLocalStyle(colorScheme, layout, object);

  return (
    <AnimatedLink
      asChild
      href={`./(root)/${object}/${type}`}
      style={{ opacity }}
    >
      <Pressable style={styles.linkStyle}>
        <View style={styles.linkInnerStyle}>
          <View style={styles.symbolMarginStyle}>
            <View style={styles.symbolStyle}>
              <View style={styles.symbolInnerStyle}>
                <Text style={styles.symbolTextStyle}>{symbol(type)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.labelStyle}>
            <Text style={styles.labelTextStyle}>{translate(type)}</Text>
            <Text style={styles.objectTitleTextStyle}>{objectTitle}</Text>
          </View>
        </View>
      </Pressable>
    </AnimatedLink>
  );
};

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  layout: MaterialDesign3Layout,
  object: CalculationObject,
) => {
  const labelTextStyle: TextStyle = typography.headlineSmall;
  const objectTextStyle: TextStyle = typography.labelMedium;
  const labelLineHeightPadding = lineHeightPadding(labelTextStyle);
  const objectLineHeightPadding = lineHeightPadding(objectTextStyle);

  let symbolSize = Math.round((labelTextStyle.fontSize as number) * 1.8);
  let symbolMargin = 0;
  if (object === "duct") {
    symbolSize -= 4;
    symbolMargin = 2;
  }

  return StyleSheet.create({
    labelTextStyle: {
      ...labelTextStyle,

      color: colorScheme.onPrimary,
      marginTop: -labelLineHeightPadding,
    },

    symbolTextStyle: {
      ...labelTextStyle,

      color: colorScheme.primary,
    },

    symbolMarginStyle: { marginVertical: symbolMargin },

    symbolStyle: {
      backgroundColor: colorScheme.onPrimary,
      borderRadius: object === "pipe" ? symbolSize / 2 : 0,
      height: symbolSize,
      padding: 1,
      width: symbolSize,
    },

    symbolInnerStyle: {
      alignItems: "center",
      borderColor: colorScheme.primary,
      borderRadius: object === "pipe" ? symbolSize / 2 : 0,
      borderStyle: "solid",
      borderWidth: 1,
      height: "100%",
      justifyContent: "center",
      width: "100%",
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
      paddingRight: 8,
    },

    objectTitleTextStyle: {
      ...objectTextStyle,

      color: colorScheme.onPrimary,
      marginTop: -objectLineHeightPadding,
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
