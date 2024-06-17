import { CalculationObject, CalculationType } from "@/src/calculation";
import { translate } from "@/src/localization";
import { symbol } from "@/src/symbol";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { typography } from "@/src/themes/typography";
import { Link } from "expo-router";
import React, { FC } from "react";
import { Text, View, ViewStyle } from "react-native";
interface CalculationSelectorButtonProps {
  layout: MaterialDesign3Layout;
  object: CalculationObject;
  type: CalculationType;
}

export const CalculationSelectorButton: FC<CalculationSelectorButtonProps> = ({
  layout,
  object,
  type,
}) => {
  const colorScheme = usePreferredColorScheme();

  const labelTextStyle = {
    ...typography.headlineSmall,

    color: colorScheme.onSurface,
  };

  const symbolTextStyle = {
    ...typography.headlineMedium,

    color: colorScheme.onPrimary,
  };

  const sympolSize = (symbolTextStyle.fontSize as number) * 2;
  const symbolStyle: ViewStyle = {
    alignItems: "center",
    backgroundColor: colorScheme.primary,
    borderRadius: object === "pipe" ? sympolSize / 2 : 0,
    height: sympolSize,
    justifyContent: "center",
    width: sympolSize,
  };

  const linkInnerStyle: ViewStyle = {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    gap: layout.gap * 2,
  };

  const objectTitle = translate(object);
  const objectTitleTextStyle = {
    ...typography.labelMedium,

    color: colorScheme.onSurface,
  };
  return (
    <Link href={"./(root)/" + object + "/" + type}>
      <View style={linkInnerStyle}>
        <View style={symbolStyle}>
          <Text style={symbolTextStyle}>{symbol(type)}</Text>
        </View>
        <View>
          <Text style={labelTextStyle}>{translate(type)}</Text>
          <Text style={objectTitleTextStyle}>{objectTitle}</Text>
        </View>
      </View>
    </Link>
  );
};
