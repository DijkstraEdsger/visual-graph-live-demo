import type { AppState } from "./types";
import { initialState as initialUIState } from "../ui/state";
import { initialState as initialSettingsState } from "../settings/state";
import { initialState as initialAlgorithmState } from "../algorithm/state";

export const initialState: AppState = {
  ui: initialUIState,
  settings: initialSettingsState,
  algorithm: initialAlgorithmState,
};
