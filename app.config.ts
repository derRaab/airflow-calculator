import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const newConfig: ExpoConfig = {
    ...config,

    name: config.name ?? "airflow-calculator",
    slug: config.slug ?? "airflow-calculator",
  };

  return newConfig;
};
