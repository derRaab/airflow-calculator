import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
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
          <Link href="./flowrate">Flow rate</Link>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#DDDDDD",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href="./velocity">Velocity</Link>
        </View>
      </View>
    </View>
  );
}
