import { translate } from "@/src/localization";
import { symbol } from "@/src/symbol";
import { usePreferredColorScheme } from "@/src/themes/hooks";
import { MaterialDesign3Layout } from "@/src/themes/layout";
import { typography } from "@/src/themes/typography";
import { Link } from "expo-router";
import React, { FC } from "react";
import { Text, View, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

interface CalculationSelectorProps {
  insets: EdgeInsets;
  layout: MaterialDesign3Layout;
  object: "duct" | "pipe";
}

export const CalculationSelector: FC<CalculationSelectorProps> = ({
  insets,
  layout,
  object,
}) => {
  const colorScheme = usePreferredColorScheme();
  const surfaceStyle: ViewStyle = {
    backgroundColor: colorScheme.surface,
    flexGrow: 1,
    rowGap: layout.gap,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    paddingBottom: insets.bottom,
  };

  const objectTitle = translate(object);
  const objectTitleTextStyle = {
    ...typography.displayLarge,

    color: colorScheme.onSurface,
  };

  return (
    <View style={surfaceStyle}>
      <Text style={objectTitleTextStyle}>{objectTitle}</Text>
      <Link href={"./(root)/" + object + "/flowrate"}>
        {symbol("flowrate") + " " + translate("flowrate")}
      </Link>
      <Link href={"./(root)/" + object + "/velocity"}>
        {symbol("velocity") + " " + translate("velocity")}
      </Link>
    </View>
  );
};
