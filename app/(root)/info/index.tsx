import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { typography } from "@/src/themes/typography";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAssets } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const colorScheme = usePreferredColorScheme();
  // NOTE: Header height contains safe area inset top!
  const headerHeight = useHeaderHeight();
  const safeAreaInsets = useSafeAreaInsets();

  useNavigation().setOptions({
    headerTintColor: colorScheme.onBackground,
  });

  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [assets] = useAssets([
    require("../../../assets/markdown/info/de.md"),
    require("../../../assets/markdown/info/en.md"),
  ]);

  useEffect(() => {
    (async () => {
      if (!assets || assets.length === 0) {
        return;
      }
      const asset = translate("iso") === "de" ? assets[0] : assets[1];
      await asset.downloadAsync();

      const localUri = asset.localUri ?? "";
      const content = await FileSystem.readAsStringAsync(localUri);
      setMarkdownContent(content);
    })();
  }, [assets]);

  const rootContainerStyle: ViewStyle = {
    alignItems: "center",
    paddingTop: headerHeight,
    paddingLeft: safeAreaInsets.left,
    paddingRight: safeAreaInsets.right,
    paddingBottom: safeAreaInsets.bottom,
    flex: 1,
    gap: 10,
    justifyContent: "center",
    backgroundColor: colorScheme.background,
  };

  const textStyle: TextStyle = {
    ...typography.bodyLarge,

    color: colorScheme.onBackground,
  };

  return (
    <View style={rootContainerStyle}>
      <Text style={textStyle}>{markdownContent}</Text>
    </View>
  );
}
