import { Calculation, calculateDuctVelocity } from "@/src/calculation";
import { Calculator } from "@/src/components/Calculator/Calculator";
import { usePreferredLayout } from "@/src/themes/hooks";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  // NOTE: Header height contains safe area inset top!
  const headerHeight = useHeaderHeight();
  const layout = usePreferredLayout();
  const safeAreaInsets = useSafeAreaInsets();

  // Fullscreen calculator will also deal with safe area insets
  const calculatorInsets = {
    bottom: safeAreaInsets.bottom,
    left: Math.max(safeAreaInsets.left, layout.padding),
    right: Math.max(safeAreaInsets.right, layout.padding),
    top: headerHeight,
  };

  // Calculation state
  const [calculation, setCalculation] = useState<Calculation>({
    area: 0,
    areaUnit: "m2",
    diameter: 0,
    diameterUnit: "mm",
    flowrate: 0,
    flowrateUnit: "m3_h",
    height: 0,
    heightUnit: "mm",
    object: "duct",
    result: 0,
    resultUnit: "m_s",
    type: "velocity",
    width: 0,
    widthUnit: "mm",
  });

  // Handle calculator input change
  const onCalculatorInputChange = (calculation: Calculation) => {
    const newCalculation = calculateDuctVelocity(calculation);
    setCalculation(newCalculation);
  };

  return (
    <View style={styles.container}>
      <Calculator
        layout={layout}
        calculation={calculation}
        insets={calculatorInsets}
        onInputChange={onCalculatorInputChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
