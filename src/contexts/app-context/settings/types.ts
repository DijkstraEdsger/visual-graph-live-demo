export interface SettingsState {
  transitionSpeed: TransitionSpeedState;
}

export enum SettingsActionType {
  SET_TRANSITION_SPEED = "SET_TRANSITION_SPEED",
}

interface SetTransitionSpeedAction {
  type: SettingsActionType.SET_TRANSITION_SPEED;
  payload: number;
}

export type SettingsAction = SetTransitionSpeedAction;

export interface TransitionSpeedState {
  speed: number;
}
