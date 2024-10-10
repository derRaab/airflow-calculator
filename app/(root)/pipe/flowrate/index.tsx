import { CalculationStorageContext } from "@/app/_layout";
import { Calculation, calculatePipeFlowrate } from "@/src/calculation";
import { Calculator } from "@/src/components/Calculator/Calculator";
import { usePreferredLayout } from "@/src/themes/hooks";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useContext, useState } from "react";
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
  const calculationStorage = useContext(CalculationStorageContext);
  const [calculation, setCalculation] = useState<Calculation>(
    calculationStorage.get("pipe", "flowrate"),
  );

  // Handle calculator input change
  const onCalculatorInputChange = (calculation: Calculation) => {
    const newCalculation = calculatePipeFlowrate(calculation);
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
