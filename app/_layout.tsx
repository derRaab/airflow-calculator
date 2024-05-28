import { translate } from "@/src/localization";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: translate("appName"),
        }}
      />
    </Stack>
  );
}
