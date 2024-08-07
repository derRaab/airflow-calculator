import { CalculationObject } from "@/src/calculation";
import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { typography } from "@/src/themes/typography";
import { createCachedFactory } from "@/src/utils/factoryUtils";
import { FC } from "react";
import { PixelRatio, StyleSheet, Text, View } from "react-native";
import { ThreeObject } from "../Three/ThreeObject";

interface AppIconProps {
  colorScheme: MaterialDesign3ColorScheme;
  object: CalculationObject;
  pixelSize: number;
  text: string;
}

export const AppIcon: FC<AppIconProps> = ({
  colorScheme,
  object,
  pixelSize,
  text,
}) => {
  const styles = useLocalStyle(colorScheme, pixelSize);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.resultContainerStyle}>
        <Text style={styles.resultStyle}>{text}</Text>
      </View>
      <View style={styles.threeContainer}>
        <View style={styles.pipeContainer}>
          <ThreeObject colorScheme={colorScheme} object={object} />
        </View>
      </View>
    </View>
  );
};

const createStyleSheet = (
  colorScheme: MaterialDesign3ColorScheme,
  pixelSize: number,
) => {
  const pixelSizeRatio =
    pixelSize / PixelRatio.getPixelSizeForLayoutSize(pixelSize);

  const iconSize = pixelSize * pixelSizeRatio;
  const borderWidth = 0;
  const totalSize = iconSize + borderWidth * 2;
  const resultHeight = Math.floor(iconSize / 3);
  const resultPaddingTop = Math.floor(resultHeight / 10);
  const threeHeight = iconSize - resultHeight;
  const threePaddingBottom = Math.floor(threeHeight / 10);
  const threePaddingTop = Math.floor(threeHeight / 12);

  const fontSize = Math.floor((resultHeight / 3) * 2);
  const lineHeight = resultHeight - resultPaddingTop;

  return StyleSheet.create({
    rootContainer: {
      aspectRatio: 1,
      backgroundColor: "green",
      height: totalSize,
      width: totalSize,
      borderColor: "magenta",
      borderWidth,
    },
    resultContainerStyle: {
      backgroundColor: colorScheme.primary,
      height: resultHeight,
      justifyContent: "center",
      paddingTop: resultPaddingTop,
    },
    resultStyle: {
      ...typography.displayLarge,
      color: colorScheme.onPrimary,
      textAlign: "center",
      fontSize,
      lineHeight,
    },
    threeContainer: {
      height: threeHeight,
      width: "100%",
      paddingTop: threePaddingTop,
      paddingBottom: threePaddingBottom,
      backgroundColor: colorScheme.background,
    },
    ductContainer: { maxWidth: "30%", maxHeight: "30%" },
    pipeContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
  });
};

const localStyleCache = new Map<any, any>();
const useLocalStyle = createCachedFactory(localStyleCache, createStyleSheet);
