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

    color: colorScheme.onPrimary,
  };

  const symbolTextStyle = {
    ...typography.headlineSmall,

    color: colorScheme.onPrimary,
  };

  const sympolSize = (symbolTextStyle.fontSize as number) * 1.8;
  const symbolStyle: ViewStyle = {
    paddingTop: 2,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colorScheme.onPrimary,
    borderRadius: object === "pipe" ? sympolSize / 2 : 0,
    height: sympolSize,
    justifyContent: "center",
    width: sympolSize,
  };

  const linkStyle: ViewStyle = {};

  const spacingHorizontal = layout.spacing;
  const linkInnerStyle: ViewStyle = {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    gap: spacingHorizontal,
    backgroundColor: colorScheme.primary,
    borderRadius: layout.spacing,
    paddingHorizontal: spacingHorizontal,
    paddingVertical: 16,
  };

  const objectTitle = translate(object);
  const objectTitleTextStyle = {
    ...typography.labelMedium,

    color: colorScheme.onPrimary,
  };
  return (
    <Link href={"./(root)/" + object + "/" + type} style={linkStyle}>
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
