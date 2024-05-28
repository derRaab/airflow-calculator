import { translate } from "@/src/localization";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#CCCCCC",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="./(root)/duct">{translate("duct")}</Link>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#DDDDDD",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="./(root)/pipe">{translate("pipe")}</Link>
          </View>
        </View>
        <View style={{ height: 44 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#EEEEEE",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="./(root)/info">Info</Link>
          </View>
        </View>
      </View>
    </View>
  );
}
