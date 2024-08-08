import { CalculationObject } from "@/src/calculation";
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
import { AppIcon2 } from "./AppIcon2";

interface IconVariation {
  colorScheme: MaterialDesign3ColorScheme;
  object: CalculationObject;
  pixelSize: number;
  text: string;
}

const lightColorScheme = selectColorScheme(materialTheme.schemes, "light");
const darkColorScheme = selectColorScheme(materialTheme.schemes, "dark");
const colorSchemes = [lightColorScheme, darkColorScheme];
const objects: CalculationObject[] = ["duct", "pipe"];
const pixelSizes = [1024];
const texts = [""];

const iconVariations: IconVariation[] = [];

pixelSizes.forEach((pixelSize) => {
  texts.forEach((text) => {
    objects.forEach((object) => {
      colorSchemes.forEach((colorScheme) => {
        iconVariations.push({ colorScheme, object, pixelSize, text });
      });
    });
  });
});

export const AppIcon2Export: FC = () => {
  const viewShotRef = useRef<ViewShot | null>(null);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [iconVariation, setIconVariation] = useState<IconVariation>(
    iconVariations[0],
  );

  const onPress = useCallback(() => {
    const index = iconVariations.indexOf(iconVariation);
    const nextIndex = (index + 1) % iconVariations.length;
    const nextVariation = iconVariations[nextIndex];
    setIconVariation(nextVariation);
  }, [iconVariation]);

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
    Alert.alert("Save", "Save icon to library?", [
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
          <AppIcon2
            colorScheme={iconVariation.colorScheme}
            object={iconVariation.object}
            pixelSize={iconVariation.pixelSize}
            text={iconVariation.text}
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
