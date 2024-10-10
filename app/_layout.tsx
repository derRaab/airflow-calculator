import { usePreferredColorScheme } from "@/src/themes/hooks";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack, useNavigationContainerRef } from "expo-router";
import { THREE } from "expo-three";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";

import { sentryInit, sentryWrap } from "@/src/utils/sentryUtils";

import { CalculationStorage } from "@/src/storage/CalculationStorage";
import { createContext } from "react";

// This is needed to make THREE global
(global as any).THREE = (global as any).THREE || THREE;

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

// Disable sentry in development mode
const useSentry = __DEV__ ? false : true;
const sentryInitStatus = sentryInit(useSentry);

// Store calculations in global context
const calculationStorage = new CalculationStorage();
export const CalculationStorageContext =
  createContext<CalculationStorage>(calculationStorage);

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
    <CalculationStorageContext.Provider value={calculationStorage}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </CalculationStorageContext.Provider>
  );
}

// Wrap sentry around the RootLayout if sentry is used
export default sentryWrap(sentryInitStatus, RootLayout);
