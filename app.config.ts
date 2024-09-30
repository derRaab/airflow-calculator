import * as dotenv from "dotenv";
import { ConfigContext, ExpoConfig } from "expo/config";

// We wrap the key name with underscores (e.g. __KEY__) as a placeholder for the actual value in eas.json and replace it with the real value from GitHub Action secrets.
// To test and use the same script locally we fallback to values from a .env.local file.
const dotenvLocal = dotenv.config({ path: ".env.local" });
const getEnvValue = (key: string): string => {
  const value: string = process.env[key] ?? "";
  if (value === "" || "__" + key + "__" === value) {
    const dotenvLocalValue = dotenvLocal.parsed?.[key] ?? "";
    return dotenvLocalValue;
  }
  return value;
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const newConfig: ExpoConfig = {
    ...config,

    name: config.name ?? "airflow-calculator",
    slug: config.slug ?? "airflow-calculator",
  };

  // Read values from the environment
  let appName = getEnvValue("EXPO_SECRET_APP_NAME");
  let androidPackage = getEnvValue("EXPO_SECRET_ANDROID_PACKAGE");
  let extraEasProjectId = getEnvValue("EXPO_SECRET_EXTRA_EAS_PROJECT_ID");
  let iosBundleIdentifier = getEnvValue("EXPO_SECRET_IOS_BUNDLE_IDENTIFIER");
  let owner = getEnvValue("EXPO_SECRET_OWNER");
  let updatesUrl = getEnvValue("EXPO_SECRET_UPDATES_URL");

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
