import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import * as Device from "expo-device";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";
import { ThreeObject } from "../Three/ThreeObject";
import { CalculationSelectorButton } from "./CalculationSelectorButton";

interface CalculationSelectorProps {
  colorScheme: MaterialDesign3ColorScheme;
  layout: MaterialDesign3Layout;
  object: "duct" | "pipe";
  onFirstRender: () => void;
  opacityBackground: SharedValue<number>;
  opacityButtonA: SharedValue<number>;
  opacityButtonB: SharedValue<number>;
}

export const CalculationSelector: FC<CalculationSelectorProps> = ({
  colorScheme,
  layout,
  object,
  onFirstRender,
  opacityBackground,
  opacityButtonA,
  opacityButtonB,
}) => {
  const styles = useLocalStyle(colorScheme, layout);

  const hasRenderedThreeObject = useRef(false);
  const hasRenderedComponent = useRef(false);
  const hasDispatchedFirstRender = useRef(false);

  const onUseEffect = () => {
    if (hasRenderedComponent.current) return;
    hasRenderedComponent.current = true;
    dispatchOnFirstRender();
  };

  const onThreeObjectFirstFrame = () => {
    if (hasRenderedThreeObject.current) return;
    hasRenderedThreeObject.current = true;
    dispatchOnFirstRender();
  };

  const dispatchOnFirstRender = useCallback(() => {
    if (hasDispatchedFirstRender.current) return;
    if (!hasRenderedComponent.current) return;
    if (!hasRenderedThreeObject.current && Device.isDevice) return;

    hasDispatchedFirstRender.current = true;
    onFirstRender();
  }, [onFirstRender]);

  useEffect(onUseEffect, [dispatchOnFirstRender]);

  return (
    <Animated.View
      style={[styles.surfaceStyle, { opacity: opacityBackground }]}
    >
      <Animated.View style={styles.threeObjectContainerStyle}>
        {Device.isDevice && (
          <ThreeObject
            colorScheme={colorScheme}
            object={object}
            onFirstFrame={() => onThreeObjectFirstFrame()}
          />
        )}
      </Animated.View>
      <View style={styles.buttonContainerStyle}>
        <CalculationSelectorButton
          colorScheme={colorScheme}
          layout={layout}
          object={object}
          opacity={opacityButtonA}
          type={"velocity"}
        />
        <CalculationSelectorButton
          colorScheme={colorScheme}
          layout={layout}
          object={object}
          opacity={opacityButtonB}
          type={"flowrate"}
        />
      </View>
    </Animated.View>
  );
};

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  layout: MaterialDesign3Layout,
) => {
  return StyleSheet.create({
    surfaceStyle: {
      alignItems: "center",
      backgroundColor: colorScheme.surfaceContainer,
      borderRadius: layout.spacing,
      flexGrow: 1,
      justifyContent: "center",
      rowGap: layout.gap,
    },

    threeObjectContainerStyle: {
      alignItems: "center",
      flexShrink: 1,
      justifyContent: "center",
      maxHeight: "100%",
      maxWidth: "100%",
      padding: layout.spacing,
      position: "absolute",
    },

    buttonContainerStyle: {
      gap: layout.spacing,
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
