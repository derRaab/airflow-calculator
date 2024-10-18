import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from "expo";
import React from "react";

import * as Updates from "expo-updates";

const manifest = Updates.manifest;
const metadata = "metadata" in manifest ? manifest.metadata : undefined;
const extra = "extra" in manifest ? manifest.extra : undefined;
const updateGroup =
  metadata && "updateGroup" in metadata ? metadata.updateGroup : undefined;

interface SentryInitStatus {
  routingInstrumentation?: Sentry.ReactNavigationInstrumentation;
  useSentry: boolean;
}

export const sentryInit = (useSentry: boolean): SentryInitStatus => {
  if (!useSentry) {
    console.log("sentryInit: Sentry is disabled");
    return { useSentry };
  }
  // Construct a new instrumentation instance. This is needed to communicate between the integration and React
  const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

  const sentryDns = process.env.EXPO_PUBLIC_SENTRY_DNS ?? "";
  console.log("sentryInit: sentryDns", sentryDns);
  const debug = !!__DEV__;

  Sentry.init({
    dsn: sentryDns,
    debug: debug, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
    integrations: [
      new Sentry.ReactNativeTracing({
        // Pass instrumentation to be used as `routingInstrumentation`
        routingInstrumentation,
        enableNativeFramesTracking: !isRunningInExpoGo(),
        // ...
      }),
    ],
  });

  Sentry.configureScope((scope) => {
    scope.setTag("expo-update-id", Updates.updateId);
    scope.setTag("expo-is-embedded-update", Updates.isEmbeddedLaunch);

    if (typeof updateGroup === "string") {
      scope.setTag("expo-update-group-id", updateGroup);

      const owner = extra?.expoClient?.owner ?? "[account]";
      const slug = extra?.expoClient?.slug ?? "[project]";
      scope.setTag(
        "expo-update-debug-url",
        `https://expo.dev/accounts/${owner}/projects/${slug}/updates/${updateGroup}`,
      );
    } else if (Updates.isEmbeddedLaunch) {
      // This will be `true` if the update is the one embedded in the build, and not one downloaded from the updates server.
      scope.setTag(
        "expo-update-debug-url",
        "not applicable for embedded updates",
      );
    }
  });

  return { routingInstrumentation, useSentry };
};

export const sentryWrap = (
  sentryInitStatus: SentryInitStatus,
  rootLayout: React.ComponentType,
) => {
  if (!sentryInitStatus.useSentry) {
    console.log("sentryWrap: Sentry is disabled");
    return rootLayout;
  }
  // Wrap the Root Layout route component with `Sentry.wrap` to capture gesture info and profiling data.
  return Sentry.wrap(rootLayout);
};
