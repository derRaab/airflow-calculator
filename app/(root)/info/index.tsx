import { ThreeObject } from "@/src/components/Three/ThreeObject";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const colorScheme = usePreferredColorScheme();
  // NOTE: Header height contains safe area inset top!
  const headerHeight = useHeaderHeight();
  const safeAreaInsets = useSafeAreaInsets();
  console.log("safeAreaInsets", safeAreaInsets);

  const objectWidth = "100%";

  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: headerHeight,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
        paddingBottom: safeAreaInsets.bottom,
        flex: 1,
        gap: 10,
        justifyContent: "center",
      }}
    >
      <Text>Info</Text>
      <View
        style={{
          width: objectWidth,
        }}
      >
        <ThreeObject colorScheme={colorScheme} object="both" />
      </View>
    </View>
  );
}
