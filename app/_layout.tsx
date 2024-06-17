import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { THREE } from "expo-three";
import { useColorScheme } from "react-native";

// This is needed to make THREE global
global.THREE = global.THREE || THREE;

export default function RootLayout() {
  let colorSchemeName = useColorScheme();

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
