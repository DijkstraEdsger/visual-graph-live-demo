import {
  type SettingsAction,
  SettingsActionType,
  SettingsState,
} from "./types";

export const settingsReducer = (
  state: SettingsState,
  action: SettingsAction
): SettingsState => {
  switch (action.type) {
    case SettingsActionType.SET_TRANSITION_SPEED:
      return {
        ...state,
        transitionSpeed: {
          speed: action.payload,
        },
      };

    default:
      return state;
  }
};
