import { Calculation, CalculationValue } from "@/src/calculation";
import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import * as Device from "expo-device";
import { useNavigation } from "expo-router";
import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScaledSize,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { ThreeObjectCached } from "../Three/ThreeObjectCached";
import { CalculatorDuctAreaInput, DuctArea } from "./CalculatorDuctAreaInput";
import { CalculatorFlowrateInput } from "./CalculatorFlowrateInput";
import {
  CalculatorInputAccessorySetup,
  CalculatorInputAccessorySetupKey,
  CalculatorInputAccessoryView,
} from "./CalculatorInputAccessoryView";
import { CalculatorPipeAreaInput, PipeArea } from "./CalculatorPipeAreaInput";
import { CalculatorResult } from "./CalculatorResult";
import { CalculatorVelocityInput } from "./CalculatorVelocityInput";

// Pick better behaviour on each platform: height on android, padding on ios
const KEYBOARD_AVOIDING_VIEW_BEHAVIOR =
  Platform.OS === "android" ? "height" : "padding";

interface CalculatorProps {
  calculation: Calculation;
  insets: EdgeInsets;
  layout: MaterialDesign3Layout;
  onInputChange: (calculation: Calculation) => void;
}

export const Calculator: FC<CalculatorProps> = ({
  calculation,
  insets,
  layout,
  onInputChange,
}) => {
  const colorSchemeName = useColorScheme();
  const colorScheme = usePreferredColorScheme();

  const onDuctAreaChange = (area: DuctArea) => {
    const newCalculation: Calculation = {
      ...calculation,
      area: area.area,
      height: area.height,
      width: area.width,
    };
    onInputChange(newCalculation);
  };

  const onPipeAreaChange = (area: PipeArea) => {
    const newCalculation: Calculation = {
      ...calculation,
      area: area.area,
      diameter: area.diameter,
    };
    onInputChange(newCalculation);
  };

  const onFlowrateChange = (flowrate: CalculationValue) => {
    const newCalculation: Calculation = {
      ...calculation,
      flowrate,
    };
    onInputChange(newCalculation);
  };

  const onVelocityChange = (velocity: CalculationValue) => {
    const newCalculation: Calculation = {
      ...calculation,
      velocity,
    };
    onInputChange(newCalculation);
  };

  const onPreviousPress = () => {
    const setup = updateTextInputFocus();
    if (setup.previousTextInput) {
      setup.previousTextInput.focus();
    }
  };
  const onNextPress = () => {
    const setup = updateTextInputFocus();
    if (setup.nextTextInput) {
      setup.nextTextInput.focus();
    }
  };

  const widthTextInputRef = useRef<TextInput>();
  const heightTextInputRef = useRef<TextInput>();
  const diameterTextInputRef = useRef<TextInput>();
  const velocityTextInputRef = useRef<TextInput>();
  const flowrateTextInputRef = useRef<TextInput>();
  const textInputRefList: MutableRefObject<TextInput | undefined>[] = [
    widthTextInputRef,
    heightTextInputRef,
    diameterTextInputRef,
    velocityTextInputRef,
    flowrateTextInputRef,
  ];

  const [setup, setSetup] = useState<CalculatorInputAccessorySetup>({
    keyboardShown: false,
    onNextPress,
    onPreviousPress,
  });

  const updateSetup = (setupChanges: CalculatorInputAccessorySetup) => {
    let changes = false;
    const keys = Object.keys(
      setupChanges,
    ) as CalculatorInputAccessorySetupKey[];
    keys.forEach((key) => {
      if (setup[key] !== setupChanges[key]) {
        changes = true;
      }
    });
    if (!changes) {
      return;
    }

    const newSetup = {
      ...setup,
      ...setupChanges,
    };

    setSetup(newSetup);
  };

  const getTextInputLabel = (textInput: TextInput | null) => {
    if (textInput) {
      switch (textInput) {
        case widthTextInputRef.current:
          return translate("width");
        case heightTextInputRef.current:
          return translate("height");
        case diameterTextInputRef.current:
          return translate("diameter");
        case velocityTextInputRef.current:
          return translate("velocity");
        case flowrateTextInputRef.current:
          return translate("flowrate");
      }
    }
    return "";
  };

  const getTextInputUnit = (textInput: TextInput | null) => {
    if (textInput) {
      switch (textInput) {
        case widthTextInputRef.current:
          return translate(calculation.width.unit);
        case heightTextInputRef.current:
          return translate(calculation.width.unit);
        case diameterTextInputRef.current:
          return translate(calculation.diameter.unit);
        case velocityTextInputRef.current:
          return translate(calculation.velocity.unit);
        case flowrateTextInputRef.current:
          return translate(calculation.flowrate.unit);
      }
    }
    return "";
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      updateSetup({ keyboardShown: true });
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      updateSetup({ keyboardShown: false });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  const updateTextInputFocus = () => {
    let previousTextInput: TextInput | null = null;
    let currentTextInput: TextInput | null = null;
    let nextTextInput: TextInput | null = null;

    if (textInputRefList) {
      textInputRefList.forEach((textInputRef, index) => {
        if (textInputRef) {
          const textInput = textInputRef.current;
          if (textInput) {
            if (textInput.isFocused()) {
              currentTextInput = textInput;
            } else {
              if (currentTextInput) {
                if (!nextTextInput) nextTextInput = textInput;
              } else {
                previousTextInput = textInput;
              }
            }
          }
        }
      });
    }

    const currentLabel =
      getTextInputLabel(currentTextInput) +
      " | " +
      getTextInputUnit(currentTextInput);
    const nextLabel = getTextInputLabel(nextTextInput);
    const previousLabel = getTextInputLabel(previousTextInput);

    return {
      currentLabel,
      currentTextInput,
      nextLabel,
      nextTextInput,
      previousLabel,
      previousTextInput,
    };
  };

  const onTextInputFocus = () => {
    const setup = updateTextInputFocus();
    updateSetup(setup);
  };

  const resultInsets = {
    top: insets.top,
    right: insets.right,
    bottom: 0,
    left: insets.left,
  };

  const resultMinHeight = insets.top * 2;

  const windowDimensions = useWindowDimensions();

  const styles = useLocalStyle(colorScheme, layout, windowDimensions);

  const navigation = useNavigation();

  useEffect(() => {
    // Focus first text input after the transition (fade-in) is complete
    const unsubscribe = navigation.addListener(
      "transitionEnd" as any,
      (e: any) => {
        if (!e?.data?.closing) {
          const c = textInputRefList.length;
          for (let i = 0; i < c; i++) {
            const textInput = textInputRefList[i].current;
            if (textInput) {
              textInput.focus();
              return;
            }
          }
        }
      },
    );
    return unsubscribe;
  }, []);

  return (
    <View style={styles.surfaceStyle}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={colorSchemeName === "dark" ? "dark-content" : "light-content"}
      />
      <CalculatorResult
        calculation={calculation}
        insets={resultInsets}
        layout={layout}
        minHeight={resultMinHeight}
      />
      <KeyboardAvoidingView
        behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR}
        style={styles.keyboardAvoidingViewStyle}
      >
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          {calculation.object === "duct" && (
            <CalculatorDuctAreaInput
              calculation={calculation}
              colorScheme={colorScheme}
              heightTextInputRef={heightTextInputRef}
              layout={layout}
              onAreaChange={onDuctAreaChange}
              onTextInputFocus={onTextInputFocus}
              widthTextInputRef={widthTextInputRef}
            />
          )}
          {calculation.object === "pipe" && (
            <CalculatorPipeAreaInput
              calculation={calculation}
              colorScheme={colorScheme}
              diameterTextInputRef={diameterTextInputRef}
              layout={layout}
              onAreaChange={onPipeAreaChange}
              onTextInputFocus={onTextInputFocus}
            />
          )}

          {calculation.type === "flowrate" && (
            <CalculatorVelocityInput
              calculation={calculation}
              colorScheme={colorScheme}
              layout={layout}
              onTextInputFocus={onTextInputFocus}
              onVelocityChange={onVelocityChange}
              velocityTextInputRef={velocityTextInputRef}
            />
          )}

          {calculation.type === "velocity" && (
            <CalculatorFlowrateInput
              calculation={calculation}
              colorScheme={colorScheme}
              flowrateTextInputRef={flowrateTextInputRef}
              layout={layout}
              onFlowrateChange={onFlowrateChange}
              onTextInputFocus={onTextInputFocus}
            />
          )}
          <View style={styles.threeObjectContainerStyle}>
            {Device.isDevice && (
              <ThreeObjectCached
                colorScheme={colorScheme}
                object={calculation.object}
              />
            )}
          </View>
        </ScrollView>
        <CalculatorInputAccessoryView
          colorScheme={colorScheme}
          layout={layout}
          setup={setup}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  layout: MaterialDesign3Layout,
  windowDimensions: ScaledSize,
) => {
  const threeSize =
    Math.min(windowDimensions.width, windowDimensions.height) / 3;

  return StyleSheet.create({
    keyboardAvoidingViewStyle: {
      backgroundColor: colorScheme.background,
      flex: 1,
      flexGrow: 1,
    },

    surfaceStyle: {
      flexGrow: 1,
    },

    scrollViewStyle: {
      padding: layout.padding,
      gap: layout.gap,
      flexGrow: 1,
    },

    threeObjectContainerStyle: {
      alignSelf: "center",
      height: "100%",
      maxHeight: threeSize,
      maxWidth: threeSize,
      padding: layout.spacing,
      width: "100%",
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
