import * as dotenv from "dotenv";
import { ConfigContext, ExpoConfig } from "expo/config";

// Load .env.local values if available
dotenv.config({ path: ".env.local" });

export default ({ config }: ConfigContext): ExpoConfig => {
  const newConfig: ExpoConfig = {
    ...config,

    name: config.name ?? "airflow-calculator",
    slug: config.slug ?? "airflow-calculator",
  };

  // Read values from the environment
  const appName = process.env.EXPO_SECRET_APP_NAME;
  const androidPackage = process.env.EXPO_SECRET_ANDROID_PACKAGE;
  const extraEasProjectId = process.env.EXPO_SECRET_EXTRA_EAS_PROJECT_ID;
  const iosBundleIdentifier = process.env.EXPO_SECRET_IOS_BUNDLE_IDENTIFIER;
  const owner = process.env.EXPO_SECRET_OWNER;
  const updatesUrl = process.env.EXPO_SECRET_UPDATES_URL;

  newConfig.name = appName ?? newConfig.name;

  newConfig.android = newConfig.android ?? {};
  newConfig.android.package = androidPackage;

  newConfig.extra = newConfig.extra ?? {};
  newConfig.extra.eas = newConfig.extra.eas ?? {};
  newConfig.extra.eas.projectId = extraEasProjectId;

  newConfig.ios = newConfig.ios ?? {};
  newConfig.ios.bundleIdentifier = iosBundleIdentifier;

  newConfig.owner = owner;

  newConfig.updates = newConfig.updates ?? {};
  newConfig.updates.url = updatesUrl;

  return newConfig;
};
