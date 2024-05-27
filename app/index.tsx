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
      <Link href="/duct">Go to Duct</Link>
      <Link href="/info">Go to Info</Link>
      <Link href="/pipe">Go to Pipe</Link>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
