import { translate } from "@/src/localization";
import {
  usePreferredColorScheme,
  usePreferredLayout,
} from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAssets } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const markdownValues = [
  {
    key: "EXPO_PUBLIC_INFO_COMPANY_NAME",
    value: process.env.EXPO_PUBLIC_INFO_COMPANY_NAME ?? "",
  },
  {
    key: "EXPO_PUBLIC_INFO_COMPANY_CITY",
    value: process.env.EXPO_PUBLIC_INFO_COMPANY_CITY ?? "",
  },
  {
    key: "EXPO_PUBLIC_INFO_COMPANY_STREET",
    value: process.env.EXPO_PUBLIC_INFO_COMPANY_STREET ?? "",
  },
  {
    key: "EXPO_PUBLIC_INFO_COMPANY_PHONE",
    value: process.env.EXPO_PUBLIC_INFO_COMPANY_PHONE ?? "",
  },
  {
    key: "EXPO_PUBLIC_INFO_COMPANY_EMAIL",
    value: process.env.EXPO_PUBLIC_INFO_COMPANY_EMAIL ?? "",
  },
  {
    key: "EXPO_PUBLIC_INFO_COMPANY_BOSS",
    value: process.env.EXPO_PUBLIC_INFO_COMPANY_BOSS ?? "",
  },
  {
    key: "EXPO_PUBLIC_INFO_COMPANY_HRB",
    value: process.env.EXPO_PUBLIC_INFO_COMPANY_HRB ?? "",
  },
];

const replaceMarkdownValues = (markdown: string): string => {
  if (!markdown) {
    return "";
  }

  markdownValues.forEach(({ key, value }) => {
    markdown = markdown.split(key).join(value);
  });
  return markdown;
};

export default function Index() {
  const colorScheme = usePreferredColorScheme();
  const layout = usePreferredLayout();

  // NOTE: Header height contains safe area inset top!
  const headerHeight = useHeaderHeight();
  const safeAreaInsets = useSafeAreaInsets();

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTintColor: colorScheme.onBackground,
    });
  }, [navigation, colorScheme]);

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
      let content = await FileSystem.readAsStringAsync(localUri);
      content = replaceMarkdownValues(content);
      setMarkdownContent(content);
    })();
  }, [assets]);

  const styles = useLocalStyle(
    colorScheme,
    layout,
    headerHeight,
    safeAreaInsets.left,
    safeAreaInsets.right,
    safeAreaInsets.bottom,
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainerStyle}>
      <Markdown style={styles}>{markdownContent}</Markdown>
    </ScrollView>
  );
}

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  layout: MaterialDesign3Layout,
  headerHeight: number,
  safeAreaInsetsLeft: number,
  safeAreaInsetsRight: number,
  safeAreaInsetsBottom: number,
) => {
  const padding = layout.padding;

  return StyleSheet.create({
    scrollContainerStyle: {
      backgroundColor: colorScheme.background,
      minHeight: "100%",
      paddingBottom: safeAreaInsetsBottom + padding,
      paddingLeft: safeAreaInsetsLeft + padding,
      paddingRight: safeAreaInsetsRight + padding,
      paddingTop: headerHeight + padding,
    },

    body: {
      ...typography.bodyLarge,
      color: colorScheme.onBackground,
    },

    heading1: typography.displayMedium,
    heading2: { ...typography.displaySmall, marginTop: layout.spacing },
    heading3: typography.headlineLarge,
    heading4: typography.headlineMedium,
    heading5: typography.headlineSmall,
    heading6: typography.headlineSmall,
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
