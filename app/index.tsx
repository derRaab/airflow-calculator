import { CalculationSelector } from "@/src/components/CalculationSelector/CalculationSelector";
import {
  usePreferredColorScheme,
  usePreferredLayout,
} from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import { useQuery } from "@tanstack/react-query";
import { Link, SplashScreen } from "expo-router";
import React, { useContext, useRef } from "react";
import { AccessibilityInfo, StyleSheet, View } from "react-native";
import {
  Easing,
  ReduceMotion,
  useSharedValue,
  withDelay,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CalculationStorageContext } from "./_layout";

export default function Index() {
  const colorScheme = usePreferredColorScheme();
  const layout = usePreferredLayout();
  const safeAreaInsets = useSafeAreaInsets();

  const opacityABackground = useSharedValue(0);
  const opacityAButtonA = useSharedValue(0);
  const opacityAButtonB = useSharedValue(0);
  const opacityBBackground = useSharedValue(0);
  const opacityBButtonA = useSharedValue(0);
  const opacityBButtonB = useSharedValue(0);

  const startOpacityAnimation = async () => {
    if (opacityABackground.value === 1) return;

    const reduceMotionEnabled =
      (await AccessibilityInfo.isReduceMotionEnabled()) ?? false;
    if (reduceMotionEnabled) {
      opacityABackground.value = 1;
      opacityAButtonA.value = 1;
      opacityAButtonB.value = 1;
      opacityBBackground.value = 1;
      opacityBButtonA.value = 1;
      opacityBButtonB.value = 1;
      return;
    }

    const timingConfig: WithTimingConfig = {
      duration: 400,
      easing: Easing.in(Easing.ease),
      reduceMotion: ReduceMotion.Never,
    };

    opacityABackground.value = withDelay(0, withTiming(1, timingConfig));
    opacityBBackground.value = withDelay(200, withTiming(1, timingConfig));
    opacityAButtonA.value = withDelay(700, withTiming(1, timingConfig));
    opacityAButtonB.value = withDelay(900, withTiming(1, timingConfig));
    opacityBButtonA.value = withDelay(1100, withTiming(1, timingConfig));
    opacityBButtonB.value = withDelay(1300, withTiming(1, timingConfig));
  };

  const styles = useLocalStyle(
    colorScheme,
    layout,
    safeAreaInsets.top,
    safeAreaInsets.bottom,
  );

  const hasRenderedDuct = useRef(false);
  const hasRenderedPipe = useRef(false);
  const hasPreparedCalculations = useRef(false);

  const hideSplashScreen = () => {
    if (
      !hasPreparedCalculations.current ||
      !hasRenderedDuct.current ||
      !hasRenderedPipe.current
    ) {
      return;
    }
    SplashScreen.hideAsync();
    startOpacityAnimation();
  };

  const onDuctFirstRender = () => {
    hasRenderedDuct.current = true;
    hideSplashScreen();
  };
  const onPipeFirstRender = () => {
    hasRenderedPipe.current = true;
    hideSplashScreen();
  };

  // Prepare stored calculation context
  const calculationStorage = useContext(CalculationStorageContext);
  const { isPending } = useQuery({
    queryKey: ["calculationStorageInitialize"],
    queryFn: () => {
      return calculationStorage.initialize();
    },
  });
  if (isPending) {
    return null;
  }
  if (!hasPreparedCalculations.current) {
    hasPreparedCalculations.current = true;
    hideSplashScreen();
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.selectorsContainerStyle}>
        <View style={styles.selectorContainerStyle}>
          <CalculationSelector
            opacityBackground={opacityABackground}
            opacityButtonA={opacityAButtonA}
            opacityButtonB={opacityAButtonB}
            colorScheme={colorScheme}
            layout={layout}
            object="duct"
            onFirstRender={onDuctFirstRender}
          />
        </View>
        <View style={styles.selectorContainerStyle}>
          <CalculationSelector
            opacityBackground={opacityBBackground}
            opacityButtonA={opacityBButtonA}
            opacityButtonB={opacityBButtonB}
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
