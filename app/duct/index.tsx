import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        gap: 10,
        justifyContent: "center",
      }}
    >
      <Link href="./flowrate">Go to Flow Rate</Link>
      <Link href="./velocity">Go to Velocity</Link>
      <Text>Edit app/duct/index.tsx to edit this screen.</Text>
    </View>
  );
}
