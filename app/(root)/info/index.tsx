import { translate } from "@/src/localization";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAssets } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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

  const styles = useLocalStyle(
    colorScheme,
    headerHeight,
    safeAreaInsets.left,
    safeAreaInsets.right,
    safeAreaInsets.bottom,
  );

  return (
    <View style={styles.rootContainerStyle}>
      <Text style={styles.textStyle}>{markdownContent}</Text>
    </View>
  );
}

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  headerHeight: number,
  safeAreaInsetsLeft: number,
  safeAreaInsetsRight: number,
  safeAreaInsetsBottom: number,
) => {
  return StyleSheet.create({
    rootContainerStyle: {
      alignItems: "center",
      paddingTop: headerHeight,
      paddingLeft: safeAreaInsetsLeft,
      paddingRight: safeAreaInsetsRight,
      paddingBottom: safeAreaInsetsBottom,
      flex: 1,
      gap: 10,
      justifyContent: "center",
      backgroundColor: colorScheme.background,
    },
    textStyle: {
      ...typography.bodyLarge,
      color: colorScheme.onBackground,
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
