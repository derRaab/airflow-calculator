import { CalculationSelector } from "@/src/components/CalculationSelector/CalculationSelector";
import {
  usePreferredColorScheme,
  usePreferredLayout,
} from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import { Link, SplashScreen } from "expo-router";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const colorScheme = usePreferredColorScheme();
  const layout = usePreferredLayout();
  const safeAreaInsets = useSafeAreaInsets();

  const styles = useLocalStyle(
    colorScheme,
    layout,
    safeAreaInsets.top,
    safeAreaInsets.bottom,
  );

  const hasRenderedDuct = useRef(false);
  const hasRenderedPipe = useRef(false);

  const hideSplashScreen = () => {
    if (!hasRenderedDuct.current || !hasRenderedPipe.current) return;
    SplashScreen.hideAsync();
  };

  const onDuctFirstRender = () => {
    hasRenderedDuct.current = true;
    hideSplashScreen();
  };
  const onPipeFirstRender = () => {
    hasRenderedPipe.current = true;
    hideSplashScreen();
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.selectorsContainerStyle}>
        <View style={styles.selectorContainerStyle}>
          <CalculationSelector
            colorScheme={colorScheme}
            layout={layout}
            object="duct"
            onFirstRender={onDuctFirstRender}
          />
        </View>
        <View style={styles.selectorContainerStyle}>
          <CalculationSelector
            colorScheme={colorScheme}
            layout={layout}
            object="pipe"
            onFirstRender={onPipeFirstRender}
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
      backgroundColor: colorScheme.background,
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
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

      color: colorScheme.onSurface,
      paddingBottom: infoBottomPadding,
      paddingTop: layoutPadding,
      textAlign: "center",
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
