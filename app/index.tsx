import { CalculationSelector } from "@/src/components/CalculationSelector/CalculationSelector";
import { usePreferredLayout } from "@/src/themes/hooks";
import { Link } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  // NOTE: Header height contains safe area inset top!
  const layout = usePreferredLayout();
  const safeAreaInsets = useSafeAreaInsets();

  // Fullscreen calculator will also deal with safe area insets
  const selectorInsets = {
    bottom: layout.padding,
    left: Math.max(safeAreaInsets.left, layout.padding),
    right: Math.max(safeAreaInsets.right, layout.padding),
    top: Math.max(safeAreaInsets.top, layout.padding),
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <CalculationSelector
            insets={selectorInsets}
            layout={layout}
            object="duct"
          />
          <CalculationSelector
            insets={selectorInsets}
            layout={layout}
            object="pipe"
          />
        </View>
        <View style={{ height: 44 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="./(root)/info">Info</Link>
          </View>
        </View>
      </View>
    </View>
  );
}
