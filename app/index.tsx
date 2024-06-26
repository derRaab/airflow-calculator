import { CalculationSelector } from "@/src/components/CalculationSelector/CalculationSelector";
import {
  usePreferredColorScheme,
  usePreferredLayout,
} from "@/src/themes/hooks";
import { typography } from "@/src/themes/typography";
import { Link } from "expo-router";
import { TextStyle, View, ViewStyle } from "react-native";
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

  const infoTextStyle = typography.labelLarge;
  const infoTextStyleLineHeight = infoTextStyle.lineHeight ?? 0;
  const layoutSpacing = layout.spacing;
  const layoutPadding = layout.padding;
  const minimumTopPadding = Math.max(safeAreaInsets.top, layoutSpacing);
  const minimumBottomPadding = Math.max(safeAreaInsets.bottom, layoutPadding);
  const minimumBottomInfoHeight =
    layoutPadding + infoTextStyleLineHeight + minimumBottomPadding;
  const opticalVerticalPadding = Math.max(
    minimumBottomInfoHeight,
    minimumTopPadding,
  );
  const infoBottomPadding =
    opticalVerticalPadding - layoutPadding - infoTextStyleLineHeight;

  const containerStyle: ViewStyle = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: colorScheme.background,
  };
  const selectorsContainerStyle = {
    flex: 1,
    flexGrow: 1,
    gap: layout.spacing,
    paddingHorizontal: layout.spacing,
    paddingTop: opticalVerticalPadding,
  };
  const selectorContainerStyle = {
    flex: 1,
  };
  const infoContainerStyle: ViewStyle = {
    flexBasis: "auto",
  };

  const infoContainerLinkTextStyle: TextStyle = {
    ...infoTextStyle,

    textAlign: "center",
    color: colorScheme.onSurface,
    paddingBottom: infoBottomPadding,
    paddingTop: layoutPadding,
  };

  return (
    <View style={containerStyle}>
      <View style={selectorsContainerStyle}>
        <View style={selectorContainerStyle}>
          <CalculationSelector
            insets={selectorInsets}
            layout={layout}
            object="duct"
          />
        </View>
        <View style={selectorContainerStyle}>
          <CalculationSelector
            insets={selectorInsets}
            layout={layout}
            object="pipe"
          />
        </View>
      </View>
      <View style={infoContainerStyle}>
        <Link href="./(root)/info" style={infoContainerLinkTextStyle}>
          Info
        </Link>
      </View>
    </View>
  );

  return (
    <View style={containerStyle}>
      <View style={selectorsContainerStyle}>
        <View style={selectorContainerStyle}>
          <CalculationSelector
            insets={selectorInsets}
            layout={layout}
            object="duct"
          />
        </View>
        <View style={selectorContainerStyle}>
          <CalculationSelector
            insets={selectorInsets}
            layout={layout}
            object="pipe"
          />
        </View>
      </View>
      <View style={infoContainerStyle}>
        <Link href="./(root)/info" style={{ color: colorScheme.onSurface }}>
          Info
        </Link>
      </View>
    </View>
  );
}
