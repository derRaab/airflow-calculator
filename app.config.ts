import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const newConfig: ExpoConfig = {
    ...config,

    name: config.name ?? "airflow-calculator",
    slug: config.slug ?? "airflow-calculator",
  };

  newConfig.ios = newConfig.ios || {};
  newConfig.ios.bundleIdentifier =
    process.env.EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER;

  return newConfig;
};
