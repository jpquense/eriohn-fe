// example of how to controll diffent app experience based on modes and user type
export enum APP_MODES {
    PATIENT = "patient",
    PRACTITIONER = "practitioner",
    RESEARCHER = "researcher"
  }
  
  export enum FEATURES {
    CHAT,
    SIMPLIFIED,
    DUMMY_PI
  }
  
  export const FEATURE_SETS: { [mode: string]: FEATURES[] } = {
    [APP_MODES.PATIENT]: [FEATURES.CHAT, FEATURES.SIMPLIFIED],
    [APP_MODES.PRACTITIONER]: [FEATURES.CHAT],
    [APP_MODES.RESEARCHER]: [FEATURES.DUMMY_PI]
  };