import type { AppState } from "./types";
import { initialState as initialUIState } from "../ui/state";
import { initialState as initialSettingsState } from "../settings/state";

export const initialState: AppState = {
  ui: initialUIState,
  settings: initialSettingsState,
};
