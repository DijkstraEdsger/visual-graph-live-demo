import { settingsReducer } from "../settings/reducer";
import { SettingsAction } from "../settings/types";
import { uiReducer } from "../ui/reducer";
import { UIAction } from "../ui/types";
import type { AppAction, AppState } from "./types";

export const appReducer = (
  { ui, settings }: AppState,
  action: AppAction
): AppState => ({
  ui: uiReducer(ui, action as UIAction),
  settings: settingsReducer(settings, action as SettingsAction),
});
