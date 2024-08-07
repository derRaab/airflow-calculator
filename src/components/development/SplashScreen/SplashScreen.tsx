import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import { FC } from "react";
import { PixelRatio, StyleSheet, View } from "react-native";

interface SplashScreenProps {
  colorScheme: MaterialDesign3ColorScheme;
  pixelSize: { width: number; height: number };
}

export const SplashScreen: FC<SplashScreenProps> = ({
  colorScheme,
  pixelSize,
}) => {
  const styles = useLocalStyle(colorScheme, pixelSize);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.separator} />
    </View>
  );
};

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  pixelSize: { width: number; height: number },
) => {
  const pixelSizeRatio =
    pixelSize.width / PixelRatio.getPixelSizeForLayoutSize(pixelSize.width);

  const bitmapWidth = pixelSize.width * pixelSizeRatio;
  const bitmapHeight = pixelSize.height * pixelSizeRatio;

  return StyleSheet.create({
    rootContainer: {
      height: bitmapHeight,
      width: bitmapWidth,
      alignItems: "center",
      justifyContent: "center",
    },
    separator: {
      backgroundColor: colorScheme.primary,
      width: "100%",
      height: 1,
    },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
