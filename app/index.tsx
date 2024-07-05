import { CalculationSelector } from "@/src/components/CalculationSelector/CalculationSelector";
import {
  usePreferredColorScheme,
  usePreferredLayout,
} from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  // NOTE: Header height contains safe area inset top!
  const layout = usePreferredLayout();
  const colorScheme = usePreferredColorScheme();
  const safeAreaInsets = useSafeAreaInsets();

  // Fullscreen calculator will also deal with safe area insets
  const selectorInsets = {
    bottom: 0,
    left: Math.max(safeAreaInsets.left, layout.padding),
    right: Math.max(safeAreaInsets.right, layout.padding),
    top: 0,
  };

  const styles = useLocalStyle(
    colorScheme,
    layout,
    safeAreaInsets.top,
    safeAreaInsets.bottom,
  );

  return (
    <View style={styles.containerStyle}>
      <View style={styles.selectorsContainerStyle}>
        <View style={styles.selectorContainerStyle}>
          <CalculationSelector
            insets={selectorInsets}
            layout={layout}
            object="duct"
          />
        </View>
        <View style={styles.selectorContainerStyle}>
          <CalculationSelector
            insets={selectorInsets}
            layout={layout}
            object="pipe"
          />
        </View>
      </View>
      <View style={styles.infoContainerStyle}>
        <Link href="./(root)/info" style={styles.infoContainerLinkTextStyle}>
          Info
        </Link>
      </View>
    </View>
  );
}

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  layout: MaterialDesign3Layout,
  safeAreaInsetsTop: number,
  safeAreaInsetsBottom: number,
) => {
  const infoTextStyle = typography.labelLarge;
  const infoTextStyleLineHeight = infoTextStyle.lineHeight ?? 0;
  const layoutSpacing = layout.spacing;
  const layoutPadding = layout.padding;
  const minimumTopPadding = Math.max(safeAreaInsetsTop, layoutSpacing);
  const minimumBottomPadding = Math.max(safeAreaInsetsBottom, layoutPadding);
  const minimumBottomInfoHeight =
    layoutPadding + infoTextStyleLineHeight + minimumBottomPadding;
  const opticalVerticalPadding = Math.max(
    minimumBottomInfoHeight,
    minimumTopPadding,
  );
  const infoBottomPadding =
    opticalVerticalPadding - layoutPadding - infoTextStyleLineHeight;

  return StyleSheet.create({
    containerStyle: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
      backgroundColor: colorScheme.background,
    },
    selectorsContainerStyle: {
      flex: 1,
      flexGrow: 1,
      gap: layout.spacing,
      paddingHorizontal: layout.spacing,
      paddingTop: opticalVerticalPadding,
    },
    selectorContainerStyle: {
      flex: 1,
    },
    infoContainerStyle: {
      flexBasis: "auto",
    },
    infoContainerLinkTextStyle: {
      ...infoTextStyle,

      textAlign: "center",
      color: colorScheme.onSurface,
      paddingBottom: infoBottomPadding,
      paddingTop: layoutPadding,
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
