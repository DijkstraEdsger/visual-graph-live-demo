import { uiReducer } from "../ui/reducer";
import { UIAction } from "../ui/types";
import type { AppAction, AppState } from "./types";

export const appReducer = ({ ui }: AppState, action: AppAction): AppState => ({
  ui: uiReducer(ui, action as UIAction),
});
