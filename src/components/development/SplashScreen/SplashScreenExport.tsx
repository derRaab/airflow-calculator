import { materialTheme } from "@/src/themes/colors";
import {
  MaterialDesign3ColorScheme,
  selectColorScheme,
} from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import * as MediaLibrary from "expo-media-library";
import React, { FC, useCallback, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import ViewShot from "react-native-view-shot";
import { SplashScreen } from "./SplashScreen";

interface SplashScreenVariation {
  colorScheme: MaterialDesign3ColorScheme;
  pixelSize: { width: number; height: number };
}

const lightColorScheme = selectColorScheme(materialTheme.schemes, "light");
const darkColorScheme = selectColorScheme(materialTheme.schemes, "dark");
const colorSchemes = [lightColorScheme, darkColorScheme];
const pixelSizes = [{ width: 1284, height: 2778 }];

const splashscreenVariations: SplashScreenVariation[] = [];

pixelSizes.forEach((pixelSize) => {
  colorSchemes.forEach((colorScheme) => {
    splashscreenVariations.push({ colorScheme, pixelSize });
  });
});

export const SplashScreenExport: FC = () => {
  const viewShotRef = useRef<ViewShot | null>(null);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [splashScreenVariation, setSplashScreenVariation] =
    useState<SplashScreenVariation>(splashscreenVariations[0]);

  const onPress = useCallback(() => {
    const index = splashscreenVariations.indexOf(splashScreenVariation);
    const nextIndex = (index + 1) % splashscreenVariations.length;
    const nextVariation = splashscreenVariations[nextIndex];
    setSplashScreenVariation(nextVariation);
  }, [splashScreenVariation]);

  const exportIcon = () => {
    if (status === null) {
      requestPermission();
    }

    const current = viewShotRef.current as ViewShot;
    if (!current.capture) {
      return;
    }

    current.capture().then(async (uri) => {
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("Success", "Saved to library");
    });
  };

  const onLongPress = () => {
    Alert.alert("Save", "Save bitmap to library?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => exportIcon() },
    ]);
  };

  const styles = useLocalStyle();

  return (
    <Pressable
      style={styles.rootContainer}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <ViewShot ref={viewShotRef}>
        <View>
          <SplashScreen
            colorScheme={splashScreenVariation.colorScheme}
            pixelSize={splashScreenVariation.pixelSize}
          />
        </View>
      </ViewShot>
    </Pressable>
  );
};

const createStyleSheet = () => {
  return StyleSheet.create({
    rootContainer: { backgroundColor: "magenta", padding: 10 },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
