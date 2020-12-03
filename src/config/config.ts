import { APP_MODES, FEATURES, FEATURE_SETS } from "./appModes";
import get from "lodash/get";

type EnvConfig = {
  BASE_HOST_URL: string;
  LOGIN_METHODS: string[]; // example of how to control allowed logins from the BE with config
  ERIOHN_API_DOC_URL: string; // config options can vary based on need
  ERIOHN_API_URL: string; // more config options
  REGISTRATION_METHOD: string; // example of how to control allowed registation from the BE with configs
};
type ModeConfig = {
  FEATURES: FEATURES[];
};

type Config = Partial<EnvConfig> & Partial<ModeConfig>;

// config file would come from BE in Production

let config: Config = {
  BASE_HOST_URL: "http://localhost:8000", // typically "https://dev.eriohn.com"
  LOGIN_METHODS: ["sso", "email-password", "email"], // example of how to control allowed logins from the BE with config
  ERIOHN_API_DOC_URL: "https://dev.eriohn.com/docs", // config options can vary based on need
  ERIOHN_API_URL: "http://localhost:8000", // more config options
  REGISTRATION_METHOD: "open", // example of how to control allowed registation from the BE with configs
};

function setApplicationModeProperties(): void {
  const appMode =
    process.env.REACT_APP_MODE ||
    APP_MODES.PATIENT ||
    APP_MODES.PRACTITIONER ||
    APP_MODES.RESEARCHER;
  config = { ...config, FEATURES: get(FEATURE_SETS, appMode, []) };
}

setApplicationModeProperties();

export { config as default };
