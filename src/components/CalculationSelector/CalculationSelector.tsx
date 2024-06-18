import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import React, { FC } from "react";
import { View, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { ThreeObject } from "../Three/ThreeObject";
import { CalculationSelectorButton } from "./CalculationSelectorButton";

interface CalculationSelectorProps {
  insets: EdgeInsets;
  layout: MaterialDesign3Layout;
  object: "duct" | "pipe";
}

export const CalculationSelector: FC<CalculationSelectorProps> = ({
  insets,
  layout,
  object,
}) => {
  const colorScheme = usePreferredColorScheme();
  const surfaceStyle: ViewStyle = {
    backgroundColor: colorScheme.surface,
    flexGrow: 1,
    rowGap: layout.gap,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    paddingBottom: insets.bottom,
  };

  const threeObjectContainerStyle: ViewStyle = {
    maxHeight: "50%",
  };

  const buttonContainerStyle: ViewStyle = {
    gap: layout.gap * 2,
  };

  return (
    <View style={surfaceStyle}>
      <View style={threeObjectContainerStyle}>
        <ThreeObject colorScheme={colorScheme} object={object} />
      </View>
      <View style={buttonContainerStyle}>
        <CalculationSelectorButton
          object={object}
          type={"flowrate"}
          layout={layout}
        />
        <CalculationSelectorButton
          object={object}
          type={"velocity"}
          layout={layout}
        />
      </View>
    </View>
  );
};
