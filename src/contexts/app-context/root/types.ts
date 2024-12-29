import { AlgorithmAction, AlgorithmState } from "../algorithm/types";
import type { SettingsAction, SettingsState } from "../settings/types";
import type { UIAction, UIState } from "../ui/types";

export interface AppState {
  ui: UIState;
  settings: SettingsState;
  algorithm: AlgorithmState;
}

export type AppAction = UIAction | SettingsAction | AlgorithmAction;
