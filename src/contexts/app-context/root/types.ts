import { UIAction, UIState } from "../ui/types";

export interface AppState {
  ui: UIState;
}

export type AppAction = UIAction;
