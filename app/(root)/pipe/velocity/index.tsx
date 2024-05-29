import { translate } from "@/src/localization";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text>{translate("pipe") + " > " + translate("velocity")}</Text>
    </View>
  );
}
