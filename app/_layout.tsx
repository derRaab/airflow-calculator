import { usePreferredColorScheme } from "@/src/themes/hooks";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { THREE } from "expo-three";
import { useColorScheme } from "react-native";

// This is needed to make THREE global
(global as any).THREE = (global as any).THREE || THREE;

export default function RootLayout() {
  const colorSchemeName = useColorScheme();
  const colorScheme = usePreferredColorScheme();

  return (
    <ThemeProvider
      value={colorSchemeName === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack
        screenOptions={{
          // Only the back button on all screens
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: colorScheme.onPrimary,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
