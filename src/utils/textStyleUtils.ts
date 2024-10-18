import { TextStyle } from "react-native";

export const lineHeightPadding = (textStyle: TextStyle) => {
  if (textStyle.lineHeight && textStyle.fontSize) {
    return (textStyle.lineHeight - textStyle.fontSize) / 2;
  }
  return 0;
};
