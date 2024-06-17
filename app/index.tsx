import { CalculationSelector } from "@/src/components/CalculationSelector/CalculationSelector";
import {
  usePreferredColorScheme,
  usePreferredLayout,
} from "@/src/themes/hooks";
import { Link } from "expo-router";
import { View } from "react-native";
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

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: colorScheme.surface,
        gap: layout.gap,
        paddingLeft: layout.padding,
        paddingRight: layout.padding,
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
      }}
    >
      <View
        style={{
          flexShrink: 1,
        }}
      >
        <CalculationSelector
          insets={selectorInsets}
          layout={layout}
          object="duct"
        />
      </View>
      <View
        style={{
          flexShrink: 1,
        }}
      >
        <CalculationSelector
          insets={selectorInsets}
          layout={layout}
          object="pipe"
        />
      </View>
      <View
        style={{
          height: 44,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href="./(root)/info" style={{ color: colorScheme.onSurface }}>
          Info
        </Link>
      </View>
    </View>
  );
}
