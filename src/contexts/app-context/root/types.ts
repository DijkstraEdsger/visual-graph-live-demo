import type { SettingsAction, SettingsState } from "../settings/types";
import type { UIAction, UIState } from "../ui/types";

export interface AppState {
  ui: UIState;
  settings: SettingsState;
}

export type AppAction = UIAction | SettingsAction;
