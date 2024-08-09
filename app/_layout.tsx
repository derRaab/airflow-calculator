import { usePreferredColorScheme } from "@/src/themes/hooks";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack, useNavigationContainerRef } from "expo-router";
import { THREE } from "expo-three";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";

import { sentryInit, sentryWrap } from "@/src/utils/sentryUtils";

// This is needed to make THREE global
(global as any).THREE = (global as any).THREE || THREE;

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Sentry is enabled by default. To disable it, set `useSentry` to `false`.
const useSentry = true;
const sentryInitStatus = sentryInit(useSentry);

function RootLayout() {
  const ref = useNavigationContainerRef();

  useEffect(() => {
    // Capture the NavigationContainer ref and register it with the instrumentation if sentry is used.
    if (ref && sentryInitStatus.routingInstrumentation) {
      sentryInitStatus.routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

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

// Wrap sentry around the RootLayout if sentry is used
export default sentryWrap(sentryInitStatus, RootLayout);
