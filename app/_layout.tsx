import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // Only the back button on all screens
        headerBackTitleVisible: false,
        headerShown: true,
        headerTitle: "",
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
